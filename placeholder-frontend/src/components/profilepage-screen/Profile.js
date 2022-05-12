import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getUser } from "../../services/UserService";
import LinearIndeterminate from "../commons/LinearIndeterminateLoading";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoBar from "./ProfileInfoBar";
import ProfileFeed from "./ProfileFeed";

import "./Profile.css";

export default function Profile({ sessionUser, setSessionUser }) {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  // const [sessionUser, setSessionUser] = useState(null);
  const [isOwnedProfile, setOwnedProfile] = useState(false);
  const [error, setError] = useState("");
  const [isEdited, setEdited] = useState(false);

  useEffect(() => {
    setSessionUser(JSON.parse(localStorage.getItem("user")) || sessionUser);
    setEdited(false);
  }, [user, isEdited, isOwnedProfile]);

  useEffect(() => {
    getUser(user_id).then((response) => {
      if (response.data.code === 200) {
        // success
        setUser(response.data.user);
        setSessionUser(JSON.parse(localStorage.getItem("user")) || null);
        setEdited(false);
      } else {
        setUser(null);
      }
    });
  }, [user_id]);

  useEffect(() => {
    if (user && sessionUser) {
      setOwnedProfile(parseInt(sessionUser.id) === parseInt(user.id));
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
        setUser={setUser}
        setEdited={setEdited}
      ></ProfileHeader>
      <ProfileInfoBar
        user={user}
        setUser={setUser}
        sessionUser={sessionUser}
        profileOwned={isOwnedProfile}
        isEdited={isEdited}
        setEdited={setEdited}
      ></ProfileInfoBar>

      <ProfileFeed user={user} sessionUser={sessionUser}></ProfileFeed>
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
