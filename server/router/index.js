const express = require('express');
const router = express.Router();
const uploader = require('./uploader');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use('/upload', uploader);

module.exports = router;
