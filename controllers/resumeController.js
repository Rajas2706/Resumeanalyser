const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.filename);

    // Read file buffer
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text from PDF
    const data = await pdf(dataBuffer);

    const text = data.text;

    // Simple analysis
    const wordCount = text.split(/\s+/).length;

    const suggestions = [];
    if (!text.toLowerCase().includes('project')) suggestions.push('Add a projects section');
    if (!text.toLowerCase().includes('linkedin')) suggestions.push('Include your LinkedIn profile');
    if (wordCount < 200) suggestions.push('Your resume seems too short — consider adding more content');

    res.status(200).json({
      message: "Resume uploaded and analyzed ✅",
      fileName: file.originalname,
      wordCount,
      suggestions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing resume", error: err });
  }
};
