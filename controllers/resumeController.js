const uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "Resume uploaded successfully",
      fileName: file.originalname,
      size: file.size
    });
  } catch (err) {
    res.status(500).json({ message: "Error uploading resume", error: err });
  }
};

const analyzeResume = async (req, res) => {
  const userId = req.params.userId;

  res.json({
    score: 75,
    suggestions: [
      "Add more projects",
      "Mention programming languages",
      "Include LinkedIn profile"
    ]
  });
};

module.exports = { uploadResume, analyzeResume };
