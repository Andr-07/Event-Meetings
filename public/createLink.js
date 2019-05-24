"use strict"

//******************генерим пароль*****************
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
//******************генерим линк*****************
function generateLink(userID) {
    return window.location.hostname + '/user' + userID;
}

module.exports = {generatePassword, generateLink};

//usage:
// const {generatePassword} = require('./createLink.js');
// const {generateLink} = require('./createLink.js');