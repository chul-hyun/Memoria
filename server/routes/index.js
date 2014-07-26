var express = require('express');
var router = express.Router();

var path = require('path')
var fs = require('fs')

var app = path.resolve(__dirname, '../../app')
    , temp = path.resolve(__dirname, '../../temp')
    , server = path.resolve(__dirname, '../../server')

/* GET home page. */
router.get('/', function(req, res) {
  fs.readFile(path.resolve(temp, 'view/index.html'), function (err, page) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
  });
});

module.exports = router;
