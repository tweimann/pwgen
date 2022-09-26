// imports
const log = require('./log.js')
const pw = require('./password.js')
const pp = require('./passphrase.js')

// hello world
log.console('info', 'Hello World!')

// debug
console.log(pw.generate("AasnO", 10))

setTimeout(function() {
    console.log(pp.generate("DEN", 4, "-"))
    console.log(pp.generate("DENC", 4, "-"))
}, 2000)