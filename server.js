var webpack = require('webpack');
var webpackDevMiddlware = require('webpack-dev-middleware');
var webpackHotMiddlware = require('webpack-hot-middleware');
var config = require('./webpack.hot.config.js');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');

var express = require('express');
var app = new (require('express'));
var port = 3001;
var host = '0.0.0.0';

var compiler = webpack(config);

// default options
app.use(fileUpload());

// const corsOptions = {
//     origin: [
//         'http://www.example.com',
//         'http://localhost:3000',
//     ],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

//允許 Json Data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//靜態檔案
app.use(express.static(__dirname + '/public'));

//允許 request access
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(webpackDevMiddlware(compiler, {
    noInfo:true,
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddlware(compiler));

app.get("/", function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, host, function(error){
    if(error){
        console.error(error);
    } else {
        console.info("success",port,host,port);
    }
});