const express = require('express');
const router = express.Router();
const multer  = require('multer');
const mime = require('mime');
const crypto = require('crypto');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
const upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' });

// define the home page route
router.post('/', upload.single('file'), function(req, res) {
    let {file} = req;
    let mime = file.mimetype.split('/')[0];
    let extension = file.mimetype.split('/')[1];

    console.log(mime, extension);

    res.send({});
});

module.exports = router;