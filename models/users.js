const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    company: String,
    position: String,
    globalEvent: {
        eventNames:String, 
        eventDate:Date
    },
    meetings: [{
        invited: String,
        status: Boolean,
        target: String,
        date: Date
    }]
});

module.exports = mongoose.model('User', userSchema);
