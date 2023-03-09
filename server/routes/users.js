const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ message: "Account has been updated" });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(200).json({ error: "You can update only your account!" });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users 
router.get("/allusers", async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
})

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});



//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});
router.get('/searchUser/:username',async (req, res) => {
  const { username } = req.params;
  try {
      const data = await User.find({"username": {$regex: '^' + username, $options: 'i'}},{username:1,_id:1,profilePicture:1})
      if (data) {
          return res.status(200).json(data);
      } else {
          console.log("not Record");
          return res.status(422).json({ message: "No Record" });
      }
      }
      catch (err) {
          console.log(err);
      }
  })

  router.get('/getProfile/:id',async (req, res) => {
    const { id } = req.params;
    try {
        const data = await User.findOne
        ({"_id": id},{_id:1,username:1,profilePicture:1,coverPicture:1,city:1,bio:1,email:1})
        if (data) {
            return res.status(200).json(data);
        } else {

            return res.status(422).json({ message: "No Record" });
        }
        }
        catch (err) {
            console.log(err);
        }
    })

    router.post('/updateProfile',async (req, res) => {
      console.log("body",req.body);
      const {_id,username,city,bio,email } = req.body;
      try {
          const data = await User.updateOne
          ({"_id":_id},{$set:{username:username,city:city,bio:bio,email:email}})
          if (data) {
              return res.status(200).json(data);  
          } else {
              console.log("not Record");
              return res.status(422).json({ message: "No Record" });
          }
          }
          catch (err) {
              console.log(err);
          }
      })
      router.post('/updatePicture/:id',async (req, res) => {
        try {
            const data = await User.updateOne
            ({"_id":req.params.id},{$set:req.body})
            if (data) {
                return res.status(200).json(data);
            } else {
                console.log("not Record");
                return res.status(422).json({ message: "No Record" });
            }
            }
            catch (err) {
                console.log(err);
            }
        })
        router.get('/getUser/:id',async (req, res) => {
          const { id } = req.params;
          try {
              const data = await User.findOne({"_id": id})
              if (data) {
                  return res.status(200).json(data);
              } else {
                  console.log("not Record");
                  return res.status(422).json({ message: "No Record" });  
              }
              }
              catch (err) {

                  console.log(err);

              }
          })
          

module.exports = router;
