import { ImageSearch } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

import CardPreview from "../commons/CardPreview";
import "./Profile.css";

export default function ProfileFeed({ user, userPosts, sessionUser }) {
  return (
    <div className="profileFeedContainer">
      {/* <div className="infoColumn"></div> */}
      <div className="feedColumn">
        {userPosts.length > 0 ? (
          userPosts.map((data) => {
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
          })
        ) : (
          <div
            style={{
              marginTop: "150px",
              justifyContent: "center",
            }}
          >
            <h2>
              <ImageSearch></ImageSearch> No Posts to See Yet
            </h2>
          </div>
        )}

        <div className="postProfileIcon">
          <img /> <i className="bruh"></i>
        </div>
      </div>
    </div>
  );
}
