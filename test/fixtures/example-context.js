function Context() {
    const incrementTime = (t) => { this._sleepTime += t }
    this.INITIAL_SLEEP_TIME = 100
    Object.defineProperties(this, {
        sleep: { value: (time) => {
            return Promise.resolve().then(() => {
                if ((typeof time).toLowerCase() !== 'number') {
                    throw new Error('time is not a number')
                }
                if (time < 10) {
                    throw new Error('time cannot be less than 10')
                } else if (time > 200) {
                    throw new Error('time cannot be bigger than 200')
                }
                return time
            })
            .then((time) => {
                return new Promise(r => setTimeout(r, time)) 
                    .then(() => {
                        incrementTime(time)
                    })
            })
        }},
        sleepTime: { get: () => this._sleepTime },
    })
    this._sleepTime = 0
    return this.sleep(this.INITIAL_SLEEP_TIME)
}
module.exports = Context
