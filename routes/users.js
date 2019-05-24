const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
/* GET users listing. */


router.get('/', async function (req, res) {
  const users = await User.find();
  res.render('users', { users });
});

router.get('/:id', async function (req, res) {
  const users = await User.find();
  res.render('oneUser', { users });
});


router.post('/new_meet', async (req, res) => {
  // let user = await User.findOne({ name: req.body.name })
 let link = req.body.invitedP;
  let target = req.body.target;
  let meetDate = req.body.meetDate;
  userId = req.body.userId;
  console.log(req.body);


  
  // user.meetings.push({
  //   name: req.body.name,
  //   target: req.body.target,
  //   data: new Date(req.body.date)
  res.json(link)
  })
  // await user.save();



      // user.meeting.findOneAndUpdate({
      //   $set: { 
      //     target: req.body.target, 
      //     data: req.body.date 
      //   }
      // }), ({ new: true }), async (err, doc) => {
      //   if (err) {
      //     console.log("Something wrong when updating data!");
      //   }
      // }
      // res.redirect('/')

router.get('/history', async (req, res) => {
  let invited = [];
  let users = await User.find()
  for (let i = 0; i < users.length; i++) {
    if (users[i].meeting.invited) {
      invited.push(users[i])
    }
  }
  res.render('history', invited)
});

module.exports = router; 
