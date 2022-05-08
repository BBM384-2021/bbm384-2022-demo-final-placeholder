import { IconButton, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./tagManagementBox.css"
import { getAllTags } from "../../services/TagService";
import TagEntry from "./TagEntry";
import CloseIcon from '@mui/icons-material/Close';

export default function TagManagementBox ( {open, setOpen} ) {
    const [tags, setTags] = useState([]);
    const [isRefresh, setIsRefresh] = useState(true);
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
            <div className="tag-new-button">
                Add New Tag
            </div>
            
            <div className="tag-management-table">
                <div className="tag-table-headers">
                    <h3>Tag ID</h3>
                    <h3>Tag Name</h3>
                    <h3>Tag Options</h3>
                </div>
                <hr/>
                {tags.length > 0 &&
                    tags.map((tag_i) => <TagEntry
                                            tag={tag_i}
                                            key={"tagManag" + tag_i.id}
                                            setIsRefresh={setIsRefresh}
                                            />)
                }
            </div>
        </div>
    </Modal>
    );
};