const fs = require('fs');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume'); // ✅ Import the model

const uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;
    const wordCount = text.split(/\s+/).length;

    // Very basic suggestion logic:
    const suggestions = [];
    if (!text.toLowerCase().includes('project')) suggestions.push("Add a projects section");
    if (!text.toLowerCase().includes('linkedin')) suggestions.push("Include your LinkedIn profile");

    // ✅ Save to MongoDB
    const newResume = new Resume({
      fileName: file.originalname,
      wordCount,
      suggestions
    });

    await newResume.save(); // Save to DB

    res.status(200).json({
      message: "Resume uploaded and analyzed ✅",
      fileName: file.originalname,
      wordCount,
      suggestions
    });
  } catch (err) {
    res.status(500).json({ message: "Error uploading resume", error: err });
  }
};

module.exports = { uploadResume };
