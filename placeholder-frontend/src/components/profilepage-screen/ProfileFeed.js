import React, { useState, useEffect } from "react";

import CardPreview from "../commons/CardPreview";
import "./Profile.css";


export default function ProfileFeed({ user, userPosts, sessionUser }) {

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
                user={sessionUser}
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
