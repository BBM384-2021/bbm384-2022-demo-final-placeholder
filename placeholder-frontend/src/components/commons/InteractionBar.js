import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { IconButton } from "@mui/material";
import "./InteractionBar.css";
import { postLike, deleteLike } from "../../services/PostService";

function isUserLikedPost(likeArray, userID) {
  for (let i = 0; i < likeArray.length; i++) {
    if (likeArray[i].like.user_id === userID) {
      return true;
    }
  }
  return false;
}

export default function InteractionBar ( {content, setContent, post_id, curr_user_id, setOpen} )
{    
    const [likeLock, setLikeLock] = useState(false);

    const onLikeClick = () => {
        if (likeLock) {
            console.log("Waiting for server response before sending another like post");
            return;
        }
        setLikeLock(true);

        setContent({
            ...content,
            "isLiked" : !content.isLiked,
            "likeCount" : !content.isLiked ? content.likeCount + 1 : content.likeCount - 1
        });
        if (!content.isLiked) {
            console.log("like is sended to the backend!");
            postLike(curr_user_id, post_id, setLikeLock);
        } else {
            console.log("like is taken from the backend");
            deleteLike(curr_user_id, post_id, setLikeLock);
        }
        
    };

    return (
        <div className="interaction-bar-row" style={{display: 'flex', flexDirection: 'row', marginLeft:'30px',
        fontFamily: 'Poppins'}}>
            <div>
                <IconButton
                    onClick={onLikeClick}
                    variant="contained">
                    {content.isLiked && 
                        <FavoriteIcon htmlColor="red"/>
                    }
                    {!content.isLiked &&
                        <FavoriteBorderIcon />
                    }
                </IconButton>
                {content.likeCount}
            </div>

            <div>
                <IconButton
                    disabled={setOpen===undefined}
                    onClick={setOpen}>
                    <ModeCommentIcon />
                </IconButton>
                {content.commentCount}
            </div>

        </div>
    );
}
