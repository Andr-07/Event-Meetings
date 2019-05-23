const User = require('../models/users');
// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/EventMeetings', { useNewUrlParser: true });

const db = mongoose.connection;

async function run() {
    let saveData = new User({
        name: 'Andrey',
        email: 'a@gmail.com',
        company: 'Aco',
        position: 'manager',
        globalEvent: {
            eventNames: "Digital Aviation Forum",
            eventDate: new Date("2019-05-23")
        },
        meetings: [{
            status: false
        }]
    })
    await saveData.save();

    db.close()
}

run()