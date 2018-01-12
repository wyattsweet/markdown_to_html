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
    //////// THIS WILL BE A MODULE ///////////

    // [\s\S] matches all whitespace + non whitespace characters
    // * means 0 or more occurances of the preceding item
    const regContentSection = /---[\s\S]*---/;
    const regMatch = data.match(regContentSection);

    // g flag in regex replaces all occurances
    const jsonStr = regMatch[0].replace(/---\n|\n---/g, '');
    const metaData = JSON.parse(jsonStr);

    // TODO: remove meta data section from markdown before passing to remark
    let markdown = data.replace(regContentSection, '');

    // some crazy regex magic to remove the first new line break, thanks Stack Overflow
    // TODO: figure out what this regex is doing
    markdown = markdown.replace(/^\s+|\s+$/g, '');

    //////////////////////////////////////////////

    // remark section
    remark()
      .use(styleGuide)
      .use(html)
      .process(markdown, (err, file) => {
        console.error(report(err || file));
        console.log(String(file));
      });
  },
);
