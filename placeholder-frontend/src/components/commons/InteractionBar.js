import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { IconButton } from "@mui/material";
import "./InteractionBar.css"
import { postLike, deleteLike } from "../../services/PostService";

function isUserLikedPost ( likeArray, userID ) {
    for (let i = 0; i < likeArray.length; i++)
    {
        if ( likeArray[i].like.user_id === userID )
        {
            return true;
        }
    }
    return false;
}

export default function InteractionBar ( {content, curr_user_id} )
{
    const [likeObj, setLike] = useState({
        "isLiked" : isUserLikedPost(content.likes, curr_user_id),
        "likeCount" : content.likes.length});
    
    const [likeLock, setLikeLock] = useState(false);

    const onLikeClick = () => {
        if (likeLock) {
            console.log("Waiting for server response before sending another like post");
            return;
        }
        setLikeLock(true);

        setLike({
            "isLiked" : !likeObj["isLiked"],
            "likeCount" : !likeObj["isLiked"] ? likeObj.likeCount + 1 : likeObj.likeCount - 1
        });
        if (!likeObj["isLiked"]) {
            console.log("like is sended to the backend!");
            postLike(curr_user_id, content.post.id, setLikeLock);
        } else {
            console.log("like is taken from the backend");
            deleteLike(curr_user_id, content.post.id, setLikeLock);
        }
        
    };

    return (
        <div className="interaction-bar-row" style={{display: 'flex', flexDirection: 'row', marginLeft:'30px'}}>
            <div>
                <IconButton
                    onClick={onLikeClick}
                    variant="contained">
                    {likeObj.isLiked && 
                        <FavoriteIcon htmlColor="red"/>
                    }
                    {!likeObj.isLiked &&
                        <FavoriteBorderIcon />
                    }
                </IconButton>
                {likeObj.likeCount}
            </div>

            <div>
                <IconButton>
                    <ModeCommentIcon />
                </IconButton>
                {content.comments.length}
            </div>

        </div>
    );
}