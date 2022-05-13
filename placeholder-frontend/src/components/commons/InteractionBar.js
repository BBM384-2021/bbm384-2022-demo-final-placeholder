import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { IconButton } from "@mui/material";
import "./InteractionBar.css";
import { postLike, deleteLike } from "../../services/PostService";
import LikesModal from "../posts/LikesModal";

function isUserLikedPost(likeArray, userID) {
  for (let i = 0; i < likeArray.length; i++) {
    if (likeArray[i].like.user_id === userID) {
      return true;
    }
  }
  return false;
}

export default function InteractionBar({
  content,
  setContent,
  post_id,
  user,
  setOpen,
}) {
  const [likeLock, setLikeLock] = useState(false);
  const [openLikesPopup, setOpenLikesPopup] = useState(false);

  const onLikeClick = () => {
    if (likeLock) {
      alert(
        "Please Wait While We Save Your Like!\n Spamming buttons might result with data losses"
      );
    
      return;
    }
    setLikeLock(true);

    const newLikeArray = [...content.likeArray];
    if (!content.isLiked) {
      newLikeArray.push({
        "like" : {
          "id" : post_id,
          "user_id" : user.id
        },
        "user" : user
      })
    } else {
      const likeIndex = newLikeArray.findIndex( (elem) => elem.like.user_id === user.id );
      newLikeArray.splice(likeIndex, 1)
    }

    setContent({
      ...content,
      isLiked: !content.isLiked,
      likeCount: !content.isLiked
        ? content.likeCount + 1
        : content.likeCount - 1,
      likeArray: [...newLikeArray]
    });
    if (!content.isLiked) {
      postLike(user.id, post_id, setLikeLock);
    } else {
      deleteLike(user.id, post_id, setLikeLock);
    }
  };

  return (
    <div
      className="interaction-bar-row"
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "30px",
        fontFamily: "Poppins",
      }}
    >
      <div>
        <IconButton onClick={onLikeClick} variant="contained">
          {content.isLiked && <FavoriteIcon htmlColor="red" />}
          {!content.isLiked && <FavoriteBorderIcon />}
        </IconButton>
        {content.likeCount > 0 ?
          <u onClick={()=>setOpenLikesPopup(true)} className="like-count">{content.likeCount}</u>
          :
          <>{content.likeCount}</>
        }
        <LikesModal 
          open={openLikesPopup}
          setOpen={setOpenLikesPopup}
          likes={content.likeArray}
        />
      </div>

      <div>
        <IconButton disabled={setOpen === undefined} onClick={() => setOpen(true)}>
          <ModeCommentIcon />
        </IconButton>
        {content.commentCount}
      </div>
    </div>
  );
}
