function refreshPWLength(id, value) {
    if (id == "param-pw-length") {
        document.getElementById("param-pw-range").value = document.getElementById(id).value
    }
    if (id == "param-pw-range") {
        document.getElementById("param-pw-length").value = document.getElementById(id).value
    }
}

function submitPassword() {
    let lowercase = document.getElementById("param-pw-lowercase").checked
    let uppercase = document.getElementById("param-pw-uppercase").checked
    let numbers = document.getElementById("param-pw-numbers").checked
    let symbols = document.getElementById("param-pw-symbols").checked
    let ambiguous = document.getElementById("param-pw-ambiguous").checked
    let length = document.getElementById("param-pw-length").value

    let params = ""

    if (lowercase == true) { params += "a" }
    if (uppercase == true) { params += "A" }
    if (numbers == true) { params += "n" }
    if (symbols == true) { params += "s" }
    if (ambiguous == true) { params += "O" }

    fetch('https://' + location.hostname + '/api?type=password&param=' + params + '&len=' + length)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("pw-output").value = data.content
        })
    
}

function submitPassphrase() {
    let wl_de = document.getElementById("params-pp-wl_de").checked
    let wl_en = document.getElementById("params-pp-wl_en").checked
    let wl_names = document.getElementById("params-pp-wl_names").checked
    let number = document.getElementById("params-pp-num").checked
    let capitalize = document.getElementById("params-pp-capitalize").checked
    let delimiter = document.getElementById("params-pp-delimiter").value
    let length = document.getElementById("params-pp-length").value

    let params = ""

    if (wl_de == true) { params += "D" }
    if (wl_en == true) { params += "E" }
    if (wl_names == true) { params += "N" }
    if (capitalize == true) { params += "C" }
    if (number == true) { params += "0" }

    fetch('https://' + location.hostname + '/api?type=passphrase&param=' + params + '&len=' + length + '&delimiter=' + delimiter)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            document.getElementById("pp-output").value = data.content
        })
    
}
