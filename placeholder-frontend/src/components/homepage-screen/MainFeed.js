import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import CardPreview from "../commons/CardPreview";

import { getMainFeed } from "../../services/PostService";
import "./mainFeed.css";
import ContentCreateBar from "../commons/ContentCreateBar";
import PostCreateBox from "../posts/PostCreateBox";
import TagFilter from "../commons/TagFilter";

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

  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="feedContainer">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <ContentCreateBar onClick={onClickPostCreate}>
          Create a post...
        </ContentCreateBar>
        <ContentCreateBar onClick={onClickEventCreate}>
          Create an event...
        </ContentCreateBar>
      </div>
      <TagFilter setSelectedTags={setSelectedTags}/>
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
        isEdit={false}
        content={null}
        setIsRefresh={undefined}
      >
        Create a post
      </PostCreateBox>
    </div>
  );
}
