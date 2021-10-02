const hyperx = require('hyperx');
const sidebar = require('./sidebar');

function homePage (h, createPage) {
  const html = hyperx(h);

  createPage('/', 'Home',
    html`
      <div class="with-sidebar">
        <div class="content thin">
          ${sidebar(h)}
          
          <section>
          <div>
            <h2 id="general-information">What is canhazdb?</h2>
            <p>
              The goal of canhazdb is to create a production ready database that's easy
              to install, manage and use.
            </p>

            <h2>Quick start?</h2>
            <p>
              The fastest way to get started is to use the official docker image.
            </p>
            <p>
              You can run the command below on any machine that has docker installed:
            </p>
            <pre><code class="language-bash">docker run --name canhazdb -dp 8060:8060 canhazdb/server</code></pre>
            <p>
              Once running, you can open a REPL inside the container
            </p>
            <pre><code class="language-bash">docker exec -it canhazdb node repl.js</code></pre>
            <p>
              Try creating a new document:
            </p>
            <pre><code class="language-javascript">await db.post('tests', { foo: 'bar' })</code></pre>
            <p>
              Then retrieve it:
            </p>
            <pre><code class="language-javascript">await db.getAll('tests')</code></pre>
            <h2>Learn more?</h2>
            <p>
              You can start your learning journey on the 
              <a href="/guides/introduction">introduction</a> page.
            </p>
            

            <h2 id="help-canhazdb">Help Us</h2>
            <p>If you come across any bugs, please help us by filing a Pull Request in github
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

  createPage('/docs', 'Docs',
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
