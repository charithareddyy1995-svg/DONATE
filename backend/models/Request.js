const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
{
    receiverName:String,
    receiverPhone:String,
    wantedItems:String
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Request", requestSchema);