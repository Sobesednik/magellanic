const assert = require('assert')
const path = require('path')
const Magellanic = require('../../src/Magellanic')

const user = 'test-user'
const token = 'test-token'
const CLOUD_URL = 'https://mglnc.cloud'

const FIXTURES_PATH = path.join(__dirname, '../fixtures/')
const TEST_PATH = path.join(FIXTURES_PATH, 'example-test-suite.js')

const MagellanicTestSuite = {
    'should export a class': () => {
        assert(/^class Magellanic/.test(Magellanic.toString()))
    },
    'should throw an error when user is not set': () => {
        assert.throws(() => {
            new Magellanic({})
        }, /Error: Please specify a user$/)
    },
    'should throw an error when token is not set': () => {
        assert.throws(() => {
            new Magellanic({ user })
        }, /^Error: Please give a token$/)
    },
    'should set default CLOUD_URL': () => {
        const magellanic = new Magellanic({ user, token })
        assert.deepEqual(magellanic, { user, token, CLOUD_URL })
    },
    'should set provided CLOUD_URL': () => {
        const TEST_CLOUD_URL = 'https://test.mglnc.cloud'
        const magellanic = new Magellanic({ user, token, CLOUD_URL: TEST_CLOUD_URL })
        assert.deepEqual(magellanic, { user, token, CLOUD_URL: TEST_CLOUD_URL })
    },
    stream: {
        'should stream given file': () => {
            const magellanic = new Magellanic({ user, token })
            return magellanic.stream(TEST_PATH, true)
        },
    },
}

module.exports = MagellanicTestSuite
