// packages

// define vars
const alphabet = "abcdefghijklmnopqrstuvwxyz"
const ambiguous = "lI1O0"
let charList = []
let charListForm = ""
let passwd = ""
let output = ""

module.exports = {
    generate: function (param, length) {
        // generate charList to chose characters from
        if(param.match("a")) {
            charList.push(alphabet.toLowerCase())
        }
        if(param.match("A")) {
            charList.push(alphabet.toUpperCase())
        }
        if(param.match("n")) {
            charList.push("0123456789")
        }
        if(param.match("s")) {
            charList.push("!\"§$%&/?=+-_*#':;.,<>ÄÖÜ{}[]()")
        }

        // join charList
        charList = charList.join("")

        // remove ambiguous characters
        if (param.match("O")) {
            for (let i = 0; i < ambiguous.length; i++) {
                charList = charList.replace(ambiguous[i], "")
            }
        }

        //generate password
        for (let i = 0; i < length; i++) {
            output = output + charList[Math.floor(Math.random() * charList.length)]
        }

        return output
    }
}