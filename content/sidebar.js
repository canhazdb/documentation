const hyperx = require('hyperx');

module.exports = function (h) {
  const html = hyperx(h);

  return html`
    <sidebar>
      <ul>
        <li>
          <span>Guides</span>
          <ul>
            <li><a href="/guides/introduction">Introduction</a></li>
            <li><a href="/guides/making-requests">Making Requests</a></li>
          </ul>
        </li>
        <li>
          <span>Installing</span>
          <ul>
            <li><a href="/docs/installing/quick">Quickstart</a></li>
            <li><a href="/docs/installing/cluster">Cluster</a></li>
          </ul>
        </li>
        <li>
          <span>Contributing</span>
          <ul>
            <li><a href="/docs/contributing/developing">Developing</a></li>
          </ul>
        </li>
        <li>
          <span>Architecture</span>
          <ul>
            <li><a href="/docs/architecture/drivers">Drivers</a></li>
          </ul>
        </li>
      </ul>
    </sidebar>
  `;
};
