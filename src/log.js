// packages
const colors = require('colors')

// set prefixes
const prefixes = {
    "debug": "[ " + colors.white('DEBUG') + "] ",
    "test": "[ " + colors.grey('TEST') + " ] ",
    "info": "[ " + colors.green('INFO') + " ] ",
    "warn": "[ " + colors.yellow('WARN') + " ] ",
    "fail": "[ " + colors.red('FAIL') + " ] "
}

module.exports = {
    console: function (type, msg) {
        if (type == "debug") {var prefix = prefixes.debug}
        else if (type == "test") {var prefix = prefixes.test}
        else if (type == "warn") {var prefix = prefixes.warn}
        else if (type == "fail") {var prefix = prefixes.fail}
        else {var prefix = prefixes.info}

        msg.split('\n').forEach( (e) => {
            console.log(prefix + e)
        })
    }
}