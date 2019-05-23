const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    company: String,
    position: String,
    password: String,
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

userSchema.statics.getUsers = async function() {
    return this.find();
}

userSchema.statics.addUsers = async function(event) {
    await event.save();
}

module.exports = mongoose.model('User', userSchema);
