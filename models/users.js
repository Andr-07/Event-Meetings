const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    company: String,
    position: String,
    globalEvent: {
        eventNames:String, 
        eventDate: String
    },
    meetings: [{
        invited: String,
        status: Boolean,
        target: String,
        date: String
    }]
});

module.exports = mongoose.model('User', userSchema);
