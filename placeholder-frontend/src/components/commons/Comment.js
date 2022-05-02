import React, { useState } from "react"
import { Box, Card } from "@mui/material"
import ProfileBanner from "./ProfileBanner";
import "./comment.css"
import { Colors } from "../../Colors";

function convertMs2TimeString(time) {
    if (time / 1000 < 60) { // if less than a minute
        return Math.floor(time / 1000) + " seconds ago";
    } else if (time / (1000 * 60) < 60) { // if less than a hour
        return Math.floor(time / (1000 * 60)) + " minutes ago";
    } else if (time / (1000 * 60 * 60) < 24) { // if less than a day
        return Math.floor(time / (1000 * 60 * 60)) + " hours ago";
    } else {
        return Math.floor(time / (1000 * 60 * 60 * 24)) + " days ago";
    }
};


export default function Comment ( {comment, timeDiffMS} ) {
    
    return (
        <Box className="comment-box">
            <div 
                className="comment-profile-banner-wrapper"
            >
                <ProfileBanner 
                    withoutName={false}
                    contentType={"comment"}
                    user={comment.user}
                    status={convertMs2TimeString(timeDiffMS)}
                />
            </div>
            <p>
                {comment.comment.body}
            </p>
        </Box>
    );
};