import "./sidebar.css";
import { useContext } from "react";
import {
  RssFeed,
  Chat,
  YouTube,
  VideoLibrary,
  Settings,
  ExitToApp,
  Group,
  LockOutlined,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";

import { Link,useHistory } from "react-router-dom";


export default function Sidebar() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useHistory();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {/* Redirected to Home page */}
          <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>

          {/* Redirected to Messenger */}
          <Link
            to={`/messenger`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
          </Link>

          {/* Redirected to MTC studio */}
          
            <li className="sidebarListItem">
              <YouTube className="sidebarIcon" />
              <a className="sidebarListItemText" href="http://localhost:8501/" target="blank" style={{ textDecoration: "none", color: "inherit" }}>MTC Studio</a>
            </li>
          

          {/* User Friends */}
          <Link
            to={`/friends`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Friends</span>
            </li>
          </Link>

          {/* Redirected to Account Settings page */}
          <Link
            to={`/settings`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              <span className="sidebarListItemText">Settings</span>
            </li>
          </Link>

          {/* Redirected to Password page */}
          <Link
            to={`/changepassword`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <VideoLibrary className="sidebarIcon" />
              <span className="sidebarListItemText">Video Gallery</span>
            </li>
          </Link>

          {/* Redirected to Login Page */}
          <Link
            to={`/register`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className="sidebarListItem">
              <ExitToApp className="sidebarIcon" />
              <span
                className="sidebarListItemText"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "LOGOUT" });
                  navigate.push("/login");
                }}
              >
                Logout
              </span>
            </li>
          </Link>
        </ul>
        <hr className="sidebarHr" />
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
