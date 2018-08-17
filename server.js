var express = require('express');
var bodyParser = require('body-parser');

var app = express();


var routes = require('./routes/index');


var port = process.env.PORT || 8080;

app.use(bodyParser.json());
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', routes);






app.listen(port, then=>{
    console.log('Listening on port 8080');
})

