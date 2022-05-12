import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import CardPreview from "../commons/CardPreview";

import { getMainFeed } from "../../services/PostService";
import "./mainFeed.css";
import ContentCreateBar from "../commons/ContentCreateBar";
import PostCreateBox from "../posts/PostCreateBox";
import TagFilter from "../commons/TagFilter";
import EventCreateBox from "../events/EventCreateBox";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, LinearProgress } from "@mui/material";

export default function MainFeed({ user , sessionUser, setSessionUser }) {
  const [contents, setContents] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isWaitResponse, setIsWaitResponse] = useState(false);

  useEffect(() => {
    getMainFeed(user.id, setContents, selectedTags, setIsWaitResponse);
    setIsRefresh(false);
  }, [user.id, selectedTags, isRefresh]);



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
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <ContentCreateBar onClick={onClickPostCreate}>
          Create a post...
        </ContentCreateBar>
          {parseInt(sessionUser.user_type) < 3 && (
              <ContentCreateBar onClick={onClickEventCreate}>
                  Create an event...
              </ContentCreateBar>
          )}

      </div>
      <div className="feed-option-container">
        <div className="feed-option-container-child"> 
          <h4>Main Feed</h4>
          <IconButton sx={{marginLeft:'10px'}} onClick={() => {setIsRefresh(true); setIsWaitResponse(true);}}>
            <HomeIcon />
          </IconButton>
        </div>
        
        <TagFilter setSelectedTags={setSelectedTags} isRefresh={isRefresh}/>
      </div>
      {isWaitResponse ?
        <LinearProgress />
        :
        <>
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
        </> 
      }
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
        {parseInt(sessionUser.user_type) < 3 && (
            <EventCreateBox
                open={openCreateEvent}
                setOpen={setOpenCreateEvent}
                user={user}
                isEdit={false}
                content={null}
                setIsRefresh={undefined}
            />
        )}
    </div>
  );
}
