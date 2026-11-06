const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const t = require('./js/translations.js').translations;

console.log('=== HTML FILES AUDIT ===');
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasI18nScript = content.includes('js/translations.js');
  const hasMultilingualScript = content.includes('js/multilingual-data.js');
  const matches = content.match(/data-i18n="([^"]+)"/g) || [];
  const keys = matches.map(m => m.replace(/data-i18n="([^"]+)"/, '$1'));
  const missingKeys = keys.filter(k => !t.en[k]);
  
  console.log(
    f.padEnd(25),
    'i18n:', hasI18nScript ? 'YES' : 'NO ',
    'multi-data:', hasMultilingualScript ? 'YES' : 'NO ',
    'keys count:', String(keys.length).padStart(3),
    'missing in dict:', missingKeys.length
  );
  if (missingKeys.length > 0) {
    console.log('   Missing keys:', missingKeys.slice(0, 5));
  }
});

