import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import CardPreview from "../commons/CardPreview";

import { getMainFeed } from "../../services/PostService";
import "./mainFeed.css";
import ContentCreateBar from "../commons/ContentCreateBar";
import PostCreateBox from "../posts/PostCreateBox";
import EventCreateBox from "../events/EventCreateBox";


export default function MainFeed({ user }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getMainFeed(user.id, setContents);
  }, [user.id]);

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);

  const onClickPostCreate = () => {
    setOpenCreatePost(true);
  }

  const onClickEventCreate = () => {
    setOpenCreateEvent(true);
  }

  return (
    <div className="feedContainer">
      <div style={{display: 'flex', justifyContent: 'space-between', cursor: "pointer"}}>
        <ContentCreateBar onClick={onClickPostCreate}>
          Create a post...
        </ContentCreateBar>
        <ContentCreateBar onClick={onClickEventCreate}>
          Create an event...
        </ContentCreateBar>
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


      <PostCreateBox
        open={openCreatePost}
        setOpen={setOpenCreatePost}
        user={user}
      />

      <EventCreateBox
          open={openCreateEvent}
          setOpen={setOpenCreateEvent}
          user={user}
      />

    </div>
  );
}
