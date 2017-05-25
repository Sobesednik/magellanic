const assert = require('assert')
const path = require('path')
const spawnCommand = require('spawncommand')

const FIXTURES_PATH = path.join(__dirname, '../fixtures/')
const TEST_PATH = path.join(FIXTURES_PATH, 'example-test-suite.js')

const ENOENT_TEST_PATH = path.join(FIXTURES_PATH, 'not-found-test-suite.js')

const BIN_PATH = path.join(__dirname, '../../bin/magellanic')

const expectedFile = `
${TEST_PATH}
 [32m ✓ [0m should initially have slept for 100
 [32m ✓ [0m should run the test in the cloud

Executed 2 tests.
`.trim()

const expectedDir = `
${FIXTURES_PATH}
   example-context.js
   example-test-suite.js
   [32m ✓ [0m should initially have slept for 100
   [32m ✓ [0m should run the test in the cloud

Executed 2 tests.
`.trim()

const binTestSuite = {
    'should execute binary': () => {
        const proc = spawnCommand(BIN_PATH, [TEST_PATH])
        return proc.promise
            .then((res) => {
                assert.equal(res.stdout.trim(), expectedFile)
            })
    },
    'should display error message when path not found': () => {
        const proc = spawnCommand(BIN_PATH, [ENOENT_TEST_PATH])
        return proc.promise
            .then((res) => {
                assert.equal(`Path ${ENOENT_TEST_PATH} does not exist`, res.stderr.trim())
            })
    },
    'should display correct result for a directory': () => {
        const proc = spawnCommand(BIN_PATH, [FIXTURES_PATH])
        return proc.promise
            .then((res) => {
                assert.equal(res.stdout.trim(), expectedDir)
            })
    },
}

module.exports = binTestSuite
