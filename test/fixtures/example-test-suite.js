const assert = require('assert')
const context = require('./example-context')

const magellanicTestSuite = {
    context,
    'should initially have slept for 100': (ctx) => {
        assert.equal(ctx.sleepTime, 100)
        assert.equal(ctx.sleepTime, ctx.INITIAL_SLEEP_TIME)
    },
    'should run the test in the cloud': (ctx) => {
        const time = 100
        return ctx.sleep(time)
            .then(() => {
                assert.equal(ctx.sleepTime, ctx.INITIAL_SLEEP_TIME + time)
            })
    },
}

module.exports = magellanicTestSuite
