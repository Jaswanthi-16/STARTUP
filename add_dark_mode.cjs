const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { match: /(?<!dark:)bg-white/g, replace: 'bg-white dark:bg-slate-800' },
  { match: /(?<!dark:)bg-slate-50/g, replace: 'bg-slate-50 dark:bg-slate-900' },
  { match: /(?<!dark:)bg-gray-50/g, replace: 'bg-gray-50 dark:bg-slate-900' },
  
  { match: /(?<!dark:)text-slate-900/g, replace: 'text-slate-900 dark:text-white' },
  { match: /(?<!dark:)text-gray-900/g, replace: 'text-gray-900 dark:text-white' },
  
  { match: /(?<!dark:)text-slate-800/g, replace: 'text-slate-800 dark:text-slate-100' },
  { match: /(?<!dark:)text-gray-800/g, replace: 'text-gray-800 dark:text-gray-100' },

  { match: /(?<!dark:)text-slate-700/g, replace: 'text-slate-700 dark:text-slate-200' },
  { match: /(?<!dark:)text-gray-700/g, replace: 'text-gray-700 dark:text-gray-200' },

  { match: /(?<!dark:)text-slate-600/g, replace: 'text-slate-600 dark:text-slate-300' },
  { match: /(?<!dark:)text-gray-600/g, replace: 'text-gray-600 dark:text-gray-300' },

  { match: /(?<!dark:)text-slate-500/g, replace: 'text-slate-500 dark:text-slate-400' },
  { match: /(?<!dark:)text-gray-500/g, replace: 'text-gray-500 dark:text-gray-400' },

  { match: /(?<!dark:)border-slate-100/g, replace: 'border-slate-100 dark:border-slate-800' },
  { match: /(?<!dark:)border-gray-100/g, replace: 'border-gray-100 dark:border-gray-800' },

  { match: /(?<!dark:)border-slate-200/g, replace: 'border-slate-200 dark:border-slate-700' },
  { match: /(?<!dark:)border-gray-200/g, replace: 'border-gray-200 dark:border-gray-700' },

  { match: /(?<!dark:)border-slate-300/g, replace: 'border-slate-300 dark:border-slate-600' },
  { match: /(?<!dark:)border-gray-300/g, replace: 'border-gray-300 dark:border-gray-600' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      if (file === 'DarkModeToggle.jsx' || file === 'Sidebar.jsx' || file === 'ThemeContext.jsx') {
        return;
      }

      replacements.forEach(({ match, replace }) => {
        content = content.replace(match, replace);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

processDirectory(srcDir);
console.log('Done.');
