const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match tags like <h1..>, <p..>, <label..>, <button..>, <span..>, <a..>
  const tagRegex = /<(h[1-6]|p|label|button|span|a|li|th|td|option)([^>]*)>([^<]{3,})<\/\1>/gi;
  let match;
  const untranslated = [];
  while ((match = tagRegex.exec(content)) !== null) {
    const [full, tag, attrs, text] = match;
    const trimmed = text.trim();
    // Skip if has data-i18n or is whitespace or number or code
    if (attrs.includes('data-i18n') || attrs.includes('data-i18n-') || trimmed.length < 3 || /^\d+$/.test(trimmed) || trimmed.startsWith('&') || trimmed.startsWith('©')) {
      continue;
    }
    // Skip language selector
    if (trimmed.includes('Telugu') || trimmed.includes('Tamil') || trimmed.includes('Hindi') || attrs.includes('data-lang') || attrs.includes('current-lang-label')) {
      continue;
    }
    // Skip brand or icons
    if (trimmed === 'AI' || trimmed === 'AgriMind' || trimmed === 'AgriMind AI' || trimmed.startsWith('📞')) {
      continue;
    }
    untranslated.push({ tag, text: trimmed });
  }
  console.log(`\n=================== ${file} (${untranslated.length} elements) ===================`);
  untranslated.slice(0, 15).forEach(item => {
    console.log(`  <${item.tag}> ${item.text.substring(0, 70)}`);
  });
});
