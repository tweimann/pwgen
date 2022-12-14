// import other files
const log = require('./log.js');
const pw = require('./password.js');
const pp = require('./passphrase.js');

// import packages
const { config } = require('dotenv');
config();
const express = require('express');
const app = express();
const querystring = require('querystring');

// get dotenv vars
const conf = {
    "debug": process.env.DEBUG == 'true' ? true : false,
    "tele": process.env.TELEMETRY,
    "imprint": process.env.IMPRINTADDR,
    "port": process.env.PORT
}

// declare function for when a api request is bad
function badReq(output, res) {
    output.success = false
    output.content = "lmao bad request try again"
    res.status(400).send(output)
    return true
}

// serve static pages
app.use(express.static('src/public'))

// redirect to imprint
app.get('/imprint', function(req, res){
    res.redirect(conf.imprint);
});

// api code to get passwords/phrases
app.get('/api', function (req, res) {
    // define output format
    let output = {
        "success": true,
        "content": ""
    }
    
    // parse request
    let query = JSON.parse('{"' + req._parsedOriginalUrl.query.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    if (!query.delimiter) {query.delimiter = "-"}
    
    // validate the request
    let valid = {
        "type": "",
        "param": "",
        "len": 0,
        "delimiter": ""
    }
    if (conf.debug == true) { log.console('debug', query) }
    if (
        String(query.type).length <= 10 && // check if "type" is string and max 10 chars (e.g. password)
        String(query.param).length <= 8 && // check if "param" is string and max 8 chars (e.g. aAns)
        !isNaN(query.len) && query.len <= 128 && // check if "len" is int and max value is 128 (e.g. 32)
        String(query.delimiter).length <= 3 // check if "delimiter" is string and max 3 chars (e.g. ---)
       ) {
        valid = {
            "type": query.type,
            "param": query.param,
            "len": query.len,
            "delimiter": query.delimiter
        }
    } else {
        badReq(output, res)
        return false
    }
    
    // generate the password and respond to the request
    if (valid.type == 'password') {
        output.content = pw.generate(valid.param, valid.len)
        res.send(output).on('err', (e) => log.console('fail', e))
    } else if (valid.type == 'passphrase') {
        output.content = pp.generate(valid.param, valid.len, valid.delimiter)
        res.send(output).on('err', (e) => log.console('fail', e))
    } else {
        badReq(output, res)
    }
    if (conf.tele) { log.console('info', 'someone just generated a ' + valid.type) }
})

// listen on port defined in dotenv
app.listen(conf.port, () => {
    log.console('info', 'App listening at Port ' + conf.port)
})

// debug
if (conf.debug == true) {
    setTimeout(function() {
        log.console('debug', pw.generate("AasnO", 10))
        log.console('debug', pp.generate("DEN", 4, "-"))
        log.console('debug', pp.generate("DENC", 4, "-"))
    }, 1000)
}
