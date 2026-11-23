"""The injected scripts must not disturb the page they measure.

Evaluates each payload in a Node vm context that already defines globals with the same names
the scripts use internally, then checks that none was replaced and that the only global added
is the probe's one namespaced state object. Needs Node; no browser.
"""
import json
import shutil
import subprocess
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent

HARNESS = r"""
const vm = require('vm'), fs = require('fs');
const file = process.argv[1];
const app = { classify: () => 'app', scoreShifts: () => 'app', motionCssName: 'app', MOTION_STATIONARY: 'app',
              MOTION_MOVEMENT: 'app', MOTION_PSEUDO_GEOMETRY: 'app', name: 'app', measure: 'app', change: 'app',
              roots: 'app', listed: 'app', describe: 'app', scan: 'app' };
const sandbox = Object.assign({}, app, {
  document: { querySelectorAll: () => [], querySelector: () => null, getAnimations: () => [], createRange: () => ({}) },
  location: { origin: 'http://x', pathname: '/p' },
  performance: { now: () => 1 },
  PerformanceObserver: function () { this.observe = () => {}; this.takeRecords = () => []; this.disconnect = () => {}; },
  setTimeout: () => 1,
  matchMedia: () => ({ matches: false }),
  requestAnimationFrame: () => 1, cancelAnimationFrame: () => {},
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
});
sandbox.window = sandbox;
const before = Object.getOwnPropertyNames(sandbox);
const context = vm.createContext(sandbox);
const source = fs.readFileSync(file, 'utf8');
const results = [vm.runInContext(source, context), vm.runInContext(source, context)];
const added = Object.getOwnPropertyNames(sandbox).filter(k => !before.includes(k));
const replaced = Object.keys(app).filter(k => sandbox[k] !== app[k]);
process.stdout.write(JSON.stringify({ added, replaced, returned: results.map(r => r === undefined ? null : typeof r) }));
"""


def run(script):
    out = subprocess.run(["node", "-e", HARNESS, str(HERE / script)], check=True, capture_output=True, text=True)
    return json.loads(out.stdout)


@unittest.skipUnless(shutil.which("node"), "node is not installed")
class IsolationTest(unittest.TestCase):
    def test_cls_scorer_defines_no_globals(self):
        result = run("cls.js")
        self.assertEqual(result["replaced"], [])
        self.assertEqual(result["added"], [])
        self.assertEqual(result["returned"], ["object", "object"])

    def test_motion_probe_leaves_only_its_namespaced_state(self):
        result = run("motion-probe.js")
        self.assertEqual(result["replaced"], [])
        # Armed on the first evaluation, read and disarmed on the second: nothing is left.
        self.assertEqual(result["added"], [])
        self.assertEqual(result["returned"], ["object", "object"])


    def test_collector_adds_exactly_one_namespaced_object(self):
        result = run("cls-collector.js")
        self.assertEqual(result["replaced"], [])
        self.assertEqual(result["added"], ["__browserVerificationLayoutShifts"])


if __name__ == "__main__":
    unittest.main()
