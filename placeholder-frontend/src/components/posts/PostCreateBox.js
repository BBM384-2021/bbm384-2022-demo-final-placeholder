import { Modal, IconButton } from "@mui/material";
import React, {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import sendIcon from "../../img/paper-plane.png"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TagSelectionBar from "./TagSelectionBar";
import "./postCreateBox.css"
import { getAllTags } from "../../services/TagService";

export default function PostCreateBox ( {user, open, setOpen} ) {
    const [postContent, setPostContent] = useState("");
    const [tags, setTags] = useState({});
    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    useEffect(()=>{
        if (open) {
            const interpretResult = (result) => {
                let allTags = {};
                for (let i = 0; i < result.length; i++)
                {
                    allTags[result[i].id] = {
                        isSelected: false,
                        tagName: result[i].tag_name
                    };
                }
                setTags(allTags);
            };
            getAllTags(interpretResult);
        }
    }, [open])

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
                <TagSelectionBar 
                    tags={tags}
                    setTags={setTags}
                />
                <hr/>
                <div className="post-config-bar">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton>
                            <AddPhotoAlternateIcon fontSize="large"/>
                        </IconButton>
                        <p style={{marginLeft: '10px'}}>
                            No file is attached
                        </p>
                    </div>

                    <IconButton className="send-post-button" onClick={() => console.log(postContent)}>
                        <img
                        src={sendIcon} alt="post-send-icon" style={{height:'24px'}}
                        />
                    </IconButton>
                </div>
            </div>
        </Modal>
    );
}