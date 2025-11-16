const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB (optional - app will work without it)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/donate';
if (mongoUri && mongoUri !== 'undefined') {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.log("⚠️  MongoDB connection failed - running without database");
    console.log("   To use database, install MongoDB or use MongoDB Atlas");
  });
} else {
  console.log("⚠️  MongoDB not configured - running without database");
}

// Basic route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
