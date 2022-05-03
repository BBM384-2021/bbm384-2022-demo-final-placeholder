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
          console.log(content.post.id);
          return (
            <>
              <CardPreview
                content={content}
                contentType={"post"}
                key={content.post.id}
                user={user}
              />
            </>
          );
        })}
    </div>
  );
}
