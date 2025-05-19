const express = require('express');
const router = express.Router();
const { uploadResume, analyzeResume } = require('../controllers/resumeController');
const multer = require('multer');

// Store file in memory (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/analyze/:userId', analyzeResume);

module.exports = router;
