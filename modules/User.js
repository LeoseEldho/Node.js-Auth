const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trime:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trime: true,
        lowerCase:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ['Admin', "User", "SuperAdmin"],
        default:"User"
    }
},{timestamps:true});
module.exports = mongoose.model('User', UserSchema);