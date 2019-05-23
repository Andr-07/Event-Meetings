const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');

const router = express.Router();

router.get('/', sessionChecker, (req, res) => {
    res.render('admin');
  });

router.get('/show', async function (req, res){
    let all = await User.find();
    let arr =[];
    let arr2 =[];
    let meet = (await User.find()).map(item=>item.meetings);
    for (let i = 0; i < meet.length; i++) {
        console.log(meet[i][0].status);
        arr.push(meet[i][0].status)
    }
    for (let i = 0; i < meet.length; i++) {
      if (meet[i][0].invited===undefined) {
        meet[i][0].invited = "Нет встреч"
      } else "Есть встреча"
      arr2.push(meet[i][0].invited)
  }
    
    console.log(arr2);
    
    res.render('showlist', {list:all, arr:arr})

    });


  router.get('/meetings', sessionChecker, (req, res) => {
    res.render('admin');
  });


router.post('/createNew', async function (req, res) {
    console.log("+++++++++++");
    
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
        status: false,
    }]
    })
    await saveData.save();
    console.log(saveData);
    res.json(saveData)
  })




  module.exports = router;

