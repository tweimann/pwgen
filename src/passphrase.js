// imports
const log = require('./log.js')

const wl_de = require('./wordlists/de.json')
const wl_en = require('./wordlists/en.json')
const wl_names = require('./wordlists/names.json')
log.console('info', 'Wordlists loaded')

// word processing functions
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

module.exports = {
    generate: function (param, length, delimiter) {
        // define vars
        let usableWords = []
        let passphrase = ""
        let num = ""
        let output = ""
        let word = ""

        if (param == "") {param = "CE0"}
        if (length > 8) {length = 8}

        // define usable words
        if (param.match("D")) {
            wl_de.content.map(item => {
                usableWords.push(item)
            })
        }
        if (param.match("E")) {
            wl_en.content.map(item => {
                usableWords.push(item)
            })
        }
        if (param.match("N")) {
            wl_names.content.map(item => {
                usableWords.push(item)
            })
        }

        if (!delimiter) {
            delimiter = "-"
        }

        // build the passphrase
        for (let i = 0; i < length; i++) {
            // decide if there should be a number behind the word
            num = ""
            if (param.match("0") && !(/\d/g.test(passphrase)) && (Math.random() >= ((length - i + 1) / 10))) {
                num = Math.floor(Math.random() * 9)
            }
            // don't add a delimiter after the last word
            if (i == length - 1) {
                delimiter = ""
            }
        
            if (param.match("C")) {
                word = capitalizeFirstLetter(String(usableWords[Math.floor(Math.random() * usableWords.length)]))
            } else {
                word = String(usableWords[Math.floor(Math.random() * usableWords.length)]).toLowerCase()
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