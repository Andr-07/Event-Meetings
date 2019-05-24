const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin');
  });

router.get('/show', async function (req, res){
    let all = await User.find();
    let arr =[];
    let arrStatus =[];
    let meet = (await User.find()).map(item=>item.meetings);
    for (let i = 0; i < meet.length; i++) {
        console.log(meet[i][0].status);
        arr.push(meet[i][0].status)
    }
    for (let j = 0; j < meet.length; j++) {
      if (meet[j][0].invited===undefined) {
        meet[j][0].invited = "Нет встреч"
      } else meet[j][0].invited = "Есть встреча " + meet[j][0].invited;
      arrStatus.push(meet[j][0].invited)
  }
    res.render('showlist', {list:all, arr:arrStatus})
    })


  router.get('/meetings', async function (req, res)  {
    let all = await User.find();
    res.render('meetings', {list:all});
  });


router.post('/createNew', async function (req, res) {
    let name = req.body.createName;
    let email = req.body.createEm;
    let company = req.body.createC;
    let position = req.body.createP;
    let saveData = new User({
      name:name,
        email:email, 
        company:company, 
        position:position,
        globalEvent: {
            eventNames: "Digital Aviation Forum",
            eventDate: "23.05.2019"
    },
    meetings: [{
        status: 'В ожидании'
    }]
    })
    await saveData.save();
    console.log(saveData);
    res.json(saveData)
  })


  router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let all = await User.findById(req.params.id);
    let person =  all.meetings.map(item=>item.invited)[0]
    let invitedPerson = await User.find({name:person})
    // let answer = req.body.createMeet;
    // let response = await Category.findOneById(answer);
    // console.log('---------', answer)
    // res.json(response)
    res.render('onePerson', {list: all, person:invitedPerson[0]});
  })

router.post('/accept', async function (req, res) {
    let userId = req.body.userId;
    let button = req.body.button;
    console.log(userId, button);

    let user1 = (await User.find({_id: userId}))
    user1[0].meetings[0].status = 'Встреча подтверждена';
    console.log(user1);
    await user1[0].save();
    res.json();
})

router.post('/reject', async function (req, res) {
    let userId = req.body.userId;
    let button = req.body.button;
    console.log(userId, button);

    let user1 = (await User.find({_id: userId}))
    user1[0].meetings[0].invited = undefined;
    console.log(user1);
    await user1[0].save();
    res.json();
})



  module.exports = router;

