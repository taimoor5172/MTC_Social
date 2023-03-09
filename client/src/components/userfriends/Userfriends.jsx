import React from 'react'
import "./userfriends.css"
import Friendz from "../friendz/Friendz";
import { useContext,useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Userfriends() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  
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
  return (
    <>
        {/* <hr className="sidebarHr" /> */}
        <ul className="sidebarFriendList" style={{margin:'30px',width:'50%'}}>
          {friends.map((friend) => {
            if (friend._id !== user._id) return <Friendz user={friend} key={friend._id} />;
            })}
            
            {/* // <Link to={`/users/${p._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            //   <Profile key={p._id} user={p} />
            // </Link> */}
             
            
        </ul>
    </>
  )
}
