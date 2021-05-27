const fs = require('fs');
const path = require('path');
const vhtml = require('vhtml');
const copyDir = require('./utils/copyDir');

const h = function (tagName, ...children) {
  let options = {};

  if (typeof children[0] === 'object') {
    options = children[0];
    children = children.slice(1);
  }

  return vhtml(tagName, options, ...children);
};

const mainWebsiteUrl = process.env.MAIN_WEBSITE_URL || 'http://127.0.0.1:9001';

const indexHtml = fs.readFileSync('template/index.html', 'utf8');

function createPage (pathname, title, tree) {
  const isDocs = pathname === '/docs' || pathname.startsWith('./docs') || pathname.startsWith('./guides');
  const nav = `
    <nav class="bugerable">
      <a href="/" ${pathname === '/' && 'class="active"'}>Home</a>
      <a href="/docs" ${isDocs && 'class="active"'}>Docs</a>
      <a href="/blog" ${pathname.startsWith('/blog') && 'class="active"'}>Blog</a>
      <a href="https://github.com/canhazdb/server/discussions">Community</a>
    </nav>
  `;

  const page = indexHtml
    .replace('{{title}}', title + ' - canhazdb')
    .replace('{{content}}', tree)
    .replace('{{nav}}', nav)
    .replace('{{mainWebsiteUrl}}', mainWebsiteUrl);

  const filepath = path.join('dist', pathname.substr(1));

  try {
    fs.mkdirSync(filepath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  console.log('creating file:', filepath + '/index.html');

  fs.writeFile(filepath + '/index.html', page, function (error) {
    if (error) {
      throw error;
    }
  });
}

fs.rmdirSync('dist', { recursive: true });
fs.mkdirSync('dist');
copyDir('static', 'dist');

require('./template/index')(h, createPage);
