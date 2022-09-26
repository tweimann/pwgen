// imports
const log = require('./log.js')
const pw = require('./password.js')
const pp = require('./passphrase.js')
const { config } = require('dotenv')
config()

// get dotenv vars
const settings = {
    debug: process.env.DEBUG,
    tele: process.env.TELEMETRY,
    imprint: process.env.IMPRINTADDR
}

// hello world
log.console('info', 'Hello World!')

// debug
if (settings.debug) {
    setTimeout(function() {
        console.log(pw.generate("AasnO", 10))
        console.log(pp.generate("DEN", 4, "-"))
        console.log(pp.generate("DENC", 4, "-"))
    }, 2000)
}