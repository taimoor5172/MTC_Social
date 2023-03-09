import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  console.log("rightbar: ", user);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    // user.followers.includes(currentUser._id)
    // console.log("userF: ", user?.followers);
    const ff = user?.followers;
    console.log("CuserF: ", currentUser.followings);
    if (currentUser.followings.includes(user?.id) || ff?.includes(currentUser._id)) {
      setFollowed(true);
    }
    else{
      setFollowed(false);
    }
  }, [user]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userList = await axios.get("/users/allusers/");
        setUsers(userList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setFollowed(false);
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        await axios.post("/conversations", {
          senderId: currentUser._id,
          receiverId: user._id,
        });
        setFollowed(true);
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <span className="birthdayText">
            <b>Create customized Videos on Mtc Studio</b>.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">People You May Know</h4>
        <ul className="rightbarFriendList">
          {users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Bio:</span>
            <span className="rightbarInfoValue">{user.bio}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
