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
  const list = await User.findById(req.params.id);
  res.render('oneUser', { list });
});


router.post('/new_meet', async (req, res) => {
  // let user = await User.findOne({ name: req.body.name })
  let mainName = "Georg"
 let link = req.body.invitedP;
  let target = req.body.target;
  let meetDate = req.body.meetDate;
  userId = req.body.userId;

  let user1 = await User.findById(userId)
  console.log(user1);
  console.log(user1.meetings[0]);
  
  user1.meetings[0].target = target;
  user1.meetings[0].date = meetDate;
  user1.meetings[0].invited = mainName;
  console.log(user1)
  await user1.save();

  // console.log(req.body);
  res.json(link)
  })



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
