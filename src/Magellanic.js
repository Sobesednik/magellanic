'use strict'
const zoroaster = require('zoroaster')

const defaultOptions = {
    user: null,
    token: null,
    CLOUD_URL: 'https://mglnc.cloud',
}

class Magellanic {
    constructor(_options) {
        const options = Object.assign({}, defaultOptions, _options)
        this.user = options.user
        this.token = options.token
        this.CLOUD_URL = options.CLOUD_URL
        if (this.user === null) {
            throw new Error('Please specify a user')
        }
        if (this.token === null) {
            throw new Error('Please give a token')
        }
    }
    stream(testPath) {
        const proc = zoroaster([testPath])
        return {
            stdout: proc.stdout,
            stderr: proc.stderr,
            promise: proc.promise,
        }
    }
}

module.exports = Magellanic
