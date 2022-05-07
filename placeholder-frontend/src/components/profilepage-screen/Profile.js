import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getUser } from "../../services/UserService";
import ProfileHeader from "./ProfileHeader";
import LinearIndeterminate from "../commons/LinearIndeterminateLoading";

import {
  vectorHeart,
  vectorComment,
  vectorShare,
  vectorExpand,
  vectorPostPic, // we will delete these obv
  vectorFeed,
} from "./assets/index";
import "./Profile.css";
import ProfileInfoBar from "./ProfileInfoBar";

export default function Profile({ sessionUser, setSessionUser }) {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  // const [sessionUser, setSessionUser] = useState(null);
  const [isOwnedProfile, setOwnedProfile] = useState(false);
  const [error, setError] = useState("");
  const [isEdited, setEdited] = useState(false);

  useEffect(() => {
    getUser(user_id).then((response) => {
      if (response.data.code === 200) {
        // success
        setUser(response.data.user);
        setSessionUser(JSON.parse(localStorage.getItem("user")) || null);
        setEdited(false);
        console.log("user refresh on setEdited: ", response.data.user);
      } else {
        setUser(null);
      }
    });
  }, [user_id, isEdited]);

  useEffect(() => {
    // console.log("users", user, sessionUser);
    if (user && sessionUser) {
      setOwnedProfile(parseInt(sessionUser.id) === parseInt(user.id));
      // console.log(isOwnedProfile);
    }
  }, [user, sessionUser, isOwnedProfile]);

  if (!user) {
    return (
      <div className="profileContainer">
        <LinearIndeterminate></LinearIndeterminate>
      </div>
    );
  }

  return (
    <div className="profileContainer">
      <ProfileHeader
        profileOwned={isOwnedProfile}
        sessionUser={sessionUser}
        user={user}
        setEdited={setEdited}
      ></ProfileHeader>

      <ProfileInfoBar
        user={user}
        sessionUser={sessionUser}
        profileOwned={isOwnedProfile}
        isEdited={isEdited}
        setEdited={setEdited}
      ></ProfileInfoBar>

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

// <IconButton
//   className="moreButton"
//   color="primary"
//   aria-label="upload picture"
//   component="span"
//   onClick={handleClick}
// >
//   <MoreHoriz style={{ color: "#F5F5F5" }} fontSize="large" />
// </IconButton>;

// var modal = document.getElementById("simpleModal");
// var modalBtn = document.getElementById("modalBtn");
// var closeBtn = document.getElementsByClassName("closeBtn")[0];

// modalBtn.addEventListener("click",openModal)

// closeBtn.addEventListener("click",closeModal)

// window.addEventListener("click",clickOutside)

// function openModal(){
//     modal.style.display = "flex";
// }

// function closeModal(){
//     modal.style.display = "none";
// }

// function clickOutside(e){
//     if(e.target === modal){
//         modal.style.display = "none";
//     }
// }
