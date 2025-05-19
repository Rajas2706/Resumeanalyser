const express = require('express');
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');

const router = express.Router();

// Setup Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('resume'), uploadResume);

module.exports = router;
