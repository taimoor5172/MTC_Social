const router = require("express").Router();
const Notification =  require("../models/Notifications");
const User = require("../models/User");
const Post = require("../models/Post");

router.post('/addLikesNotification',async (req,res)=>{
    const post = await Post.findById(req.body.postId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      const newNotification = new Notification({
        userId:req.body.userId,
        receiverId:req.body. receiverId,
        msg:"liked your post",
    });
    await newNotification.save();
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      const newNotification = new Notification({
        userId:req.body.userId,
        receiverId:req.body. receiverId,
        msg:"Disliked your post",
    });
    await newNotification.save();
      res.status(200).json("The post has been disliked");
    }
});
router.post('/addCommentsNotification',(req,res)=>{
    const newNotification = new Notification({
        userId:req.body.userId,
        receiverId:req.body.receiverId,
        msg:"commented on your post",
    });
    newNotification.save()
    .then((notification)=>{
        res.status(200).json(notification);
    }
    )
    .catch((err)=>{
        res.status(500).json(err);
    }
    )
});
router.get('/getNotifications/:userId',(req,res)=>{
    Notification.find({receiverId:req.params.userId}).populate({path:'userId',select:'username profilePicture'})
    .then((notifications)=>{
        res.status(200).json(notifications);
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}
);
//delete a notification
router.delete('/deleteNotification/:id',async (req,res)=>{
    try{
        const notification =
        await Notification.findById(req.params.id);
        await notification.deleteOne();
        res.status(200).json("the notification has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
}
);


module.exports = router;