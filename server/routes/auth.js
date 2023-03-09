const router = require("express").Router();
const User = require("../models/User");
const PasswordResetTokens = require("../models/PasswordResetTokens");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});



router.post('/resetPassword', (req, res) => {

  const { email } = req.body
  console.log('email in body', email)
  User.findOne({ email: email.toLowerCase() })
    .then(user => {
      if (!user) {
        console.log('user down not exist')
        return res.send({ error: 'user does not exist!!' })
      } else if (user) {
        const token = jwt.sign({ email: user.email.toLowerCase() }, process.env.JWT_KEY);
        const newToken = PasswordResetTokens({
          userID: user._id,
          token
        })
        newToken.save()
          .then(result => {
            console.log('new token:', result)
            res.send({ token, userID: user._id })
          }).catch(error => {
            console.log('save user error:', error)
          })
      }
    }).catch(error => {
      console.log('find user error:', error)
    })
});


router.post('/savePassword', (req, res) => {
  const { userID, token, newPassword } = req.body

  console.log('userID', userID)
  console.log('token', token)

  PasswordResetTokens
    .findOne({ userID, token })
    .then(data => {
      // if (!data) {
      //     console.log('.then no data: ', data)
      //     return res.send({ error: 'your token has been expired' })
      // } else if (data) {

      // }

      data.remove()
      User.findOne({ _id: userID })
        .then(async (user) => {

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newPassword, salt);
          user.password = hashedPassword
          user
            .save()
            .then(result => {
              if (result) {
                console.log('save user result: ', result)
                return res.send({ message: 'Password Reset Sucessfully' })
              } else if (!result) {
                console.log('!result: ', result)
                return res.send({ error: 'Password Could not be updated' })
              }
            }).catch(error => {
              console.log('save user catch error: ', error)
              res.send({ error: 'Password Could not be updated' })
            })
        })

    }).catch(error => {
      console.log('exec function catch error: ', error)
      return res.send({ error: 'Password Could not be updated' })
    })
})


module.exports = router;
