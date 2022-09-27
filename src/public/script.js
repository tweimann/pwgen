const { response } = require("express")

function refreshPWLength(id, value) {
    if (id == "param-pw-length") {
        document.getElementById("param-pw-range").value = document.getElementById(id).value
    }
    if (id == "param-pw-range") {
        document.getElementById("param-pw-length").value = document.getElementById(id).value
    }
}

function submitPassword() {
    let lowercase = document.getElementById("param-pw-lowercase").value
    let uppercase = document.getElementById("param-pw-uppercase").value
    let numbers = document.getElementById("param-pw-numbers").value
    let symbols = document.getElementById("param-pw-symbols").value
    let ambiguous = document.getElementById("param-pw-ambiguous").value
    let length = document.getElementById("param-pw-length").value

    let params = ""

    if (lowercase == "on") { params += "a" }
    if (uppercase == "on") { params += "A" }
    if (numbers == "on") { params += "n" }
    if (symbols == "on") { params += "s" }
    if (ambiguous == "on") { params += "O" }

    fetch('http://' + location.hostname + '/api?type=password&param=' + params + '&length=' + length)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("pw-output").value = JSON.parse(data).content
        })
    
}