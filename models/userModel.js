const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePicture: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;