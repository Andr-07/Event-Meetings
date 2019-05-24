const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');


const router = express.Router();
// route for Home-Page
router.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

// route for user signup
router.route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      await user.save();
      req.session.user = user;
      res.redirect('/dashboard');
    }
    catch (error) {
      res.redirect('/signup');
    };
  });


// route for user Login
router.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
      const user = await User.findOne({ email: username });
      if (!user) {
        res.redirect('/login');
      // } else if (!user.validPassword(password)) {
    } else if (user.password !== password) {
      res.redirect('/login');
    } else {
      req.session.user = user;
      res.redirect('/dashboard');
    }
  });


// route for user's dashboard
router.get('/dashboard', async (req, res) => {
    const users = await User.find();
  if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard', {user: req.session.user.name,
                              users: users});
  } else {
    res.redirect('/login');
  }
});


router.get('/dashboard/:id', async (req, res) => {
    const id = req.params.id;
    let user = await User.findById(id);
    console.log(user);
    res.render('oneUser.hbs', {
        list: user,
    });
});


// route for user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      // res.clearCookie('user_sid');
      await req.session.destroy();
      res.redirect('/');
    }
    catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});

router.post('/new_meet', async (req, res) => {
    // let user = await User.findOne({ name: req.body.name })
    let mainId = req.session.user._id; // Sveta
    let link = req.body.invitedP;
    let target = req.body.target;
    let meetDate = req.body.meetDate;
    userId = req.body.userId;


    let user1 = await User.findById(mainId)
    console.log(user1);
    console.log(user1.meetings[0]);

    user1.meetings[0].target = target;
    user1.meetings[0].date = meetDate;
    user1.meetings[0].invited = link;
    console.log(user1)
    await user1.save();

    console.log(req.body);
    res.json(link)
})

router.get('/personalpage', async (req, res) => {
  let id = req.session.user._id;
  console.log('---------------', id)
  let user = await User.findById(id);
  console.log(user)
  res.render('personalpage.hbs', {
    user
  });
});


module.exports = router;
  