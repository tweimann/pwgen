// imports
const log = require('./log.js')
const pw = require('./password.js')

// hello world
log.console('info', 'Hello World!')

// debug
console.log(pw.generate("AasnO", 10))