/**
 * Full automated verification test suite for AgriMind AI translations.
 */

const fs = require('fs');
const { translations } = require('./js/translations.js');

const languages = ['en', 'te', 'ta', 'hi'];
const allKeys = Object.keys(translations.en);

console.log(`\n==================================================`);
console.log(`AGRIMIND AI TRANSLATION SYSTEM VERIFICATION SUITE`);
console.log(`==================================================`);
console.log(`Total unique translation keys in dictionary: ${allKeys.length}`);

let totalErrors = 0;

languages.forEach(lang => {
  const dict = translations[lang];
  if (!dict) {
    console.error(`ERROR: Missing dictionary for language: ${lang}`);
    totalErrors++;
    return;
  }

  const missing = [];
  const empty = [];
  const untranslatedMatches = [];

  allKeys.forEach(k => {
    if (dict[k] === undefined) {
      missing.push(k);
    } else if (dict[k].trim() === '') {
      empty.push(k);
    } else if (lang !== 'en') {
      // Check if it was lazily left identical to English for non-brand keys
      const enVal = translations.en[k].trim();
      const val = dict[k].trim();
      const isBrandOrShort = enVal === 'AgriMind AI' || enVal === 'AI' || enVal.startsWith('📞') || /^\d+$/.test(enVal) || enVal.length < 4;
      if (!isBrandOrShort && enVal === val) {
        untranslatedMatches.push(k);
      }
    }
  });

  console.log(`\n--- Language '${lang.toUpperCase()}' ---`);
  console.log(`  Keys present: ${Object.keys(dict).length}/${allKeys.length}`);
  console.log(`  Missing keys: ${missing.length}`);
  console.log(`  Empty keys: ${empty.length}`);
  if (lang !== 'en') {
    console.log(`  Identical to English (brand/short exceptions ignored): ${untranslatedMatches.length}`);
    if (untranslatedMatches.length > 0) {
      console.log(`    Sample:`, untranslatedMatches.slice(0, 5));
    }
  }

  if (missing.length > 0 || empty.length > 0) {
    totalErrors++;
  }
});

console.log(`\n==================================================`);
if (totalErrors === 0) {
  console.log(`ALL 4 LANGUAGES PASSED 100% COMPLETENESS AUDIT! (0 missing keys)`);
} else {
  console.log(`FAILED with ${totalErrors} language errors.`);
  process.exit(1);
}
console.log(`==================================================\n`);

