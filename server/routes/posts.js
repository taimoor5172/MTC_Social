const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/addComment', async (req, res) => {
  try {
    let post = await Post.findById(req.body.postId);
    await post.updateOne({ $push: { comments:{senderId: req.body.senderId,text:req.body.text }} });
    // post = await Post.findById(req.body.postId).populate({path:'comments.senderId',select:'username profilePicture'});
    // console.log(post.comments);
    res.status(200).json("Comment added");  
  } catch (err) {
    res.status(503).json(err);
  }
});
router.get('/getComments/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate({path:'comments.senderId',select:'username profilePicture'});
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a comment
router.post('/deleteComment', async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const comnt = post.comments.find((comment) => comment.senderId == req.body.userId);
    if(comnt){
      await post.updateOne({ $pull: { comments: { _id: req.body.commentId } } });
      res.status(200).json("Comment deleted");
    }
    else{
      res.status(403).json("You can delete only your comment");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
