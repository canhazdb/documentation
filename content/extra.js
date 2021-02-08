const hyperx = require('hyperx');
const sidebar = require('./sidebar');

function homePage (h, createPage) {
  const html = hyperx(h);

  createPage('/', 'canhazdb',
    html`
      <div class="with-sidebar">
        <div class="content thin">
          ${sidebar(h)}
          
          <section>
          <div><h2 id="general-information">General information</h2>
<p>A database in a can!</p>

<h2 id="help-canhazdb">Help Us</h2>
<p>If you come across any bugs please help us by filing a Pull Request in github
on our <a href="https://www.github.com/canhazdb/documentation">documentation repo</a>.</p>
</div>
          </section>
        </div>
      </div>
    `
  );
}

function docsPage (h, createPage) {
  const html = hyperx(h);

  createPage('/docs', 'canhazdb',
    html`
      <div class="with-sidebar">
        <div class="content thin">
          ${sidebar(h)}
          
          <section>
          <div><h2 id="general-information">Documentation</h2>
<p>A database in a can!</p>

          </section>
        </div>
      </div>
    `
  );
}

function extraPages (h, createPage) {
  homePage(h, createPage);
  docsPage(h, createPage);
}

module.exports = extraPages;
