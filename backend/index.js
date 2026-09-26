require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("./models/User");
const Donation = require("./models/Donation");
const Request = require("./models/Request");

const app = express();


// ================= EMAIL SETUP =================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= MONGODB =================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });


// ================= HOME =================

app.get("/", (req, res) => {
    res.send("Backend Working");
});


// ================= REGISTER =================

app.post("/api/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ================= LOGIN =================

app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ================= DONATION =================

app.post("/api/donations", async (req, res) => {

    try {

        // Save donation to MongoDB
        const donation = await Donation.create(req.body);


        // ================= SEND EMAIL =================

        try {

            await transporter.sendMail({

                from: process.env.EMAIL_USER,

                to: donation.donorEmail,

                subject: "Dona✝e - Donation Successfully Placed",

                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">

                        <h2 style="color: #2e8b57;">
                            Dona✝e
                        </h2>

                        <h3>
                            Donation Successfully Placed
                        </h3>

                        <p>
                            Hello ${donation.donorName || "Donor"},
                        </p>

                        <p>
                            Your donation has been successfully placed with Dona✝e.
                        </p>

                        <h3>Donation Details</h3>

                        <p>
                            <strong>Item:</strong>
                            ${donation.itemDescription || "N/A"}
                        </p>

                        <p>
                            <strong>Category:</strong>
                            ${donation.category || "N/A"}
                        </p>

                        <p>
                            <strong>Pickup Date:</strong>
                            ${donation.pickupDate || "N/A"}
                        </p>

                        <p>
                            <strong>Pickup Time:</strong>
                            ${donation.pickupTime || "N/A"}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${donation.donorPhone || "N/A"}
                        </p>

                        <br>

                        <p>
                            Thank you for your kindness and for helping someone in need. ❤️
                        </p>

                        <p>
                            <strong>
                                Dona✝e Team
                            </strong>
                        </p>

                    </div>
                `
            });

            console.log("Donation email sent successfully");

        } catch (emailError) {

            console.log("Email sending failed:", emailError.message);

        }


        // Donation was saved successfully
        res.status(201).json({
            success: true,
            message: "Donation submitted successfully",
            donation
        });


    } catch (error) {

        console.log("Donation error:", error);

        res.status(500).json({
            message: error.message
        });

    }

});


// ================= GET DONATIONS =================

app.get("/api/donations", async (req, res) => {

    try {

        const donations = await Donation.find()
            .sort({ createdAt: -1 });

        res.json(donations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ================= REQUEST =================

app.post("/api/requests", async (req, res) => {

    try {

        const request = await Request.create(req.body);

        res.status(201).json(request);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


app.get("/api/requests", async (req, res) => {

    try {

        const requests = await Request.find()
            .sort({ createdAt: -1 });

        res.json(requests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});