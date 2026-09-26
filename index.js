require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Import Donation model
const Donation = require("./models/Donation");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});


// ===============================
// POST - Create Donation
// ===============================
app.post("/api/donations", async (req, res) => {

  try {

    const donation = new Donation(req.body);

    await donation.save();

    res.status(201).json({
      message: "Donation submitted successfully!",
      donation: donation
    });

  } catch (error) {

    console.error("Donation error:", error);

    res.status(500).json({
      message: "Failed to submit donation"
    });

  }

});


// ===============================
// GET - My Donations
// ===============================
app.get("/api/donations", async (req, res) => {

  try {

    const { email } = req.query;

    const donations = await Donation.find({
      donorEmail: email
    }).sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {

    console.error("Fetch donations error:", error);

    res.status(500).json({
      message: "Failed to fetch donations"
    });

  }

});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});