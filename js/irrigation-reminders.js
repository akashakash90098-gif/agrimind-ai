/**
 * AGRIMIND AI — SMART IRRIGATION REMINDERS ENGINE
 * Manages irrigation tasks, repeat frequencies, browser & in-app alerts,
 * localStorage persistence, and science-backed watering guidance.
 */

(function () {
  'use strict';

  // Storage Keys
  const REMINDERS_KEY = 'agrimind_irrigation_reminders';
  const SETTINGS_KEY = 'agrimind_reminder_settings';

  // State
  let reminders = [];
  let activeFilter = 'all'; // 'all', 'due-today', 'upcoming', 'overdue', 'completed'
  let checkIntervalId = null;

  // DOM Elements
  let reminderForm, editIdInput, submitBtnText, cancelEditBtn;
  let cropSelect, fieldInput, dateInput, timeInput, freqSelect, customDaysWrapper, customDaysInput;
  let methodSelect, durationInput, notesInput, enabledToggle;
  let cardsContainer, activeFilterHeading;
  let statAllCount, statDueCount, statUpcomingCount, statOverdueCount, statCompletedCount;
  let notificationBadge, requestPermissionBtn;

  // Initialize
  document.addEventListener('DOMContentLoaded', initIrrigationReminders);

  function initIrrigationReminders() {
    // Cache Elements
    reminderForm = document.getElementById('createReminderForm');
    editIdInput = document.getElementById('editReminderId');
    submitBtnText = document.getElementById('btnSubmitReminderText');
    cancelEditBtn = document.getElementById('btnCancelEditReminder');

    cropSelect = document.getElementById('reminderCropSelect');
    fieldInput = document.getElementById('reminderFieldInput');
    dateInput = document.getElementById('reminderDateInput');
    timeInput = document.getElementById('reminderTimeInput');
    freqSelect = document.getElementById('reminderFreqSelect');
    customDaysWrapper = document.getElementById('customDaysWrapper');
    customDaysInput = document.getElementById('customDaysInput');
    methodSelect = document.getElementById('reminderMethodSelect');
    durationInput = document.getElementById('reminderDurationInput');
    notesInput = document.getElementById('reminderNotesInput');
    enabledToggle = document.getElementById('reminderEnabledToggle');

    cardsContainer = document.getElementById('remindersCardsContainer');
    activeFilterHeading = document.getElementById('activeFilterHeading');

    statAllCount = document.getElementById('statAllCount');
    statDueCount = document.getElementById('statDueCount');
    statUpcomingCount = document.getElementById('statUpcomingCount');
    statOverdueCount = document.getElementById('statOverdueCount');
    statCompletedCount = document.getElementById('statCompletedCount');

    notificationBadge = document.getElementById('notificationStatusBadge');
    requestPermissionBtn = document.getElementById('btnRequestNotificationPermission');

    // Default Date and Time to today + 2 hours
    setDefaultDateTime();

    // Bind Events
    bindEvents();

    // Check Notification Status
    checkNotificationPermission();

    // Load Saved Reminders
    loadReminders();

    // Start background alert loop (every 20s)
    startAlertChecker();

    // Init Guidance Panel
    initGuidanceCalculator();
  }

  function setDefaultDateTime() {
    const now = new Date();
    dateInput.value = formatDateForInput(now);

    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hh}:${mm}`;
  }

  function bindEvents() {
    // Form Submit
    if (reminderForm) {
      reminderForm.addEventListener('submit', handleFormSubmit);
    }

    // Frequency Change (toggle custom input)
    if (freqSelect) {
      freqSelect.addEventListener('change', () => {
        if (customDaysWrapper) {
          customDaysWrapper.style.display = freqSelect.value === 'custom' ? 'block' : 'none';
        }
      });
    }

    // Cancel Edit
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', resetFormToCreateMode);
    }

    // Filter Stat Pills
    document.querySelectorAll('.reminder-stat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.reminder-stat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.getAttribute('data-filter');
        renderDashboard();
      });
    });

    // History button
    const historyBtn = document.getElementById('btnFilterCompleted');
    if (historyBtn) {
      historyBtn.addEventListener('click', () => {
        document.querySelectorAll('.reminder-stat-pill').forEach(p => p.classList.remove('active'));
        activeFilter = 'completed';
        renderDashboard();
      });
    }

    // Demo Data Button
    const demoBtn = document.getElementById('btnLoadSampleReminders');
    if (demoBtn) {
      demoBtn.addEventListener('click', loadSampleDemoReminders);
    }

    // Browser Notification Permission Request
    if (requestPermissionBtn) {
      requestPermissionBtn.addEventListener('click', requestNotificationPermission);
    }

    // Toggle switch knob visual
    if (enabledToggle) {
      enabledToggle.addEventListener('change', updateToggleStyle);
    }
  }

  function updateToggleStyle() {
    const track = document.getElementById('toggleTrack');
    const knob = document.getElementById('toggleKnob');
    if (!track || !knob) return;

    if (enabledToggle.checked) {
      track.style.backgroundColor = 'var(--color-fresh-leaf)';
      knob.style.left = '22px';
    } else {
      track.style.backgroundColor = '#A8B7AA';
      knob.style.left = '3px';
    }
  }

  // =========================================================================
  // BROWSER NOTIFICATIONS
  // =========================================================================

  function checkNotificationPermission() {
    if (!('Notification' in window)) {
      if (notificationBadge) {
        notificationBadge.textContent = 'Not Supported';
        notificationBadge.style.background = '#616161';
      }
      if (requestPermissionBtn) {
        requestPermissionBtn.disabled = true;
        requestPermissionBtn.textContent = 'Browser Unsupported';
      }
      return;
    }

    const permission = Notification.permission;
    if (permission === 'granted') {
      if (notificationBadge) {
        notificationBadge.textContent = 'Active ✓';
        notificationBadge.style.background = '#2E7D32';
      }
      if (requestPermissionBtn) {
        requestPermissionBtn.textContent = 'Notifications Enabled ✓';
        requestPermissionBtn.classList.add('btn-secondary');
        requestPermissionBtn.classList.remove('btn-primary');
        requestPermissionBtn.disabled = true;
      }
    } else if (permission === 'denied') {
      if (notificationBadge) {
        notificationBadge.textContent = 'Blocked ✕';
        notificationBadge.style.background = '#C62828';
      }
      if (requestPermissionBtn) {
        requestPermissionBtn.textContent = 'Permission Blocked';
        requestPermissionBtn.disabled = true;
      }
    } else {
      if (notificationBadge) {
        notificationBadge.textContent = 'Not Enabled';
        notificationBadge.style.background = 'rgba(255,255,255,0.2)';
      }
      if (requestPermissionBtn) {
        requestPermissionBtn.textContent = 'Enable Browser Notifications';
        requestPermissionBtn.disabled = false;
      }
    }
  }

  function requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('Browser notifications are not supported by your current browser.');
      return;
    }

    Notification.requestPermission().then(permission => {
      checkNotificationPermission();
      if (permission === 'granted') {
        if (window.showToast) {
          window.showToast('Browser notifications enabled for irrigation alerts!', 'success');
        }
        // Send test notification
        try {
          new Notification('AgriMind AI — Notifications Active', {
            body: 'You will receive alerts here when crop watering sessions are due.',
            icon: 'assets/icons/favicon.svg'
          });
        } catch (e) {
          console.warn('Test notification note:', e);
        }
      } else {
        alert('Notification permission was not granted. In-app alerts will continue to work whenever AgriMind AI is open.');
      }
    });
  }

  // =========================================================================
  // ALERT CHECKER LOOP
  // =========================================================================

  function startAlertChecker() {
    if (checkIntervalId) clearInterval(checkIntervalId);

    // Initial check right now
    checkDueReminders();

    // Check every 25 seconds
    checkIntervalId = setInterval(checkDueReminders, 25000);
  }

  function checkDueReminders() {
    if (!reminders || reminders.length === 0) return;

    const now = new Date();
    let hasAlertedAny = false;

    reminders.forEach(rem => {
      if (!rem.enabled || rem.completed) return;

      const target = new Date(`${rem.date}T${rem.time}:00`);
      if (isNaN(target.getTime())) return;

      // Check if target is due (target <= now) and hasn't alerted for this exact schedule key
      const alertKey = `${rem.date}_${rem.time}`;
      if (now >= target && rem.lastAlerted !== alertKey) {
        rem.lastAlerted = alertKey;
        hasAlertedAny = true;

        // 1. Browser Notification
        if ('Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification(`AgriMind AI — Water ${rem.crop}!`, {
              body: `Irrigation due for ${rem.crop} (${rem.field || 'Field'}) via ${rem.method}. Time: ${rem.time}.`,
              icon: 'assets/icons/favicon.svg',
              requireInteraction: true
            });
          } catch (err) {
            console.warn('Notification failed:', err);
          }
        }

        // 2. In-App Toast
        if (window.showToast) {
          window.showToast(`⏰ Irrigation Due: ${rem.crop} (${rem.field || 'Main Field'}) via ${rem.method}!`, 'warning');
        }
      }
    });

    if (hasAlertedAny) {
      saveReminders();
      renderDashboard();
    }
  }

  // =========================================================================
  // FORM HANDLING (CREATE / EDIT)
  // =========================================================================

  function handleFormSubmit(e) {
    e.preventDefault();

    const crop = cropSelect.value;
    const field = fieldInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const frequency = freqSelect.value;
    const customDays = parseInt(customDaysInput.value) || 3;
    const method = methodSelect.value;
    const duration = durationInput.value.trim();
    const notes = notesInput.value.trim();
    const enabled = enabledToggle.checked;
    const editId = editIdInput.value;

    // Validation
    let isValid = true;

    if (!crop) {
      showError('reminderCropError', true);
      isValid = false;
    } else {
      showError('reminderCropError', false);
    }

    if (!date || isNaN(new Date(date).getTime())) {
      showError('reminderDateError', true);
      isValid = false;
    } else {
      showError('reminderDateError', false);
    }

    if (!time) {
      showError('reminderTimeError', true);
      isValid = false;
    } else {
      showError('reminderTimeError', false);
    }

    if (!isValid) return;

    if (editId) {
      // Edit Mode
      const existing = reminders.find(r => r.id === editId);
      if (existing) {
        existing.crop = crop;
        existing.field = field;
        existing.date = date;
        existing.time = time;
        existing.frequency = frequency;
        existing.customDays = customDays;
        existing.method = method;
        existing.duration = duration;
        existing.notes = notes;
        existing.enabled = enabled;
        existing.lastAlerted = null; // Reset alert so it alerts at new time if due
      }
      resetFormToCreateMode();
      if (window.showToast) window.showToast('Irrigation reminder updated.', 'success');
    } else {
      // Create Mode
      const newReminder = {
        id: `irrigation-${Date.now()}`,
        crop: crop,
        field: field,
        date: date,
        time: time,
        frequency: frequency,
        customDays: customDays,
        method: method,
        duration: duration,
        notes: notes,
        enabled: enabled,
        completed: false,
        completedAt: null,
        lastAlerted: null,
        createdAt: new Date().toISOString()
      };
      reminders.push(newReminder);
      reminderForm.reset();
      setDefaultDateTime();
      if (window.showToast) window.showToast(`Irrigation reminder set for ${crop}!`, 'success');
    }

    saveReminders();
    renderDashboard();
  }

  function startEditReminder(id) {
    const item = reminders.find(r => r.id === id);
    if (!item) return;

    editIdInput.value = item.id;
    cropSelect.value = item.crop;
    fieldInput.value = item.field || '';
    dateInput.value = item.date;
    timeInput.value = item.time;
    freqSelect.value = item.frequency || 'none';
    if (customDaysWrapper) {
      customDaysWrapper.style.display = item.frequency === 'custom' ? 'block' : 'none';
      customDaysInput.value = item.customDays || 4;
    }
    methodSelect.value = item.method || 'Drip';
    durationInput.value = item.duration || '';
    notesInput.value = item.notes || '';
    enabledToggle.checked = item.enabled !== false;
    updateToggleStyle();

    submitBtnText.textContent = 'Save Changes';
    if (cancelEditBtn) cancelEditBtn.style.display = 'inline-block';

    // Scroll to form
    reminderForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetFormToCreateMode() {
    editIdInput.value = '';
    reminderForm.reset();
    setDefaultDateTime();
    if (customDaysWrapper) customDaysWrapper.style.display = 'none';
    submitBtnText.textContent = 'Create Reminder';
    if (cancelEditBtn) cancelEditBtn.style.display = 'none';
    enabledToggle.checked = true;
    updateToggleStyle();
  }

  // =========================================================================
  // REMINDER ACTIONS (COMPLETE, PAUSE, POSTPONE, DELETE)
  // =========================================================================

  function markReminderCompleted(id) {
    const item = reminders.find(r => r.id === id);
    if (!item) return;

    const completedTimestamp = new Date().toISOString();

    if (item.frequency === 'none') {
      // One-time: mark completed
      item.completed = true;
      item.completedAt = completedTimestamp;
      if (window.showToast) window.showToast(`Irrigation completed for ${item.crop}!`, 'success');
    } else {
      // Recurring: record completed session in history and advance next scheduled date
      const daysToAdd = getFrequencyDays(item.frequency, item.customDays);

      // Create history record
      const historyItem = {
        ...item,
        id: `hist-${Date.now()}`,
        completed: true,
        completedAt: completedTimestamp,
        isHistory: true
      };
      reminders.push(historyItem);

      // Advance active reminder date
      const currentDate = new Date(`${item.date}T${item.time}:00`);
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      item.date = formatDateForInput(currentDate);
      item.lastAlerted = null; // Reset so next run can alert

      if (window.showToast) {
        window.showToast(`Watering logged! Next recurring session set for ${item.date} at ${item.time}.`, 'success');
      }
    }

    saveReminders();
    renderDashboard();
  }

  function toggleReminderEnabled(id) {
    const item = reminders.find(r => r.id === id);
    if (!item) return;

    item.enabled = !item.enabled;
    saveReminders();
    renderDashboard();

    if (window.showToast) {
      window.showToast(item.enabled ? 'Reminder resumed.' : 'Reminder paused.', 'info');
    }
  }

  function postponeReminder(id, hoursToAdd) {
    const item = reminders.find(r => r.id === id);
    if (!item) return;

    const current = new Date(`${item.date}T${item.time}:00`);
    current.setHours(current.getHours() + hoursToAdd);

    item.date = formatDateForInput(current);
    const hh = String(current.getHours()).padStart(2, '0');
    const mm = String(current.getMinutes()).padStart(2, '0');
    item.time = `${hh}:${mm}`;
    item.lastAlerted = null;

    saveReminders();
    renderDashboard();

    if (window.showToast) {
      window.showToast(`Postponed to ${item.date} at ${item.time}.`, 'info');
    }
  }

  function deleteReminder(id) {
    if (!confirm('Are you sure you want to delete this irrigation reminder?')) return;

    reminders = reminders.filter(r => r.id !== id);
    saveReminders();
    renderDashboard();

    if (window.showToast) window.showToast('Reminder deleted.', 'info');
  }

  // =========================================================================
  // DASHBOARD RENDERING
  // =========================================================================

  function renderDashboard() {
    updateCounts();

    const filtered = getFilteredReminders();
    cardsContainer.innerHTML = '';

    // Update Filter Heading
    const headingLabels = {
      all: 'All Active Reminders',
      'due-today': 'Due Today 💧',
      upcoming: 'Upcoming Watering Sessions ⏳',
      overdue: 'Overdue Reminders ⚠️',
      completed: 'Irrigation History & Completed Tasks ✓'
    };
    if (activeFilterHeading) {
      activeFilterHeading.textContent = headingLabels[activeFilter] || 'All Reminders';
    }

    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div class="card" style="padding: 2.5rem; text-align: center; color: var(--color-muted-text);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">💧</div>
          <h4 style="color: var(--color-text-dark); margin-bottom: 0.35rem;">No reminders found</h4>
          <p style="margin: 0; font-size: 0.9rem;">
            ${activeFilter === 'completed' ? 'No completed waterings recorded in history yet.' : 'No tasks match this filter. Create a reminder or click "+ Load Demo" to test.'}
          </p>
        </div>
      `;
      return;
    }

    // Sort: Due/Overdue first, then by date/time ascending
    const sorted = [...filtered].sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
    });

    sorted.forEach(item => {
      const card = createReminderCard(item);
      cardsContainer.appendChild(card);
    });
  }

  function createReminderCard(item) {
    const card = document.createElement('div');
    const status = getReminderStatus(item);

    card.className = `irrigation-card status-${status}`;

    // Header: Crop + Field & Relative Time Badge
    const header = document.createElement('div');
    header.className = 'irrigation-card-header';

    const titleGroup = document.createElement('div');
    titleGroup.innerHTML = `
      <div class="irrigation-crop-title">${item.crop}</div>
      <div class="irrigation-field-name">${item.field || 'Main Farm Plot'}</div>
    `;

    const statusBadge = document.createElement('div');
    statusBadge.innerHTML = getStatusBadgeHtml(status, item);

    header.appendChild(titleGroup);
    header.appendChild(statusBadge);
    card.appendChild(header);

    // Meta Chips: Method, Time, Frequency, Duration
    const metaChips = document.createElement('div');
    metaChips.className = 'irrigation-meta-chips';

    const timeChip = document.createElement('span');
    timeChip.className = 'irrigation-chip';
    timeChip.innerHTML = `📅 ${formatHumanDate(new Date(item.date + 'T00:00:00'))} at <strong>${formatTime12h(item.time)}</strong>`;

    const methodChip = document.createElement('span');
    methodChip.className = 'irrigation-chip';
    methodChip.innerHTML = `💧 ${item.method}`;

    const freqChip = document.createElement('span');
    freqChip.className = 'irrigation-chip';
    freqChip.innerHTML = `🔁 ${formatFrequencyLabel(item.frequency, item.customDays)}`;

    metaChips.appendChild(timeChip);
    metaChips.appendChild(methodChip);
    metaChips.appendChild(freqChip);

    if (item.duration) {
      const durChip = document.createElement('span');
      durChip.className = 'irrigation-chip';
      durChip.innerHTML = `⏱️ ${item.duration}`;
      metaChips.appendChild(durChip);
    }

    card.appendChild(metaChips);

    // Notes Box
    if (item.notes) {
      const notesBox = document.createElement('div');
      notesBox.className = 'irrigation-notes-box';
      notesBox.textContent = `Note: ${item.notes}`;
      card.appendChild(notesBox);
    }

    // Actions Row
    const actions = document.createElement('div');
    actions.className = 'irrigation-card-actions';

    if (!item.completed) {
      const leftActions = document.createElement('div');
      leftActions.style.display = 'flex';
      leftActions.style.gap = '0.5rem';

      const completeBtn = document.createElement('button');
      completeBtn.type = 'button';
      completeBtn.className = 'btn btn-sm btn-primary';
      completeBtn.textContent = '✓ Mark Completed';
      completeBtn.addEventListener('click', () => markReminderCompleted(item.id));

      const postponeBtn = document.createElement('button');
      postponeBtn.type = 'button';
      postponeBtn.className = 'btn btn-sm btn-outline-dark';
      postponeBtn.textContent = '+2h';
      postponeBtn.title = 'Postpone by 2 hours';
      postponeBtn.addEventListener('click', () => postponeReminder(item.id, 2));

      leftActions.appendChild(completeBtn);
      leftActions.appendChild(postponeBtn);
      actions.appendChild(leftActions);

      const rightActions = document.createElement('div');
      rightActions.style.display = 'flex';
      rightActions.style.gap = '0.4rem';

      // Pause/Resume button for recurring
      if (item.frequency !== 'none') {
        const pauseBtn = document.createElement('button');
        pauseBtn.type = 'button';
        pauseBtn.className = 'btn btn-sm btn-outline-dark';
        pauseBtn.textContent = item.enabled ? '⏸️' : '▶️';
        pauseBtn.title = item.enabled ? 'Pause Recurring' : 'Resume Recurring';
        pauseBtn.addEventListener('click', () => toggleReminderEnabled(item.id));
        rightActions.appendChild(pauseBtn);
      }

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn btn-sm btn-secondary';
      editBtn.textContent = '✏️ Edit';
      editBtn.addEventListener('click', () => startEditReminder(item.id));

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-sm btn-outline-dark';
      deleteBtn.textContent = '🗑️';
      deleteBtn.style.color = 'var(--color-danger)';
      deleteBtn.addEventListener('click', () => deleteReminder(item.id));

      rightActions.appendChild(editBtn);
      rightActions.appendChild(deleteBtn);
      actions.appendChild(rightActions);

    } else {
      // Completed item in history
      const completedInfo = document.createElement('div');
      completedInfo.style.fontSize = '0.8rem';
      completedInfo.style.color = '#2E7D32';
      completedInfo.style.fontWeight = '600';
      completedInfo.textContent = `✓ Logged on ${formatHumanDate(new Date(item.completedAt || item.date))}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-sm btn-outline-dark';
      deleteBtn.textContent = '🗑️ Delete';
      deleteBtn.style.color = 'var(--color-danger)';
      deleteBtn.addEventListener('click', () => deleteReminder(item.id));

      actions.appendChild(completedInfo);
      actions.appendChild(deleteBtn);
    }

    card.appendChild(actions);
    return card;
  }

  function getReminderStatus(item) {
    if (item.completed) return 'completed';
    if (!item.enabled) return 'paused';

    const now = new Date();
    const scheduled = new Date(`${item.date}T${item.time}:00`);

    if (isNaN(scheduled.getTime())) return 'upcoming';

    const todayStr = formatDateForInput(now);
    const isToday = item.date === todayStr;

    if (now > scheduled && !isToday) {
      return 'overdue';
    }
    if (now > scheduled && isToday) {
      // Past time today
      return 'due';
    }
    if (isToday) {
      return 'due';
    }
    return 'upcoming';
  }

  function getStatusBadgeHtml(status, item) {
    switch (status) {
      case 'due':
        return `<span class="badge" style="background: rgba(128, 184, 90, 0.2); color: #2E7D32; font-weight: 700; border: 1px solid var(--color-fresh-leaf);">💧 Due Today</span>`;
      case 'overdue':
        return `<span class="badge" style="background: rgba(209, 59, 59, 0.15); color: var(--color-danger); font-weight: 700;">⚠️ Overdue</span>`;
      case 'upcoming':
        return `<span class="badge badge-dark">Upcoming</span>`;
      case 'paused':
        return `<span class="badge" style="background: #EEE; color: #666;">⏸️ Paused</span>`;
      case 'completed':
        return `<span class="badge" style="background: #E8F5E9; color: #2E7D32;">✓ Completed</span>`;
      default:
        return `<span class="badge badge-dark">Scheduled</span>`;
    }
  }

  function updateCounts() {
    let dueCount = 0;
    let upcomingCount = 0;
    let overdueCount = 0;
    let completedCount = 0;
    let activeTotal = 0;

    reminders.forEach(r => {
      if (r.completed) {
        completedCount++;
      } else {
        activeTotal++;
        const s = getReminderStatus(r);
        if (s === 'due') dueCount++;
        else if (s === 'overdue') overdueCount++;
        else if (s === 'upcoming') upcomingCount++;
      }
    });

    if (statAllCount) statAllCount.textContent = activeTotal;
    if (statDueCount) statDueCount.textContent = dueCount;
    if (statUpcomingCount) statUpcomingCount.textContent = upcomingCount;
    if (statOverdueCount) statOverdueCount.textContent = overdueCount;
    if (statCompletedCount) statCompletedCount.textContent = completedCount;
  }

  function getFilteredReminders() {
    switch (activeFilter) {
      case 'due-today':
        return reminders.filter(r => !r.completed && getReminderStatus(r) === 'due');
      case 'upcoming':
        return reminders.filter(r => !r.completed && getReminderStatus(r) === 'upcoming');
      case 'overdue':
        return reminders.filter(r => !r.completed && getReminderStatus(r) === 'overdue');
      case 'completed':
        return reminders.filter(r => r.completed);
      case 'all':
      default:
        return reminders.filter(r => !r.completed);
    }
  }

  // =========================================================================
  // STORAGE & SAMPLE DATA
  // =========================================================================

  function loadReminders() {
    try {
      const stored = localStorage.getItem(REMINDERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          reminders = parsed;
          renderDashboard();
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read saved reminders:', e);
    }

    // Default sample if empty
    loadSampleDemoReminders(false);
  }

  function saveReminders() {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  }

  function loadSampleDemoReminders(showToastAlert = true) {
    const today = new Date();
    const todayStr = formatDateForInput(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDateForInput(yesterday);

    const inTwoDays = new Date(today);
    inTwoDays.setDate(inTwoDays.getDate() + 2);
    const inTwoDaysStr = formatDateForInput(inTwoDays);

    reminders = [
      {
        id: 'rem-demo-1',
        crop: 'Tomato',
        field: 'North Plot Borewell #1',
        date: todayStr,
        time: '07:30',
        frequency: 'every-2-days',
        customDays: 2,
        method: 'Drip',
        duration: '45 mins',
        notes: 'Flowering stage: apply 19:19:19 water-soluble fertigation.',
        enabled: true,
        completed: false,
        lastAlerted: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 'rem-demo-2',
        crop: 'Wheat',
        field: 'Block C East Canal',
        date: inTwoDaysStr,
        time: '06:00',
        frequency: 'every-5-days',
        customDays: 5,
        method: 'Flood',
        duration: '2 hours',
        notes: 'CRI (Crown Root Initiation) irrigation: maintain uniform water depth.',
        enabled: true,
        completed: false,
        lastAlerted: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 'rem-demo-3',
        crop: 'Cotton',
        field: 'South Block 4',
        date: yesterdayStr,
        time: '17:00',
        frequency: 'weekly',
        customDays: 7,
        method: 'Sprinkler',
        duration: '1.5 hours',
        notes: 'Square formation stage: check for bollworm symptoms while watering.',
        enabled: true,
        completed: false,
        lastAlerted: null,
        createdAt: new Date().toISOString()
      }
    ];

    saveReminders();
    renderDashboard();

    if (showToastAlert && window.showToast) {
      window.showToast('Loaded 3 demo irrigation reminders (Due Today, Upcoming, Overdue).', 'info');
    }
  }

  // =========================================================================
  // SCIENCE-BACKED GUIDANCE CALCULATOR
  // =========================================================================

  function initGuidanceCalculator() {
    const btnCalc = document.getElementById('btnCalculateGuidance');
    const resultBox = document.getElementById('guidanceResultBox');
    const btnApply = document.getElementById('btnApplyGuidanceToForm');

    if (btnCalc && resultBox) {
      btnCalc.addEventListener('click', () => {
        calculateIrrigationGuidance();
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    if (btnApply) {
      btnApply.addEventListener('click', applyGuidanceToForm);
    }
  }

  let latestGuidanceResult = null;

  function calculateIrrigationGuidance() {
    const crop = document.getElementById('guideCropSelect').value;
    const soil = document.getElementById('guideSoilSelect').value;
    const stage = document.getElementById('guideStageSelect').value;
    const rain = document.getElementById('guideRainSelect').value;

    let baseInterval = 4; // days

    // Soil factors
    if (soil === 'sandy') baseInterval -= 1.5;
    else if (soil === 'clay') baseInterval += 1.5;
    else if (soil === 'black') baseInterval += 2.0;

    // Stage factors
    let isCritical = false;
    if (stage === 'flowering') {
      baseInterval -= 1.0;
      isCritical = true;
    } else if (stage === 'seedling') {
      baseInterval -= 0.5;
    } else if (stage === 'maturity') {
      baseInterval += 2.0;
    }

    // Rainfall adjustments
    let rainNote = '';
    if (rain === 'heavy') {
      baseInterval += 6.0;
      rainNote = 'Heavy rainfall recorded (>25 mm): Withhold all irrigation for 5-7 days until top 5 cm soil dries.';
    } else if (rain === 'moderate') {
      baseInterval += 3.0;
      rainNote = 'Moderate rain (10-25 mm) covers 3-4 days of crop evapotranspiration.';
    } else if (rain === 'light') {
      baseInterval += 1.0;
      rainNote = 'Light rain provides transient leaf cooling but insufficient root zone recharge.';
    }

    const finalInterval = Math.max(1, Math.round(baseInterval));

    let intervalText = '';
    let headline = '';
    let summary = '';

    if (rain === 'heavy') {
      intervalText = 'Withhold (Skip 5-7 Days)';
      headline = 'Rainfall Soil Satiation — Do Not Irrigate';
      summary = `${rainNote} Avoid waterlogging to prevent seedling root rot. Inspect field surface drainage.`;
    } else {
      intervalText = `Every ${finalInterval} - ${finalInterval + 1} Days`;
      headline = `Recommended Interval: Every ${finalInterval} Days`;
      summary = `For ${capitalize(crop)} in ${stage} stage under ${soil} soil: irrigate every ${finalInterval} days using drip or furrow method. ${isCritical ? '⚠️ Warning: Flowering is the most critical moisture sensitivity phase — drought stress will trigger irreversible blossom abort!' : ''} ${rainNote}`;
    }

    // Update DOM
    document.getElementById('guideIntervalBadge').textContent = intervalText;
    document.getElementById('guideResultHeadline').textContent = headline;
    document.getElementById('guideResultSummary').textContent = summary;

    latestGuidanceResult = {
      crop: capitalize(crop),
      intervalDays: finalInterval,
      isHeavyRain: rain === 'heavy'
    };
  }

  function applyGuidanceToForm() {
    if (!latestGuidanceResult) return;

    // Pre-fill crop
    const cropValueMap = {
      Rice: 'Rice / Paddy',
      Wheat: 'Wheat',
      Tomato: 'Tomato',
      Cotton: 'Cotton',
      Maize: 'Maize / Corn',
      Groundnut: 'Groundnut',
      Sugarcane: 'Sugarcane'
    };
    if (cropSelect && cropValueMap[latestGuidanceResult.crop]) {
      cropSelect.value = cropValueMap[latestGuidanceResult.crop];
    }

    // Set frequency
    if (freqSelect) {
      if (latestGuidanceResult.intervalDays === 1) {
        freqSelect.value = 'daily';
        if (customDaysWrapper) customDaysWrapper.style.display = 'none';
      } else if (latestGuidanceResult.intervalDays === 2) {
        freqSelect.value = 'every-2-days';
        if (customDaysWrapper) customDaysWrapper.style.display = 'none';
      } else if (latestGuidanceResult.intervalDays === 3) {
        freqSelect.value = 'every-3-days';
        if (customDaysWrapper) customDaysWrapper.style.display = 'none';
      } else if (latestGuidanceResult.intervalDays === 5) {
        freqSelect.value = 'every-5-days';
        if (customDaysWrapper) customDaysWrapper.style.display = 'none';
      } else if (latestGuidanceResult.intervalDays === 7) {
        freqSelect.value = 'weekly';
        if (customDaysWrapper) customDaysWrapper.style.display = 'none';
      } else {
        freqSelect.value = 'custom';
        if (customDaysWrapper) {
          customDaysWrapper.style.display = 'block';
          customDaysInput.value = latestGuidanceResult.intervalDays;
        }
      }
    }

    if (notesInput) {
      notesInput.value = `Schedule derived from ICAR soil moisture benchmark: ${latestGuidanceResult.intervalDays} day watering cycle.`;
    }

    // Scroll to form
    reminderForm.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (window.showToast) {
      window.showToast(`Applied ${latestGuidanceResult.crop} ${latestGuidanceResult.intervalDays}-day frequency to form!`, 'info');
    }
  }

  // =========================================================================
  // UTILITY HELPERS
  // =========================================================================

  function getFrequencyDays(freq, customDays) {
    switch (freq) {
      case 'daily': return 1;
      case 'every-2-days': return 2;
      case 'every-3-days': return 3;
      case 'every-5-days': return 5;
      case 'weekly': return 7;
      case 'custom': return parseInt(customDays) || 3;
      default: return 1;
    }
  }

  function formatFrequencyLabel(freq, customDays) {
    switch (freq) {
      case 'daily': return 'Daily';
      case 'every-2-days': return 'Every 2 Days';
      case 'every-3-days': return 'Every 3 Days';
      case 'every-5-days': return 'Every 5 Days';
      case 'weekly': return 'Weekly';
      case 'custom': return `Every ${customDays || 4} Days`;
      case 'none':
      default:
        return 'One-Time';
    }
  }

  function formatDateForInput(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function formatHumanDate(d) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function formatTime12h(timeStr) {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    let h = parseInt(parts[0], 10);
    const m = parts[1] || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function showError(elementId, show) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = show ? 'block' : 'none';
  }

})();
