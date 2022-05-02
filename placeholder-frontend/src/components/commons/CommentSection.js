import React, { useState } from "react"
import { Box, Card } from "@mui/material"
import sendIcon from "../../img/paper-plane.png"
import CommentBar from "./CommentBar";
import Comment from "./Comment";
import { Colors } from "../../Colors";

export default function CommentSection ( {comments} ) {
    return (
        <div>
            <CommentBar />
            <div>
                {comments.length > 0 &&
                    comments.map((comment) => {
                        console.log(comment);
                        return (
                            <Comment
                                comment={comment}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};