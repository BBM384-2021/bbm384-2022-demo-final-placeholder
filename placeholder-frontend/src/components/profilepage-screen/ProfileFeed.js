import React, { useState, useEffect } from "react";

import { getAllPostsOfUser } from "../../services/PostService";
import CardPreview from "../commons/CardPreview";
import "./Profile.css";

export default function ProfileFeed({ user }) {
  const [userPosts, setUserPosts] = useState([]);

  //   const getUserPosts = () => {};

  useEffect(() => {
    getAllPostsOfUser(user.id)
      .then((response) => {
        if (response.data.code === 200) {
          console.log("post data:", response.data);
          setUserPosts(response.data.allPosts);
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
            <div key={data.post.id}>
              <CardPreview
                className="cardContainer"
                content={data}
                contentType={"post"}
                id={data.post.id}
                user={user}
              />
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
