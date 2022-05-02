import React, { useEffect, useState } from "react"
import { Box, Card } from "@mui/material"
import sendIcon from "../../img/paper-plane.png"
import "./commentBar.css"
import { Colors } from "../../Colors";
import CircularProgress from '@mui/material/CircularProgress';

export default function CommentBar ( {onClick, waitResponse} ) {
    const [commentInput, setCommentInput] = useState("");
    const handleCommentChange = (event) => {
        setCommentInput(event.target.value);
    };

    useEffect( () => {
        setCommentInput("");
    }, [waitResponse]);

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
                onChange={handleCommentChange} value={commentInput}
            />
            <button className="send-comment-button" onClick={onClick(commentInput)} disabled={waitResponse}>
                {waitResponse &&
                    <CircularProgress />
                }
                {!waitResponse &&
                    <img src={sendIcon} alt={"sendCommentIcon"}/>
                }  
            </button>
        </Box>
    );
};