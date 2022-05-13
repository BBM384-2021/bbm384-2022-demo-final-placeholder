import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Modal } from "@mui/material";
import { Colors } from "../../Colors";
import InteractionBar from "./InteractionBar";
import "./cardPreview.css";
import CardView from "./CardView";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import CardTagBar from "./CardTagBar";
import { getPost } from "../../services/PostService";

function isUserLikedPost(likeArray, userID) {
  for (let i = 0; i < likeArray.length; i++) {
    if (likeArray[i].like.user_id === userID) {
      return true;
    }
  }
  return false;
}

export default function CardPreview({ content, contentType, user, key }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [stateContent, setStateContent] = useState(content);
  const [isRefresh, setIsRefresh] = useState(false);
  const [interactionContent, setInteractionContent] = useState({
    likeArray: content.likes,
    isLiked: isUserLikedPost(content.likes, user.id),
    likeCount: content.likes.length,
    commentCount: content.comments.length,
  });

  useEffect(() => {
    const finishRefreshContent = () => {
      setIsRefresh(false);
    };
    if (isRefresh) {
      getPost(stateContent.post.id, setStateContent, finishRefreshContent);
    }
  }, [isRefresh]);

  return (
    <Card
      id={key}
      sx={{
        // maxHeight: "420px",
        margin: "10px",
        borderRadius: "10px",
        backgroundColor: Colors.whiteShaded,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardTitle 
        content={stateContent}
        contentType={contentType}
        enablePostOptions={content.user.id === user.id || user.user_type == 0}
        setIsRefresh={setIsRefresh}
        />
      <CardTagBar tags={content.tags} content_id={content.post.id}/>
      <CardContent
        content={stateContent}
        enableShortView={true}
        handleModalOpen={handleOpen}
      />
      <InteractionBar
        content={interactionContent}
        setContent={setInteractionContent}
        user={user}
        post_id={stateContent.post.id}
        setOpen={setOpen}
      />

      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <>
          <CardView
            contentType={contentType}
            content={stateContent}
            setContent={setStateContent}
            user={user}
            interactionContent={interactionContent}
            setInteractionContent={setInteractionContent}
            setIsRefresh={setIsRefresh}
          />
        </>
      </Modal>
    </Card>
  );
}
