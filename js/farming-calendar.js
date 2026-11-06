/**
 * AGRIMIND AI — SMART FARMING CALENDAR ENGINE
 * Manages crop activity roadmap, monthly calendar view, task CRUD,
 * completion progress, filters, and localStorage persistence.
 */

(function () {
  'use strict';

  // Constants & Storage Keys
  const STORAGE_KEY = 'agrimind_crop_plans';

  // State
  let activePlan = null;
  let viewDate = new Date();
  let currentViewMode = 'month'; // 'month' or 'list'
  let activeFilters = {
    category: 'all',
    status: 'all',
    search: ''
  };
  let selectedTaskId = null;

  // DOM Elements
  let setupCard, dashboard, cropForm;
  let calendarDaysGrid, timelineList, monthTitle;
  let summaryCropBadge, summaryCycleDayBadge, summaryPlanTitle, summaryLocationSubtitle;
  let metricSowingDate, metricHarvestDate, metricDuration, metricTaskStats;
  let progressFill, progressPercent;
  let overdueContainer, upcomingContainer, completedContainer;
  let overdueBadge, upcomingBadge, completedBadge;

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', initFarmingCalendar);

  function initFarmingCalendar() {
    setupCard = document.getElementById('calendarSetupCard');
    dashboard = document.getElementById('calendarDashboard');
    cropForm = document.getElementById('cropPlanForm');

    calendarDaysGrid = document.getElementById('calendarDaysGrid');
    timelineList = document.getElementById('timelineTasksList');
    monthTitle = document.getElementById('calendarMonthTitle');

    summaryCropBadge = document.getElementById('summaryCropBadge');
    summaryCycleDayBadge = document.getElementById('summaryCycleDayBadge');
    summaryPlanTitle = document.getElementById('summaryPlanTitle');
    summaryLocationSubtitle = document.getElementById('summaryLocationSubtitle');

    metricSowingDate = document.getElementById('metricSowingDate');
    metricHarvestDate = document.getElementById('metricHarvestDate');
    metricDuration = document.getElementById('metricDuration');
    metricTaskStats = document.getElementById('metricTaskStats');

    progressFill = document.getElementById('calendarProgressFill');
    progressPercent = document.getElementById('calendarProgressPercent');

    overdueContainer = document.getElementById('overdueTasksContainer');
    upcomingContainer = document.getElementById('upcomingTasksContainer');
    completedContainer = document.getElementById('completedTasksContainer');

    overdueBadge = document.getElementById('overdueCountBadge');
    upcomingBadge = document.getElementById('upcomingCountBadge');
    completedBadge = document.getElementById('completedCountBadge');

    // Bind Event Listeners
    bindEvents();

    // Set Default Sowing Date in form to today
    const sowingInput = document.getElementById('planSowingDate');
    if (sowingInput && !sowingInput.value) {
      sowingInput.value = formatDateForInput(new Date());
    }

    // Load Saved Plan or default sample
    loadSavedPlan();
  }

  function bindEvents() {
    // Form Submit
    if (cropForm) {
      cropForm.addEventListener('submit', handlePlanFormSubmit);
    }

    // Sample Plan Prefill
    const prefillBtn = document.getElementById('btnPrefillSamplePlan');
    if (prefillBtn) {
      prefillBtn.addEventListener('click', prefillSampleData);
    }

    // Calendar Month Navigation
    const prevBtn = document.getElementById('btnPrevMonth');
    const nextBtn = document.getElementById('btnNextMonth');
    const todayBtn = document.getElementById('btnToday');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() - 1);
        renderCalendar();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() + 1);
        renderCalendar();
      });
    }

    if (todayBtn) {
      todayBtn.addEventListener('click', () => {
        viewDate = new Date();
        renderCalendar();
      });
    }

    // View Switcher Buttons
    const viewBtnMonth = document.getElementById('viewBtnMonth');
    const viewBtnList = document.getElementById('viewBtnList');
    const monthContainer = document.getElementById('monthViewContainer');
    const listContainer = document.getElementById('listViewContainer');

    if (viewBtnMonth && viewBtnList) {
      viewBtnMonth.addEventListener('click', () => {
        currentViewMode = 'month';
        viewBtnMonth.classList.add('active');
        viewBtnList.classList.remove('active');
        monthContainer.style.display = 'block';
        listContainer.style.display = 'none';
        renderCalendar();
      });

      viewBtnList.addEventListener('click', () => {
        currentViewMode = 'list';
        viewBtnList.classList.add('active');
        viewBtnMonth.classList.remove('active');
        monthContainer.style.display = 'none';
        listContainer.style.display = 'block';
        renderCalendar();
      });
    }

    // Filters
    const catSelect = document.getElementById('filterCategorySelect');
    const statusSelect = document.getElementById('filterStatusSelect');
    const searchInput = document.getElementById('filterSearchInput');

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        activeFilters.category = e.target.value;
        renderCalendar();
      });
    }

    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        activeFilters.status = e.target.value;
        renderCalendar();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeFilters.search = e.target.value.toLowerCase().trim();
        renderCalendar();
      });
    }

    // Plan Actions
    const printBtn = document.getElementById('btnPrintCalendar');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    const resetBtn = document.getElementById('btnResetPlan');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (window.openModal) window.openModal('resetPlanModal');
      });
    }

    const confirmResetBtn = document.getElementById('btnConfirmResetPlan');
    if (confirmResetBtn) {
      confirmResetBtn.addEventListener('click', handleResetPlan);
    }

    // Add Custom Task Modal Open
    const openAddBtn = document.getElementById('btnOpenAddTaskModal');
    if (openAddBtn) {
      openAddBtn.addEventListener('click', () => {
        const dateInput = document.getElementById('customTaskDate');
        if (dateInput && !dateInput.value) {
          dateInput.value = formatDateForInput(new Date());
        }
        if (window.openModal) window.openModal('addTaskModal');
      });
    }

    // Add Custom Task Form Submit
    const customTaskForm = document.getElementById('customTaskForm');
    if (customTaskForm) {
      customTaskForm.addEventListener('submit', handleAddCustomTask);
    }

    // Edit Task Form Submit
    const editTaskForm = document.getElementById('editTaskForm');
    if (editTaskForm) {
      editTaskForm.addEventListener('submit', handleSaveEditedTask);
    }

    // Modal Actions (Detail Modal)
    const btnToggleComplete = document.getElementById('btnModalToggleComplete');
    if (btnToggleComplete) {
      btnToggleComplete.addEventListener('click', () => {
        if (!selectedTaskId) return;
        toggleTaskCompletion(selectedTaskId);
        if (window.closeModal) window.closeModal('taskDetailModal');
      });
    }

    const btnModalEdit = document.getElementById('btnModalEditTask');
    if (btnModalEdit) {
      btnModalEdit.addEventListener('click', () => {
        if (!selectedTaskId) return;
        if (window.closeModal) window.closeModal('taskDetailModal');
        openEditTaskModal(selectedTaskId);
      });
    }

    const btnModalDelete = document.getElementById('btnModalDeleteTask');
    if (btnModalDelete) {
      btnModalDelete.addEventListener('click', () => {
        if (!selectedTaskId) return;
        if (confirm('Are you sure you want to delete this farming task?')) {
          deleteTask(selectedTaskId);
          if (window.closeModal) window.closeModal('taskDetailModal');
        }
      });
    }

    // Postpone Actions
    const btnPostpone3 = document.getElementById('btnPostpone3Days');
    if (btnPostpone3) {
      btnPostpone3.addEventListener('click', () => postponeSelectedTask(3));
    }

    const btnPostpone7 = document.getElementById('btnPostpone7Days');
    if (btnPostpone7) {
      btnPostpone7.addEventListener('click', () => postponeSelectedTask(7));
    }

    const btnPostponeCustom = document.getElementById('btnPostponeCustom');
    if (btnPostponeCustom) {
      btnPostponeCustom.addEventListener('click', () => {
        const newDateStr = prompt('Enter new date (YYYY-MM-DD):');
        if (newDateStr && !isNaN(new Date(newDateStr).getTime())) {
          rescheduleSelectedTask(newDateStr);
        } else if (newDateStr) {
          alert('Invalid date format. Please use YYYY-MM-DD.');
        }
      });
    }
  }

  // =========================================================================
  // PLAN CREATION & STORAGE
  // =========================================================================

  function handlePlanFormSubmit(e) {
    e.preventDefault();

    const cropKey = document.getElementById('planCropSelect').value;
    const sowingDateStr = document.getElementById('planSowingDate').value;
    const state = document.getElementById('planStateSelect').value;
    const district = document.getElementById('planDistrictInput').value.trim();
    const area = parseFloat(document.getElementById('planAreaInput').value);
    const unit = document.getElementById('planUnitSelect').value;
    const farmingMethod = document.getElementById('planFarmingMethod').value;
    const irrigationMethod = document.getElementById('planIrrigationMethod').value;
    const notes = document.getElementById('planNotesInput').value.trim();

    // Validation
    let isValid = true;

    if (!cropKey) {
      showError('cropSelectError', true);
      isValid = false;
    } else {
      showError('cropSelectError', false);
    }

    if (!sowingDateStr || isNaN(new Date(sowingDateStr).getTime())) {
      showError('sowingDateError', true);
      isValid = false;
    } else {
      showError('sowingDateError', false);
    }

    if (!state) {
      showError('stateError', true);
      isValid = false;
    } else {
      showError('stateError', false);
    }

    if (!district) {
      showError('districtError', true);
      isValid = false;
    } else {
      showError('districtError', false);
    }

    if (isNaN(area) || area <= 0) {
      showError('areaError', true);
      isValid = false;
    } else {
      showError('areaError', false);
    }

    if (!isValid) return;

    // Build Plan Object from Template
    const template = window.farmingCropSchedules ? window.farmingCropSchedules[cropKey] : null;
    if (!template) {
      alert('Selected crop schedule template is not available.');
      return;
    }

    const sowingDate = new Date(sowingDateStr + 'T00:00:00');

    // Generate tasks with calculated dates
    const generatedTasks = template.tasks.map((taskTmpl, index) => {
      const taskDate = new Date(sowingDate.getTime() + taskTmpl.dayOffset * 86400000);
      return {
        id: `task-${Date.now()}-${index}`,
        dayOffset: taskTmpl.dayOffset,
        date: formatDateForInput(taskDate),
        title: taskTmpl.title,
        category: taskTmpl.category,
        description: taskTmpl.description,
        completed: false,
        completedAt: null,
        isCustom: false
      };
    });

    const newPlan = {
      id: `plan-${Date.now()}`,
      cropKey: cropKey,
      cropName: template.name,
      typicalDuration: template.typicalDuration,
      season: template.season,
      state: state,
      district: district,
      sowingDate: sowingDateStr,
      area: area,
      unit: unit,
      farmingMethod: farmingMethod,
      irrigationMethod: irrigationMethod,
      notes: notes,
      createdAt: new Date().toISOString(),
      tasks: generatedTasks
    };

    activePlan = newPlan;
    saveActivePlan();

    // Center calendar view around the sowing month
    viewDate = new Date(sowingDate);

    if (window.showToast) {
      window.showToast(`Farming Calendar generated for ${template.name}!`, 'success');
    }

    renderDashboard();
  }

  function prefillSampleData() {
    document.getElementById('planCropSelect').value = 'rice';
    document.getElementById('planStateSelect').value = 'Punjab';
    document.getElementById('planDistrictInput').value = 'Ludhiana';
    document.getElementById('planAreaInput').value = '3.0';
    document.getElementById('planUnitSelect').value = 'Acres';
    document.getElementById('planFarmingMethod').value = 'Conventional';
    document.getElementById('planIrrigationMethod').value = 'Drip';
    document.getElementById('planNotesInput').value = 'Pusa Basmati PB-1121 seed lot, Plot #4';

    // Set sowing date to 10 days ago so there are realistic past & upcoming tasks
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    document.getElementById('planSowingDate').value = formatDateForInput(pastDate);
  }

  function loadSavedPlan() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.tasks && parsed.tasks.length > 0) {
          activePlan = parsed;
          // Set viewDate to sowing month or today
          if (activePlan.sowingDate) {
            viewDate = new Date();
          }
          renderDashboard();
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read saved farming calendar:', e);
    }

    // If no plan, ensure setup card is visible and dashboard hidden
    if (setupCard) setupCard.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
  }

  function saveActivePlan() {
    if (!activePlan) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activePlan));
  }

  function handleResetPlan() {
    activePlan = null;
    localStorage.removeItem(STORAGE_KEY);
    if (window.closeModal) window.closeModal('resetPlanModal');

    if (dashboard) dashboard.style.display = 'none';
    if (setupCard) setupCard.style.display = 'block';

    if (window.showToast) {
      window.showToast('Farming calendar plan reset. You can create a new crop cycle.', 'info');
    }
  }

  // =========================================================================
  // DASHBOARD & CALENDAR RENDERING
  // =========================================================================

  function renderDashboard() {
    if (!activePlan) {
      if (setupCard) setupCard.style.display = 'block';
      if (dashboard) dashboard.style.display = 'none';
      return;
    }

    if (setupCard) setupCard.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';

    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();
  }

  function updateSummaryCard() {
    if (!activePlan) return;

    summaryCropBadge.textContent = activePlan.cropName.split('(')[0].trim();
    summaryPlanTitle.textContent = activePlan.cropName;
    summaryLocationSubtitle.textContent = `${activePlan.area} ${activePlan.unit} • ${activePlan.district}, ${activePlan.state} • ${activePlan.irrigationMethod} Irrigation`;

    const sowing = new Date(activePlan.sowingDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - sowing) / 86400000);
    const totalDuration = activePlan.typicalDuration || 120;

    let cycleText = '';
    if (diffDays < 0) {
      cycleText = `${Math.abs(diffDays)} Days to Sowing`;
    } else if (diffDays <= totalDuration) {
      cycleText = `Day ${diffDays} of ${totalDuration}`;
    } else {
      cycleText = `Post-Harvest (Day ${diffDays})`;
    }
    summaryCycleDayBadge.textContent = cycleText;

    // Metrics
    metricSowingDate.textContent = formatHumanDate(sowing);

    const harvest = new Date(sowing.getTime() + totalDuration * 86400000);
    metricHarvestDate.textContent = formatHumanDate(harvest);
    metricDuration.textContent = `${totalDuration} Days (${activePlan.season || 'Standard'})`;

    // Tasks completion stats
    const totalTasks = activePlan.tasks.length;
    const doneTasks = activePlan.tasks.filter(t => t.completed).length;
    metricTaskStats.textContent = `${doneTasks} / ${totalTasks} Done`;

    const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    progressFill.style.width = `${pct}%`;
    progressPercent.textContent = `${pct}% Completed`;
  }

  function renderCalendar() {
    if (!activePlan) return;

    if (currentViewMode === 'month') {
      renderMonthGrid();
    } else {
      renderListView();
    }
  }

  function renderMonthGrid() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (monthTitle) {
      monthTitle.textContent = `${monthNames[month]} ${year}`;
    }

    calendarDaysGrid.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const today = new Date();
    const todayStr = formatDateForInput(today);

    // Filter tasks according to activeFilters
    const filteredTasks = getFilteredTasks();

    // 1. Previous Month Spillover Days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const prevDate = new Date(year, month - 1, dayNum);
      const prevDateStr = formatDateForInput(prevDate);
      const cell = createDayCell(prevDateStr, dayNum, true, false, filteredTasks);
      calendarDaysGrid.appendChild(cell);
    }

    // 2. Current Month Days
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const curDate = new Date(year, month, day);
      const curDateStr = formatDateForInput(curDate);
      const isToday = curDateStr === todayStr;
      const cell = createDayCell(curDateStr, day, false, isToday, filteredTasks);
      calendarDaysGrid.appendChild(cell);
    }

    // 3. Next Month Spillover Days (to fill out grid up to multiple of 7)
    const currentTotalCells = firstDayIndex + totalDaysInMonth;
    const remainingCells = (7 - (currentTotalCells % 7)) % 7;
    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      const nextDate = new Date(year, month + 1, nextDay);
      const nextDateStr = formatDateForInput(nextDate);
      const cell = createDayCell(nextDateStr, nextDay, true, false, filteredTasks);
      calendarDaysGrid.appendChild(cell);
    }
  }

  function createDayCell(dateStr, dayNum, isOtherMonth, isToday, filteredTasks) {
    const cell = document.createElement('div');
    cell.className = `calendar-day-cell${isOtherMonth ? ' other-month' : ''}${isToday ? ' is-today' : ''}`;

    // Header
    const header = document.createElement('div');
    header.className = 'day-header';

    const numSpan = document.createElement('span');
    numSpan.className = 'day-number';
    numSpan.textContent = dayNum;

    const quickAddBtn = document.createElement('button');
    quickAddBtn.className = 'day-quick-add';
    quickAddBtn.title = 'Add task on this day';
    quickAddBtn.textContent = '+';
    quickAddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openAddTaskModalOnDate(dateStr);
    });

    header.appendChild(numSpan);
    header.appendChild(quickAddBtn);
    cell.appendChild(header);

    // Tasks on this day
    const tasksList = document.createElement('div');
    tasksList.className = 'day-tasks-list';

    const dayTasks = filteredTasks.filter(t => t.date === dateStr);

    dayTasks.forEach(task => {
      const pill = document.createElement('div');
      const isOverdue = isTaskOverdue(task);
      pill.className = `task-pill${task.completed ? ' is-completed' : ''}${isOverdue ? ' is-overdue' : ''}`;

      const catMeta = getCategoryMeta(task.category);

      const dot = document.createElement('span');
      dot.className = 'task-category-dot';
      dot.style.backgroundColor = catMeta.color;

      const titleSpan = document.createElement('span');
      titleSpan.textContent = task.title;

      pill.appendChild(dot);
      pill.appendChild(titleSpan);

      pill.title = `${task.title} (${catMeta.name})`;

      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        openTaskDetailModal(task.id);
      });

      tasksList.appendChild(pill);
    });

    cell.appendChild(tasksList);
    return cell;
  }

  function renderListView() {
    if (!timelineList || !activePlan) return;

    const filtered = getFilteredTasks();
    timelineList.innerHTML = '';

    if (filtered.length === 0) {
      timelineList.innerHTML = `
        <div class="card" style="padding: 2.5rem; text-align: center; color: var(--color-muted-text);">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h4>No tasks match your selected filters</h4>
          <p style="margin: 0;">Try clearing your search text or changing the category/status filter.</p>
        </div>
      `;
      return;
    }

    // Sort chronologically
    const sorted = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(task => {
      const catMeta = getCategoryMeta(task.category);
      const isOverdue = isTaskOverdue(task);
      const taskDate = new Date(task.date + 'T00:00:00');

      const card = document.createElement('div');
      card.className = `timeline-task-card${task.completed ? ' is-completed' : ''}${isOverdue ? ' is-overdue' : ''}`;

      // Date Column
      const dateCol = document.createElement('div');
      dateCol.className = 'timeline-date-col';
      dateCol.innerHTML = `
        <div class="timeline-date-day">${formatHumanDate(taskDate, true)}</div>
        <div class="timeline-date-offset">${task.dayOffset !== undefined ? (task.dayOffset >= 0 ? `Day +${task.dayOffset}` : `Day ${task.dayOffset}`) : 'Custom Task'}</div>
      `;

      // Content Column
      const contentCol = document.createElement('div');
      contentCol.className = 'timeline-content-col';

      let statusBadgeHtml = '';
      if (task.completed) {
        statusBadgeHtml = `<span class="badge" style="background: #E8F5E9; color: #2E7D32;">✓ Completed</span>`;
      } else if (isOverdue) {
        statusBadgeHtml = `<span class="badge" style="background: rgba(209, 59, 59, 0.15); color: var(--color-danger);">⚠️ Overdue</span>`;
      } else {
        statusBadgeHtml = `<span class="badge badge-dark">Pending</span>`;
      }

      contentCol.innerHTML = `
        <h4>
          <span>${task.title}</span>
          <span class="badge" style="background: ${catMeta.bg}; color: ${catMeta.color}; border: 1px solid ${catMeta.color};">
            ${catMeta.icon} ${catMeta.name}
          </span>
          ${statusBadgeHtml}
        </h4>
        <p>${task.description || 'No additional instructions.'}</p>
      `;

      // Actions Column
      const actionsCol = document.createElement('div');
      actionsCol.className = 'timeline-actions-col';

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = `btn btn-sm ${task.completed ? 'btn-outline-dark' : 'btn-primary'}`;
      toggleBtn.textContent = task.completed ? 'Undo Done' : '✓ Mark Done';
      toggleBtn.addEventListener('click', () => toggleTaskCompletion(task.id));

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn btn-sm btn-secondary';
      editBtn.textContent = '✏️ Edit';
      editBtn.addEventListener('click', () => openEditTaskModal(task.id));

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-sm btn-outline-dark';
      deleteBtn.textContent = '🗑️';
      deleteBtn.title = 'Delete Task';
      deleteBtn.style.color = 'var(--color-danger)';
      deleteBtn.addEventListener('click', () => {
        if (confirm('Delete this task from calendar?')) {
          deleteTask(task.id);
        }
      });

      actionsCol.appendChild(toggleBtn);
      actionsCol.appendChild(editBtn);
      actionsCol.appendChild(deleteBtn);

      card.appendChild(dateCol);
      card.appendChild(contentCol);
      card.appendChild(actionsCol);

      timelineList.appendChild(card);
    });
  }

  function updatePriorityWidgets() {
    if (!activePlan) return;

    const todayStr = formatDateForInput(new Date());
    const tasks = activePlan.tasks;

    // 1. Overdue Tasks
    const overdueList = tasks.filter(t => isTaskOverdue(t));
    overdueBadge.textContent = overdueList.length;
    if (overdueList.length === 0) {
      overdueContainer.innerHTML = `<div style="color: var(--color-muted-text); font-style: italic;">No overdue tasks. You are on track!</div>`;
    } else {
      overdueContainer.innerHTML = overdueList.map(t => `
        <div style="background: rgba(209, 59, 59, 0.08); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-danger); cursor: pointer;" onclick="window.agrimindOpenTaskDetail('${t.id}')">
          <div style="font-weight: 700; color: #B71C1C;">${t.title}</div>
          <div style="font-size: 0.775rem; color: var(--color-muted-text);">Was due: ${t.date}</div>
        </div>
      `).join('');
    }

    // 2. Upcoming Tasks (Next 14 Days)
    const upcomingList = tasks.filter(t => isTaskUpcoming(t, 14));
    upcomingBadge.textContent = upcomingList.length;
    if (upcomingList.length === 0) {
      upcomingContainer.innerHTML = `<div style="color: var(--color-muted-text); font-style: italic;">No upcoming tasks in the next 14 days.</div>`;
    } else {
      upcomingContainer.innerHTML = upcomingList.map(t => {
        const catMeta = getCategoryMeta(t.category);
        return `
          <div style="background: var(--bg-primary); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid ${catMeta.color}; cursor: pointer;" onclick="window.agrimindOpenTaskDetail('${t.id}')">
            <div style="font-weight: 600; color: var(--color-text-dark);">${t.title}</div>
            <div style="font-size: 0.775rem; color: var(--color-muted-text);">${formatHumanDate(new Date(t.date + 'T00:00:00'))} • ${catMeta.name}</div>
          </div>
        `;
      }).join('');
    }

    // 3. Completed Tasks
    const completedList = tasks.filter(t => t.completed);
    completedBadge.textContent = completedList.length;
    if (completedList.length === 0) {
      completedContainer.innerHTML = `<div style="color: var(--color-muted-text); font-style: italic;">No completed tasks yet.</div>`;
    } else {
      completedContainer.innerHTML = completedList.map(t => `
        <div style="padding: 0.5rem 0.65rem; border-radius: var(--radius-sm); background: #F1F8E9; display: flex; justify-content: space-between; align-items: center;">
          <span style="text-decoration: line-through; color: var(--color-muted-text); font-size: 0.825rem;">${t.title}</span>
          <span style="font-size: 0.75rem; color: #2E7D32; font-weight: 600;">✓ Done</span>
        </div>
      `).join('');
    }
  }

  // =========================================================================
  // TASK CRUD & MODALS
  // =========================================================================

  function openTaskDetailModal(taskId) {
    if (!activePlan) return;
    const task = activePlan.tasks.find(t => t.id === taskId);
    if (!task) return;

    selectedTaskId = taskId;

    const catMeta = getCategoryMeta(task.category);
    const isOverdue = isTaskOverdue(task);

    document.getElementById('modalTaskTitle').textContent = task.title;
    document.getElementById('modalTaskDescription').textContent = task.description || 'No description provided.';

    const catBadge = document.getElementById('modalTaskCategoryBadge');
    catBadge.textContent = `${catMeta.icon} ${catMeta.name}`;
    catBadge.style.background = catMeta.bg;
    catBadge.style.color = catMeta.color;

    const dateBadge = document.getElementById('modalTaskDateBadge');
    dateBadge.textContent = formatHumanDate(new Date(task.date + 'T00:00:00'));

    const statusBadge = document.getElementById('modalTaskStatusBadge');
    if (task.completed) {
      statusBadge.textContent = 'Completed';
      statusBadge.className = 'badge';
      statusBadge.style.background = '#E8F5E9';
      statusBadge.style.color = '#2E7D32';
    } else if (isOverdue) {
      statusBadge.textContent = 'Overdue';
      statusBadge.className = 'badge';
      statusBadge.style.background = 'rgba(209, 59, 59, 0.15)';
      statusBadge.style.color = 'var(--color-danger)';
    } else {
      statusBadge.textContent = 'Pending';
      statusBadge.className = 'badge badge-dark';
      statusBadge.style.background = '';
      statusBadge.style.color = '';
    }

    const toggleBtn = document.getElementById('btnModalToggleComplete');
    toggleBtn.textContent = task.completed ? 'Undo Completion' : '✓ Mark Done';

    if (window.openModal) window.openModal('taskDetailModal');
  }
  // Expose to window for inline onclick in widgets
  window.agrimindOpenTaskDetail = openTaskDetailModal;

  function toggleTaskCompletion(taskId) {
    if (!activePlan) return;
    const task = activePlan.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;

    saveActivePlan();
    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();

    if (window.showToast) {
      window.showToast(task.completed ? `Task "${task.title}" marked completed!` : `Task "${task.title}" marked pending.`, 'success');
    }
  }

  function openAddTaskModalOnDate(dateStr) {
    const dateInput = document.getElementById('customTaskDate');
    if (dateInput) dateInput.value = dateStr;
    if (window.openModal) window.openModal('addTaskModal');
  }

  function handleAddCustomTask(e) {
    e.preventDefault();
    if (!activePlan) return;

    const title = document.getElementById('customTaskTitle').value.trim();
    const dateStr = document.getElementById('customTaskDate').value;
    const category = document.getElementById('customTaskCategory').value;
    const desc = document.getElementById('customTaskDesc').value.trim();

    if (!title || !dateStr) {
      alert('Please fill in required fields (title and date).');
      return;
    }

    const sowing = new Date(activePlan.sowingDate + 'T00:00:00');
    const taskDate = new Date(dateStr + 'T00:00:00');
    const dayOffset = Math.round((taskDate - sowing) / 86400000);

    const newTask = {
      id: `task-custom-${Date.now()}`,
      dayOffset: dayOffset,
      date: dateStr,
      title: title,
      category: category,
      description: desc,
      completed: false,
      completedAt: null,
      isCustom: true
    };

    activePlan.tasks.push(newTask);
    saveActivePlan();

    // Reset form and close modal
    document.getElementById('customTaskForm').reset();
    if (window.closeModal) window.closeModal('addTaskModal');

    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();

    if (window.showToast) {
      window.showToast(`Custom task "${title}" added to calendar.`, 'success');
    }
  }

  function openEditTaskModal(taskId) {
    if (!activePlan) return;
    const task = activePlan.tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDate').value = task.date;
    document.getElementById('editTaskCategory').value = task.category;
    document.getElementById('editTaskDesc').value = task.description || '';

    if (window.openModal) window.openModal('editTaskModal');
  }

  function handleSaveEditedTask(e) {
    e.preventDefault();
    if (!activePlan) return;

    const taskId = document.getElementById('editTaskId').value;
    const task = activePlan.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.title = document.getElementById('editTaskTitle').value.trim();
    task.date = document.getElementById('editTaskDate').value;
    task.category = document.getElementById('editTaskCategory').value;
    task.description = document.getElementById('editTaskDesc').value.trim();

    const sowing = new Date(activePlan.sowingDate + 'T00:00:00');
    const taskDate = new Date(task.date + 'T00:00:00');
    task.dayOffset = Math.round((taskDate - sowing) / 86400000);

    saveActivePlan();

    if (window.closeModal) window.closeModal('editTaskModal');
    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();

    if (window.showToast) {
      window.showToast(`Task "${task.title}" updated successfully.`, 'success');
    }
  }

  function deleteTask(taskId) {
    if (!activePlan) return;
    activePlan.tasks = activePlan.tasks.filter(t => t.id !== taskId);
    saveActivePlan();

    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();

    if (window.showToast) {
      window.showToast('Task removed from calendar.', 'info');
    }
  }

  function postponeSelectedTask(daysToAdd) {
    if (!activePlan || !selectedTaskId) return;
    const task = activePlan.tasks.find(t => t.id === selectedTaskId);
    if (!task) return;

    const cur = new Date(task.date + 'T00:00:00');
    cur.setDate(cur.getDate() + daysToAdd);
    task.date = formatDateForInput(cur);

    const sowing = new Date(activePlan.sowingDate + 'T00:00:00');
    task.dayOffset = Math.round((cur - sowing) / 86400000);

    saveActivePlan();

    if (window.closeModal) window.closeModal('taskDetailModal');
    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();

    if (window.showToast) {
      window.showToast(`Task postponed by ${daysToAdd} days to ${task.date}.`, 'info');
    }
  }

  function rescheduleSelectedTask(newDateStr) {
    if (!activePlan || !selectedTaskId) return;
    const task = activePlan.tasks.find(t => t.id === selectedTaskId);
    if (!task) return;

    task.date = newDateStr;
    const sowing = new Date(activePlan.sowingDate + 'T00:00:00');
    const cur = new Date(newDateStr + 'T00:00:00');
    task.dayOffset = Math.round((cur - sowing) / 86400000);

    saveActivePlan();

    if (window.closeModal) window.closeModal('taskDetailModal');
    updateSummaryCard();
    renderCalendar();
    updatePriorityWidgets();

    if (window.showToast) {
      window.showToast(`Task rescheduled to ${newDateStr}.`, 'info');
    }
  }

  // =========================================================================
  // HELPER UTILITIES
  // =========================================================================

  function getFilteredTasks() {
    if (!activePlan || !activePlan.tasks) return [];

    return activePlan.tasks.filter(task => {
      // Category filter
      if (activeFilters.category !== 'all' && task.category !== activeFilters.category) {
        return false;
      }

      // Status filter
      if (activeFilters.status === 'completed' && !task.completed) {
        return false;
      }
      if (activeFilters.status === 'pending' && task.completed) {
        return false;
      }
      if (activeFilters.status === 'overdue' && !isTaskOverdue(task)) {
        return false;
      }

      // Search filter
      if (activeFilters.search) {
        const titleMatch = task.title.toLowerCase().includes(activeFilters.search);
        const descMatch = (task.description || '').toLowerCase().includes(activeFilters.search);
        if (!titleMatch && !descMatch) return false;
      }

      return true;
    });
  }

  function isTaskOverdue(task) {
    if (task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.date + 'T00:00:00');
    return taskDate < today;
  }

  function isTaskUpcoming(task, daysWindow = 14) {
    if (task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(task.date + 'T00:00:00');
    const futureDate = new Date();
    futureDate.setHours(0, 0, 0, 0);
    futureDate.setDate(today.getDate() + daysWindow);

    return taskDate >= today && taskDate <= futureDate;
  }

  function getCategoryMeta(catSlug) {
    const categories = window.farmingTaskCategories || {};
    return categories[catSlug] || {
      name: 'Agronomy Task',
      icon: '🌱',
      color: '#80B85A',
      bg: 'rgba(128, 184, 90, 0.15)'
    };
  }

  function formatDateForInput(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatHumanDate(date, compact = false) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = date.getDate();
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    return compact ? `${d} ${m}` : `${d} ${m} ${y}`;
  }

  function showError(elementId, show) {
    const el = document.getElementById(elementId);
    if (el) el.style.display = show ? 'block' : 'none';
  }

})();
