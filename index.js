const fs = require('fs');
const path = require('path');
const remark = require('remark');
const styleGuide = require('remark-preset-lint-markdown-style-guide');
const html = require('remark-html');
const report = require('vfile-reporter');

fs.readFile(
  path.join(__dirname, 'markdown/test1.md'),
  {encoding: 'utf8'},
  (err, data) => {
    // [\s\S] matches all whitespace + non whitespace characters
    // * means 0 or more occurances of the preceding item
    const regMatch = data.match(/---[\s\S]*---/);
    // g flag in regex replaces all occurances
    let subStr = regMatch[0].replace(/---\n|\n---/g, '');
    subStr = subStr.replace(/\n/, ',');
    const arr = subStr.split(',');
    const obj = {
      title: arr[0].replace(/title: /, ''),
      date: arr[1].replace(/date: /, ''),
    };
    // TODO: remove meta data section from markdown before passing to remark

    //    remark()
    //      .use(styleGuide)
    //      .use(html)
    //      .process(data, (err, file) => {
    //        console.error(report(err || file));
    //        console.log(String(file));
    //      });
  },
);
