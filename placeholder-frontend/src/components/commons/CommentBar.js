import React, { useEffect, useState } from "react"
import { Box, Card } from "@mui/material"
import sendIcon from "../../img/paper-plane.png"
import "./commentBar.css"
import { Colors } from "../../Colors";
import CircularProgress from '@mui/material/CircularProgress';

export default function CommentBar ( {onClick, waitResponse} ) {
    const [noCommentError, setNoCommentError] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const handleCommentChange = (event) => {
        setNoCommentError(false);
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
            {noCommentError &&
                <p style={{color:'red', fontWeight:'600'}}>Comments can not be empty</p>
            }
            <textarea className="comment-bar-input" maxLength={1000} placeholder={"Post a comment"}
                onChange={handleCommentChange} value={commentInput}
            />
            <button className="send-comment-button" onClick={onClick(commentInput)} disabled={waitResponse}>
                {waitResponse ?
                    <CircularProgress />
                    :
                    <img src={sendIcon} alt={"sendCommentIcon"}/>
                }
            </button>
        </Box>
    );
};