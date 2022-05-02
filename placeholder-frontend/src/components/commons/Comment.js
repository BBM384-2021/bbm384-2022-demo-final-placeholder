import React, { useState } from "react"
import { Box, Card } from "@mui/material"
import ProfileBanner from "./ProfileBanner";
import "./comment.css"
import { Colors } from "../../Colors";




export default function Comment ( {comment} ) {
    return (
        <Box className="comment-box">
            <div 
                className="comment-profile-banner-wrapper"
            >
                <ProfileBanner 
                    withoutName={false}
                    withStatus={true}
                    contentType={"comment"}
                    user={comment.user}
                />
            </div>
            <p>
                {comment.comment.body}
            </p>
        </Box>
    );
};