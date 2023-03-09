import "./post.css";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatBubbleOutline,Send } from "@material-ui/icons";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [flag, setFlag] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
// delete post

  const deletePost = async () => {
    try {
      await axios.delete('/posts/'+post._id, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
    } catch (err) {}
  };
  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
      axios.post("/notifications/addLikesNotification", {
        userId: currentUser._id,
        postId: post._id,
        receiverId: post.userId,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const deleteComment = async (commentId) => {
    try {
      await axios.post("/posts/deleteComment", { userId: currentUser._id,postId: post._id,commentId:commentId });
      setFlag(!flag);
    } catch (err) {}
  };
  const sendComment = async () => {
    const newComment = {
      postId: post._id,
      senderId: currentUser._id,
      text: commentText,
    };
    try {
      await axios.post("/posts/addComment", newComment);
      axios.post("/notifications/addCommentsNotification", {
        userId: currentUser._id,
        receiverId: post.userId,
      });
      setFlag(!flag);
      setCommentText("");
    } catch (err) {} 
  };
  const openCommentsHandler = async () => {
    setOpenComments(!openComments);
    const res = await axios.get("/posts/getComments/" + post._id);
    setComments(res.data);
  };
  useEffect(() => {
    axios.get("/posts/getComments/" + post._id).then((res) => {
      setComments(res.data);
    });
  }, [flag]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <DeleteOutlineOutlined className="icons" onClick={()=>deletePost()} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
          
            <ChatBubbleOutline className="icons"/>
            <span
              className="postCommentText"
              onClick={()=>openCommentsHandler()}
            >
              {post.comment} comments
            </span>
          </div>
        </div>
          {openComments && (
            <div>
              <div className="comment">
                <input style={{width:"400px",height:"25px"}} type text placeholder="Add a comment" onChange={(e)=>setCommentText(e.target.value)}/>
                <button style={{width:"35px",height:"30px",backgroundColor:"black",color:"white",marginLeft:"20px"}} onClick={()=>sendComment()}><Send/></button>
              </div>
              {comments.map((c) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      className="postProfileImg"
                      style={{ width: "30px", height: "30px", borderRadius: "50%",marginTop:"10px" }}
                      src={
                        user.profilePicture
                          ? PF + c.senderId.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                    <span style={{fontWeight:500,marginLeft:"8px",marginTop:"12px"}}>{c.senderId.username}</span>
                    <DeleteOutlineOutlined className="icons" style={{marginLeft:"70%",marginTop:"12px"}} onClick={()=>deleteComment(c._id)}/>
                  </div>
                  <p style={{marginLeft:"3em"}}>{c.text}</p>
                </div>
              ))}
              </div>
          )}
      </div>
    </div>
  );
}
