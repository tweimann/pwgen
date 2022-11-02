// imports
const log = require('./log.js');
const pw = require('./password.js');
const pp = require('./passphrase.js');
const { config } = require('dotenv');
config();
const express = require('express');
const app = express();
const querystring = require('querystring');

// get dotenv vars
const conf = {
    "debug": process.env.DEBUG,
    "tele": process.env.TELEMETRY,
    "imprint": process.env.IMPRINTADDR,
    "port": process.env.PORT
}

// serve static pages
app.use(express.static('src/public'))

// redirect to imprint
app.get('/imprint', function(req, res){
    res.redirect(conf.imprint);
});

// api code to get passwords/phrases
app.get('/api', function (req, res) {
    // parse request
    let query = JSON.parse('{"' + req._parsedOriginalUrl.query.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    let output = {
        "success": true,
        "content": ""
    }
    
    if (query.type == 'password') {
        output.content = pw.generate(query.param, query.length)
        res.send(output).on('err', (e) => log.console('fail', e))
    } else if (query.type == 'passphrase') {
        output.content = pp.generate(query.param, query.length, query.delimiter)
        res.send(output).on('err', (e) => log.console('fail', e))
    } else {
        output.success = false
        output.content = "lmao bad request try again"
        res.status(400).send(output)
    }
    if (conf.tele) {log.console('info', 'someone just generated a ' + query.type)}

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
