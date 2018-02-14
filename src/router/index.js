<<<<<<< HEAD
let express = require('express');let router = express.Router();let path = require('path');console.log('Ta fuck it all')router.get('/', function(req, res) {    console.log(path.resolve('build', 'index.html'));    res.sendFile(path.resolve('build','index.html'));});router.get('/about', function(req, res) {    console.log('about router shooted');    res.sendFile(path.resolve('build', 'index.html'));});module.exports = {router: router};
=======
let express = require('express');let router = express.Router();let path = require('path');router.get('/', function(req, res) {    console.log(path.resolve('build', 'index.html'));    res.sendFile(path.resolve('build','index.html'));});router.get('/about', function(req, res) {    console.log('about router shooted');    res.sendFile(path.resolve('build', 'index.html'));});module.exports = {router: router};
>>>>>>> c947e64f9abad418a35f0016ec1ecdeb986920bc
