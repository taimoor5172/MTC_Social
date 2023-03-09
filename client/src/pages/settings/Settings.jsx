import { useContext, useState, useEffect, useRef } from "react";
import "./settings.css";
import { useHistory } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Settings() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const uploadProfileRef = useRef();
  const uploadCoverRef = useRef();
  const { user: currentUser,dispatch } = useContext(AuthContext);
  const [data, setData] = useState({
    _id: "",
    username: "",
    profilePicture: "",
    coverPicture: "",
    city: "",
    bio: "",
    email: "",
  });
  const [msg, setMsg] = useState("");
  const [profilefile, setProfileFile] = useState(null);
  const [coverfile, setCoverFile] = useState(null);
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    axios.get("/users/getProfile/" + currentUser._id).then((res) => {
      setData(res.data);
    });
  }, []);
  const uploadImageProfile = async (e) => {
    e.preventDefault();
    uploadProfileRef.current.click();
    uploadProfileRef.current.addEventListener("change", uploadProfileImage);
  };
  const uploadImageCover = async (e) => {
    e.preventDefault();
    uploadCoverRef.current.click();
    uploadCoverRef.current.addEventListener("change", uploadCoverImage);
  };
  const uploadCoverImage = async (e) => {
    e.preventDefault();
    setCoverFile(e.target.files[0]);
    if (coverfile) {
      const data = new FormData();
      const fileName = Date.now() + coverfile.name;
      data.append("name", fileName);
      data.append("file", coverfile);
      await axios.post("/upload", data);
      const u =await axios
        .post("/users/updatePicture/"+ currentUser._id, {
          coverPicture: fileName,
        });
      if(u.status === 200){
        alert("Cover Picture Updated Successfully");
        window.location.reload();
      }
    }
  };
  const uploadProfileImage = async (e) => {
    e.preventDefault();
    setProfileFile(e.target.files[0]);
    if (profilefile) {
      const data = new FormData();
      const fileName = Date.now() + profilefile.name;
      data.append("name", fileName);
      data.append("file", profilefile);
      await axios.post("/upload", data);
      const u = await axios
        .post("/users/updatePicture/"+ currentUser._id, {
          profilePicture: fileName,
        });
      if(u.status === 200){
        alert("Profile Picture Updated Successfully");
        window.location.reload();
      }
    }
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    axios
      .post("/users/updateProfile", {
        _id: currentUser._id,
        username: data.username,
        email: data.email,
        bio: data.bio,
        city: data.city,
      })
      .then((res) => {
        // setData(res.data);
        if (res.status === 200) {
          setMsg("Profile Updated Successfully");
        } else {
          setMsg("Something went wrong");
        }
      });
  };
  const cancelClick = () => {
    axios.get("/users//getUser/"+ currentUser._id).then((res) => {
      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));
      history.push("/");
    });
    
  };
  return (
    <>
      <Topbar />
      <div className="updateDiv">
        <div className="card">
          <div className="heading" style={{ marginLeft: "10px" }}>
            Edit Profile
          </div>
          <div className="Row">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  data.coverPicture
                    ? PF + data.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <button
                style={{
                  borderRadius: "20px",
                  backgroundColor: "rgb(2, 5, 183)",
                  color: "white",
                }}
                onClick={uploadImageCover}
              >
                CoverImage
              </button>
              <input
                type="file"
                style={{ display: "none" }}
                accept="*"
                ref={uploadCoverRef}
                // onChange={uploadImage}
              />
              <img
                className="profileUserImg"
                src={
                  data.profilePicture
                    ? PF + data.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <button
                style={{
                  borderRadius: "20px",
                  backgroundColor: "rgb(2, 5, 183)",
                  color: "white",
                  marginLeft: "48em",
                  cursor: "pointer"
                }}
                onClick={uploadImageProfile}
              >
                ProfileImage
              </button>
              <input
                type="file"
                style={{ display: "none" }}
                accept="*"
                ref={uploadProfileRef}
                // onChange={uploadImage}
              />
            </div>
          </div>

          <div className="Row">
            <div className="inputContainer">
              <div className="inputHeading">Username</div>
              <input
                type="text"
                name="username"
                value={data.username}
                className="loginInput"
                onChange={handleInput}
              />
            </div>

            <div className="inputContainer">
              <div className="inputHeading">Email</div>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInput}
                className="loginInput"
              />
            </div>
          </div>

          <div className="Row">
            <div className="bio">
              <div className="inputHeading">Bio</div>
              <input
                name="bio"
                value={data.bio}
                type="text"
                onChange={handleInput}
                className="loginInput"
              />
            </div>
            <div className="city">
              <div className="inputHeading">City</div>
              <input
                name="city"
                value={data.city}
                type="text"
                onChange={handleInput}
                className="loginInput"
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="loginButton" onClick={() => cancelClick()}>
              Back to Home
            </button>
            <button
              className="loginButton"
              style={{ marginLeft: "1em" }}
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </div>
          <div className="Row">
            <div className="success_message-">{msg}</div>
          </div>
        </div>
      </div>
    </>
  );
}
