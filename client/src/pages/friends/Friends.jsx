import React from 'react'
import "./friends.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Userfriends from "../../components/userfriends/Userfriends";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
export default function Friends() {
  const [user, setUser] = useState({});
  const username = useParams().username;


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        
        <Sidebar />
        <Userfriends/>
        <Rightbar/>
      </div>
    </>
    
    
  )
}
