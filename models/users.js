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
        date: Date
    }]
});

userSchema.statics.getUsers = async function() {
    return this.find();
}

userSchema.statics.addUsers = async function(event) {
    await event.save();
}

module.exports = mongoose.model('User', userSchema);
