import "./friendz.css";

import { Link } from "react-router-dom";
export default function Friendz({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "inherit" }}>
      <li className="barFriend">
        <img className="barFriendImg"
         src={user.profilePicture ? PF + user.profilePicture: PF + "person/noAvatar.png"}
         alt="" />
        <span className="barFriendName">{user.username}</span>
    </li>

    </Link>
    
  );
}