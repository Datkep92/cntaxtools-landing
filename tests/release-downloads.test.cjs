const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const version = /var VERSION = 'v([^']+)'/.exec(script)[1];

test('current HTML and JavaScript downloads agree, including no-script fallbacks', () => {
  const current = html.replace(/<article class="release-entry">[\s\S]*?<\/article>/g, '');
  const links = [...current.matchAll(/https:\/\/github\.com\/Datkep92\/HoaDonNhe\/releases\/download\/([^"\s<>]+)/g)];
  assert.ok(links.length >= 8);
  for (const [, target] of links) {
    assert.match(target, new RegExp(`^v${version.replaceAll('.', '\\.')}\/`));
    assert.ok(target.endsWith(`v${version}.exe`));
  }
  const data = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(([, raw]) => JSON.parse(raw)['@graph'] || []);
  const software = data.find(item => item['@type'] === 'SoftwareApplication');
  assert.ok(software, 'SoftwareApplication structured data exists');
  assert.equal(software.softwareVersion, version);
  assert.ok(software.downloadUrl.includes(`/v${version}/`));
  assert.ok(html.includes('<h3>v1.9.3 <small>11/11/2026</small>'), 'previous release history remains');
});
