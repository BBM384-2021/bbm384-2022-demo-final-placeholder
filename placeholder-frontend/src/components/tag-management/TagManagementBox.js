import { IconButton, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./tagManagementBox.css"
import { getAllTags, createTag } from "../../services/TagService";
import TagEntry from "./TagEntry";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import { Collapse } from "@mui/material";

export default function TagManagementBox ( {open, setOpen} ) {
    const [tags, setTags] = useState([]);
    const [isRefresh, setIsRefresh] = useState(true);
    const [isAddNew, setIsAddNew] = useState(false);
    const [waitResponse, setWaitResponse] = useState(false);
    const [newTagName, setNewTagName] = useState("");

    useEffect(
        () => {
            if (isRefresh) {
                getAllTags().then(
                    (response) => {
                        if (response.data.code === 200) {
                            // request succesful
                            setTags(response.data.allTags)
                        } else {
                            console.log(response);
                        }
                        setIsRefresh(false);
                    }
                ).catch( (error) => console.log(error) )
            }
    }, [isRefresh])

    const handleAddNewClick = () => {
        if (isAddNew) {
            setWaitResponse(true);
            setIsAddNew(false);
            createTag(newTagName).then(
                (response) => {
                    if (response.data.code === 200) {
                        setIsRefresh(true);
                        setNewTagName("");
                    } else {
                        console.log(response);
                    }
                    setWaitResponse(false);
                }
            )
        } else {
            setIsAddNew(true);
        }
    }

    const handleTagInput = (event) => {
        setNewTagName(event.target.value);
    }

    return (
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        sx={{overflow:'scroll'}}
    >
        <div className="tag-management-container">
            <div className="tag-management-header">
                <h1>Tag Management Screen</h1>
                <IconButton sx={{height:'fit-content'}} onClick={()=>setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <button 
                    className={"tag-new-button" + (isAddNew ? " active" : "")}
                    onClick={handleAddNewClick}
                    disabled={waitResponse}
                >
                {!waitResponse ?
                    <>
                    <p>Add New Tag</p>
                        {isAddNew ?
                            <DoneIcon sx={{marginLeft:'5px'}}/>
                            :
                            <AddIcon sx={{marginLeft:'5px'}}/>
                        }
                    </>
                    :
                    <CircularProgress style={{color:'black'}}size={20}/>
                }

                </button>
                <Collapse in={isAddNew} orientation={'horizontal'} 
                sx={{ maxHeight:'40px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <input 
                            style={{height:'80%', borderRadius:'5px', borderStyle:'solid',
                                marginLeft:'10px', fontSize:'23px', width:'200px', fontWeight:'300'}}
                                onChange={handleTagInput}
                            placeholder="Enter tag name..." 
                            value={newTagName}>
                        </input>
                        <IconButton onClick={()=>{setNewTagName(""); setIsAddNew(false)}}>
                            <CancelIcon htmlColor="red"/>
                        </IconButton>
                    </div>
                </Collapse>
            </div>
            <div className="tag-management-table">
                <div className="tag-table-headers">
                    <h3>Tag ID</h3>
                    <h3>Tag Name</h3>
                    <h3>Tag Options</h3>
                </div>
                <hr/>
                <div style={{height: '50vh', overflow: 'scroll'}}>
                    {tags.length > 0 &&
                        tags.map((tag_i) => <TagEntry
                                                tag={tag_i}
                                                key={"tagManag" + tag_i.id}
                                                setIsRefresh={setIsRefresh}
                                                />)
                    }
                </div>

            </div>
        </div>
    </Modal>
    );
};