import { Modal, IconButton } from "@mui/material";
import React, {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import sendIcon from "../../img/paper-plane.png"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TagSelectionBar from "./TagSelectionBar";
import "./postCreateBox.css"
import { getAllTags } from "../../services/TagService";
import { addPost } from "../../services/PostService";
import CircularProgress from '@mui/material/CircularProgress';

export default function PostCreateBox ( {user, open, setOpen} ) {
    const [postContent, setPostContent] = useState("");
    const [tags, setTags] = useState({});
    const [fileDesc, setFileDesc] = useState("No file is attached")
    
    const [waitResponse, setWaitResponse] = useState(false);
    const [noTagError, setNoTagError] = useState(false);

    const onPostCreateClick = () => {
        setWaitResponse(true);
        const attachment = fileDesc === "No file is attached" ? null : fileDesc;
        let selectedTags = [];
        for (const [id, values] of Object.entries(tags)) {
            if (values.isSelected) {
                selectedTags.push(id);
            }
        }
        
        if (selectedTags.length === 0) {
            setNoTagError(true);
            setWaitResponse(false);
            return;
        }

        addPost(user.id, postContent, attachment, selectedTags).then(
            (response) => {
                if (response.data.code === 200) {
                    setOpen(false);
                    setPostContent("");
                }
                setWaitResponse(false);
                
            }
        ).catch( (error) => console.log(error) )
    }

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };
    
    useEffect(()=>{
        if (open) {
            // get all tags available for posts
            getAllTags().then((response) => {
                if (response.data.code === 200) {
                    const result = response.data.allTags;
                    let allTags = {};
                    for (let i = 0; i < result.length; i++)
                    {
                        allTags[result[i].id] = {
                            isSelected: false,
                            tagName: result[i].tag_name
                        };
                    }
                    setTags(allTags);
                }
            });
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
                {noTagError &&
                    <p style={{color:'red'}}>YOU MUST SELECT AT LEAST ONE TAG!!121!</p>
                }
                <TagSelectionBar 
                    tags={tags}
                    setTags={setTags}
                    setNoTagError={setNoTagError}
                />
                <hr/>
                <div className="post-config-bar">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton>
                            <AddPhotoAlternateIcon fontSize="large"/>
                        </IconButton>
                        <p style={{marginLeft: '10px'}}>
                            {fileDesc}
                        </p>
                    </div>

                    {waitResponse ?
                        <CircularProgress />
                        :
                        <IconButton className="send-post-button" onClick={onPostCreateClick}>
                            <img
                            src={sendIcon} alt="post-send-icon" style={{height:'24px'}}
                            />
                        </IconButton>
                    }

                </div>
            </div>
        </Modal>
    );
}