// imports
const log = require('./log.js')
const fs =  require("fs")
const { parse } = require("csv-parse")

// word processing functions
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

// read/import files
let wl = {
    de: [],
    en: [],
    names: []
}

fs.createReadStream("./static/wl_de.txt")
    .pipe(parse({ delimiter: "\n"}))
    .on("data", function (row) {
        wl.de.push(String(row).toLowerCase())
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
        wl.en.push(String(row).toLowerCase())
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
        wl.names.push(String(row).toLowerCase())
    })
    .on("error", function (error) {
        log.console('fail', error.message)
    })
    .on("end", function () {
        log.console('info', "finished reading ./static/wl_names.txt")
    })

module.exports = {
    generate: function (param, length, delimiter) {
        // define vars
        let usableWords = []
        let passphrase = ""
        let num = ""
        let output = ""
        let word = ""

        // define usable words
        if (param.match("D")) {
            wl.de.map(item => {
                usableWords.push(item)
            })
        }
        if (param.match("E")) {
            wl.en.map(item => {
                usableWords.push(item)
            })
        }
        if (param.match("N")) {
            wl.names.map(item => {
                usableWords.push(item)
            })
        }

        // build the passphrase
        for (let i = 0; i < length; i++) {
            // decide if there should be a number behind the word
            num = ""
            if (!(/\d/g.test(passphrase)) && (Math.random() >= ((length - i + 1) / 10))) {
                num = Math.floor(Math.random() * 9)
            }
            // don't add a delimiter after the last word
            if (i == length - 1) {
                delimiter = ""
            }
        
            if (param.match("C")) {
                word = capitalizeFirstLetter(String(usableWords[Math.floor(Math.random() * usableWords.length)]))
            } else {
                word = String(usableWords[Math.floor(Math.random() * usableWords.length)])
            }
            
            // combine the passphrase
            passphrase += word
                        + num
                        + delimiter
        }

        output = passphrase
        return output
    }
}