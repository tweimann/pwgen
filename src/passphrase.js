// imports
const log = require('./log.js')
const fs =  require("fs")
const { parse } = require("csv-parse")

// read/import files
let wl = {
    de: [],
    en: [],
    names: []
}

{
fs.createReadStream("./static/wl_de.txt")
    .pipe(parse({ delimiter: "\n"}))
    .on("data", function (row) {
        wl.de.push(row)
    })
    .on("error", function (error) {
        log.console('fail', error.message)
    })
    .on("end", function () {
        log.console('info', "finished reading ./static/wl_de.txt")
    })

fs.createReadStream("./static/wl_en.txt")
    .pipe(parse({ delimiter: "\n"}))
    .on("data", function (row) {
        wl.en.push(row)
    })
    .on("error", function (error) {
        log.console('fail', error.message)
    })
    .on("end", function () {
        log.console('info', "finished reading ./static/wl_en.txt")
    })

fs.createReadStream("./static/wl_names.txt")
    .pipe(parse({ delimiter: "\n"}))
    .on("data", function (row) {
        wl.names.push(row)
    })
    .on("error", function (error) {
        log.console('fail', error.message)
    })
    .on("end", function () {
        log.console('info', "finished reading ./static/wl_names.txt")
    })
}

// debug
//console.log(wl.de[0] + wl.en[0] + wl.names[0])

module.exports = {
    generate: function (param, length, delimiter) {
        // define vars
        let usableWords = []
        let passphrase = []
        let num = ""
        let output = ""

        // define usable words
        if (param.match("D")) {
            usableWords.push(wl.de)
        }
        if (param.match("E")) {
            usableWords.push(wl.en)
        }
        if (param.match("N")) {
            usableWords.push(wl.names)
        }

        for (let i = 0; i < length; i++) {
            if (!/\d/g.test(passphrase) && Math.random() >= ((length - i) / 10)) {
                num = Math.floor(Math.random * 9)
            }
            if (i == length) {
                delimiter = ""
            }
            passphrase += length[Math.floor(Math.random() * usableWords.length)]
                        + num
                        + delimiter
        }

        return output
    }
}