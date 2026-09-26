const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
{
    donorName:String,
    donorEmail: String,
    donorPhone:String,
    donorAddress:String,
    donorTown:String,
    donorCity:String,
    donorState:String,

    category:String,
    itemDescription:String,

    pickupDate:String,
    pickupTime:String,

    location:String
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Donation", donationSchema);