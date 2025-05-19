const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  fileName: String,
  wordCount: Number,
  suggestions: [String],
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);
