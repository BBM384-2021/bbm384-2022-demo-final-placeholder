import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import CardPreview from "../commons/CardPreview";

import { getMainFeed } from "../../services/PostService";
import "./mainFeed.css";

export default function MainFeed({ user }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getMainFeed(user.id, setContents);
  }, [user.id]);

  return (
    <div className="feedContainer">
      <div style={{}}>
        <h3 style={{ color: "#888888" }}>Main Feed</h3>
      </div>

      {contents.length > 0 &&
        contents.map((content) => {
          return (
            <div key={content.post.id}>
              <CardPreview
                className="cardContainer"
                content={content}
                contentType={"post"}
                id={content.post.id}
                user={user}
              />
            </div>
          );
        })}
    </div>
  );
}
