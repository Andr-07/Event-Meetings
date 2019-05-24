const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    company: String,
    position: String,
    email: String,
    password: String,
    globalEvent: {
        eventNames:String,
        eventDate:String
    },
    meetings: [{
        invited: String,
        status: String,
        target: String,
        date: String,
    }]
});

userSchema.statics.getUsers = async function() {
    return this.find();
}

userSchema.statics.addUsers = async function(event) {
    await event.save();
}

module.exports = mongoose.model('User', userSchema);
