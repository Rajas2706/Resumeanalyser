const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();
const app = express();
app.get('/', (req, res) => {
  res.send('Resume Analyzer API is running 🚀');
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/resume', resumeRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Mongo error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
