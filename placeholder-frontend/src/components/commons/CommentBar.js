import React, { useState } from "react"
import { Box, Card } from "@mui/material"
import sendIcon from "../../img/paper-plane.png"
import "./commentBar.css"
import { Colors } from "../../Colors";

export default function CommentBar ( {} ) {

    const [commentInput, setCommentInput] = useState("");
    const handleCommentChange = (event) => {
        setCommentInput(event.target.value);
    };

    return (
        <Box sx={{ 
            boxShadow: '0px 3px 5px 0px ' + Colors.whiteShadow,
            borderRadius: '25px',
            backgroundColor: Colors.white,
            width: '60vw',
            margin: '20px 20px 20px 30px',
            fontFamily: 'Poppins',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            }}>
            <textarea className="comment-bar-input" maxLength={1000} placeholder={"Post a comment"}
                onChange={handleCommentChange}
            />
            <button className="send-comment-button">
                <img src={sendIcon} alt={"sendCommentIcon"}/>
            </button>
        </Box>
    );
};