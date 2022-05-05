import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getUser } from "../../services/UserService";
import ProfileHeader from "./ProfileHeader";
import LinearIndeterminate from "../commons/LinearIndeterminateLoading";

// kept them here since we're going to need these to be dynamic pictures
import cover from "./assets/cover.png";
import profilePic from "./assets/1.png";

import {
  vectorPencil,
  vectorGithub,
  vectorLinkedin,
  vectorMore,
  vectorAdd,
  vectorHeart,
  vectorComment,
  vectorShare,
  vectorExpand,
  vectorPostPic, // we will delete these obv
  vectorFeed,
} from "./assets/index";
import "./Profile.css";
import axios from "axios";
import EditProfileModal from "./EditProfileModal";

const baseProfileURL = "https://placeholder-backend.herokuapp.com/user/getUser"
const getProfilePage = ( user_id, setUser ) => {
  axios.get(baseProfileURL, {
    params: {
      "requested_id": user_id
    }
  }).then( (response) => {
    if (response.data.code === 200) { // success
      const user = response.data.user;
      setUser(user);
    } else {
      setUser(null);
    }
  }).catch( (error) => console.log(error));
};

export default function Profile() {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [isOwnedProfile, setOwnedProfile] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const editProfile = () => {
    setOpen(true);
  }

  useEffect(() => {
    setSessionUser(JSON.parse(localStorage.getItem("user")));

    getUser(user_id).then((response) => {
      setUser(response.data.user);
    });
  }, [user_id]);

  useEffect( () => {
    getProfilePage(user_id, setUser);
    setIsEdit(false);
  },[isEdit] );

  useEffect(() => {
    if (user && sessionUser) {
      setOwnedProfile(parseInt(sessionUser.id) === parseInt(user.id));
    }
  }, [user, sessionUser]);

  if (!user) {
    return (
      <div className="profileContainer">
        <LinearIndeterminate></LinearIndeterminate>
      </div>
    );
  }

  return (
    <div className="profileContainer">
      <ProfileHeader></ProfileHeader>
      <img src={cover} className="coverImage" alt="" />

      <div className="profileDetails">
        <div className="profileDetailLeft">
          <div className="profileDetailRow">
            <img src={profilePic} alt="" className="profileImage" />
            <div>
              <h3>
                {user.full_name}{" "}
                {isOwnedProfile ? <span> is my profile</span> : <></>}
              </h3>
              <h4>54 connections</h4>
              <a href="https://github.com/mavibirdesmi">
                {" "}
                <img src={vectorGithub} className="githubImage" alt="" />{" "}
              </a>
              <a href="https://www.linkedin.com/in/desmin-alpaslan/">
                {" "}
                <img src={vectorLinkedin} className="githubImage" alt="" />{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="profileDetailRight">
          <a>
            {" "}
            <img src={vectorAdd} className="more" alt="" />{" "}
          </a>
          <a id="modalBtn" className="modalButton"
             onClick={editProfile}> <img src={vectorPencil} className="githubImage" alt=""/>
          </a>
          <a>
            {" "}
            <img src={vectorMore} className="more" alt="" />{" "}
          </a>

          <EditProfileModal open={open} user={user} setIsEdit={setIsEdit} onClose={() => setOpen(false)}/>

        </div>
      </div>

      <div className="profileFeedContainer">
        {/* <div className="infoColumn"></div> */}

        <div className="feedColumn">
          <div className="postContainer">
            <a className="profileFeed">
              <img src={vectorFeed} />
              ⠀Profile Feed
            </a>
            <div className="userProfile">
              <img src={vectorPostPic} alt="" />
              <div>
                <p>{user.full_name} posted</p>
                <span>April 15 2022, 13:40 pm</span>
              </div>
            </div>
            <p className="postText">
              {" "}
              ⠀⠀Ders deneme bir iki üç!⠀
              <a href="#">https://zoom.us/j/612312612987123</a>
            </p>
            <div className="postRow">
              <div className="activityIcons">
                <div>
                  <img src={vectorHeart} />
                  21
                </div>
                <div>
                  <img src={vectorComment} />3
                </div>
                <div>
                  <img src={vectorShare} />6
                </div>
                <button>
                  {" "}
                  <img src={vectorExpand} />
                </button>
              </div>
            </div>
          </div>

          <div className="postContainer">
            <div className="userProfile">
              <img src={vectorPostPic} alt="" />
              <div>
                <p>{user.full_name} posted</p>
                <span>April 15 2022, 13:40 pm</span>
              </div>
            </div>
            <p className="postText">
              {""}
              Harika, müthiş, inanılmaz!⠀
              <a href="#">https://zoom.us/j/612312612987123</a>
            </p>
            <div className="postRow">
              <div className="activityIcons">
                <div>
                  <img src={vectorHeart} />
                  21
                </div>
                <div>
                  <img src={vectorComment} />3
                </div>
                <div>
                  <img src={vectorShare} />6
                </div>
                <button>
                  {" "}
                  <img src={vectorExpand} />
                </button>
              </div>
            </div>
          </div>

          <div className="postContainer">
            <div className="userProfile">
              <img src={vectorPostPic} alt="" />
              <div>
                <p>{user.full_name} posted</p>
                <span>April 15 2022, 13:40 pm</span>
              </div>
            </div>
            <p className="postText">
              {" "}
              ⠀⠀Harika, müthiş, inanılmaz!⠀
              <a href="#">https://zoom.us/j/612312612987123</a>
            </p>
            <div className="postRow">
              <div className="activityIcons">
                <div>
                  <img src={vectorHeart} />
                  21
                </div>
                <div>
                  <img src={vectorComment} />3
                </div>
                <div>
                  <img src={vectorShare} />6
                </div>
                <button>
                  {" "}
                  <img src={vectorExpand} />
                </button>
              </div>
            </div>
          </div>

          <div className="postProfileIcon">
            <img /> <i className="bruh"></i>
          </div>
        </div>
      </div>
    </div>
  );
}