import "./topbar.css";
import { Search, Person, Chat, Notifications, DeleteForeverOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [open, setOpen] = useState(false);
  const [sopen, setSOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const getNotifications = async () => {
    console.log(open);
      if (!open) {
          const res = await axios.get("/notifications/getNotifications/" + user._id);
          setNotifications(res.data);
          console.log(notifications);
      }
      setOpen(!open);
  };
  const filterData = async (value) => {
    if (value.length > 0 && !sopen) {
      const res = await axios.get("/users/searchUser/"+value);
      setSearchResult(res.data);
    }
     setSOpen(!sopen);
}
const deleteNotification = async (id) => {
  try {
    await axios.delete("/notifications/deleteNotification/" + id);
    setNotifications(notifications.filter((n) => n._id !== id));
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">My Talking Clone</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friends..." className="searchInput" onChange={(e)=>{filterData(e.target.value)}}/>
          {sopen && (
            <div style={{color: "white",
            width: "19em",
            padding: "1em",
            height: "fit-content",
            overflowY: "scroll",
            position: "absolute",
            WebkitScrollbar: {
              width: "2em",
              height: "2em",
            },
            
            top: "45px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft:"2em",
            backgroundColor: "white",}} >
              {searchResult.map((user)=>(
                  <Link to={`/profile/${user.username}`}>
                <div style={{display:"flex",padding:"5px",border:"1px solid black",marginBottom:"10px"}}>
                  <img
                    style={{ width: "50px", height: "50px",borderRadius:"50%" }}
                    src={user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"}
                    alt=""  
                  />
                  <label style={{marginTop:"15px",marginLeft:"10px",color:"black"}}>{user.username}</label>
                </div>
                  </Link>
              ))}
            </div>
          )
           }
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          {/* Redirected to user friends page */}
          <Link
            to={`/friends`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="topbarIconItem">
              <Person />
              {/* <span className="topbarIconBadge"></span> */}
            </div>
          </Link>

          {/* Redirected to chat page */}
          <Link
            to={`/messenger`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="topbarIconItem">
              <Chat />
              {/* <span className="topbarIconBadge"></span> */}
            </div>
          </Link>

          {/* Notifications of comments , like and new friends */}
          <div className="topbarIconItem" onClick={getNotifications}>
            <Notifications />
            {open && (
              <div
                style={{
                  color: "black",
                  width: "19em",
                  padding: "1em",
                  height: "fit-content",
                  overflowY: "scroll",
                  position: "absolute",
                  WebkitScrollbar: {
                    width: "2em",
                    height: "2em",
                  },
                  right: 0,
                  top: "45px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  backgroundColor: "white",
                }}
              >
                {notifications.map((n) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                      ,padding:"5px",border:"1px solid black",marginBottom:"10px"
                    }}
                  >
                    <div>
                    <img
                      className="postProfileImg"
                      style={{ width: "30px", height: "30px", borderRadius: "50%",marginTop:"10px" }}
                      src={
                        user.profilePicture
                          ? PF + n.userId.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                      <span style={{ marginLeft: "9px"}}>
                         {n.userId.username}  {n.msg}
                      </span>
                    </div>
                      <DeleteForeverOutlined className="delIcon" onClick={()=>deleteNotification(n._id)}/>
                  </div>
                ))}
              </div>
            )}
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <Link to={`/profile/${user.username}`}>
          <img
          
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/2.jpeg"
            }
            alt=""
            className="topbarImg"
          />
          
        </Link>
        <span style={{marginLeft:"5px"}}>{user.username}</span>
      </div>
    </div>
  );
}
