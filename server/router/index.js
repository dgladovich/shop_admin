const express = require('express');
const router = express.Router();
const uploader = require('./uploader');

router.use('/upload', uploader);

module.exports = router;
