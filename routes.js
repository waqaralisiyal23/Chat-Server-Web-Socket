const express = require('express');
const multer = require('multer');
const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {      // filename of file to be stored
        cb(null, Date.now() + '.jpg');
    },
});

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 6,
    // },
    // fileFilter: fileFilter,
});

router.route('/addimage').post(upload.single('img'), (req, res) => {
    try {
        res.json({ path: req.file.filename });
    } catch (e) {
        return res.json({ error: e });
    }
});

module.exports = router;