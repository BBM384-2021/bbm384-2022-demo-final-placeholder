import React, { useState, useEffect } from "react";

import { getAllPostsOfUser } from "../../services/PostService";

import "./Profile.css";

export default function ProfileFeed({ user }) {
  const [userPosts, setUserPosts] = useState([]);

  //   const getUserPosts = () => {};

  useEffect(() => {
    getAllPostsOfUser(user.id)
      .then((response) => {
        if (response.data.code === 200) {
          console.log("post data:", response.data);
          //   setUserPosts(response.data)
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [user]);
  return (
    <div className="profileFeedContainer">
      {/* <div className="infoColumn"></div> */}
      <div className="feedColumn">
        {userPosts.map((data) => {
          return (
            <div>
              heyo
              {/* <p key={data.id}>post</p> */}
            </div>
          );
        })}

        <div className="postProfileIcon">
          <img /> <i className="bruh"></i>
        </div>
      </div>
    </div>
  );
}
