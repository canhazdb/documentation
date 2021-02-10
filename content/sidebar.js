const hyperx = require('hyperx');

module.exports = function (h) {
  const html = hyperx(h);

  return html`
    <sidebar>
      <ul>
        <li>
          <span>Developers</span>
          <ul>
            <li><a href="/guides/introduction">Introduction</a></li>
            <li><a href="/guides/installing">Installing</a></li>
          </ul>
        </li>
        <li>
          <span>Architecture</span>
          <ul>
            <li><a href="/api/architecture/drivers">Drivers</a></li>
          </ul>
        </li>
      </ul>
    </sidebar>
  `;
};
