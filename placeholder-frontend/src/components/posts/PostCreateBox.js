import { Modal, IconButton } from "@mui/material";
import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import sendIcon from "../../img/paper-plane.png"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import "./postCreateBox.css"

export default function PostCreateBox ( {user, open, setOpen} ) {
    const [postContent, setPostContent] = useState("");
    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };


    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            sx={{overflow:"scroll"}}
        >
            <div className="post-create-container">
                <div className="post-create-header">
                    <div className="post-create-header-inner">
                        <img 
                            className="post-create-header-profile-pic"
                            src={user.profile_pic_path}
                            alt="user-profile-picture"
                        />
                        <p>Create a post</p>
                    </div>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <hr />
                <textarea className="post-content-input" maxLength={1000} placeholder={"Type something..."}
                    onChange={handlePostChange} value={postContent}/>
                <hr />
                <div className="post-config-bar">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton>
                            <AddPhotoAlternateIcon fontSize="large"/>
                        </IconButton>
                        <p style={{marginLeft: '10px'}}>
                            No file is attached
                        </p>
                    </div>

                    <IconButton>
                        <img className="send-post-button"
                        src={sendIcon} alt="post-send-icon"
                        onClick={() => console.log(postContent)}
                        />
                    </IconButton>
                </div>
            </div>
        </Modal>
    );
}