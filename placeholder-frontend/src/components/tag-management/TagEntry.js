import { IconButton } from "@mui/material";
import React, { useState } from "react";
import "./tagEntry.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import { updateTag, deleteTag } from "../../services/TagService";

export default function TagEntry ({tag, setIsRefresh}) {
    const [isEdit, setIsEdit] = useState(false);
    const [waitResponse, setWaitResponse] = useState(false);
    const [editInput, setEditInput] = useState(tag.tag_name);

    const handleInputChange = (event) => {
        setEditInput(event.target.value);
    }

    const onEditClick = () => {
        setIsEdit(true);
    }
    const handleDeleteClick = () => {
        setWaitResponse(true);
        deleteTag(tag.id).then(
            (response) => {
                if (response.data.code === 200) { // on success
                    setIsRefresh(true);
                } else {
                    console.log(response);
                }
                setWaitResponse(false);
            }
        ).catch( (error) => console.log(error) )
    }

    const handleEditDoneClick = () => {
        setWaitResponse(true);
        updateTag(tag.id, editInput).then(
            (response) => {
                if (response.data.code === 200) { // on success
                    setIsRefresh(true);
                } else {
                    console.log(response);
                }
                setWaitResponse(false);
                setIsEdit(false);
            }
        ).catch( (error) => console.log(error) )    
    }

    const handleEditCancelClick = () => {
        setIsEdit(false);
        setEditInput(tag.tag_name);
    }

    return (
        <>
            <div className="tag-entry">
                <p>{tag.id}</p>
                {isEdit ?
                    <input onChange={handleInputChange} value={editInput} placeholder="Edit tag name"/>
                    :
                    <p>{tag.tag_name}</p>
                }
                <div className="tag-options">
                {isEdit ?
                    <>
                        <IconButton onClick={handleEditDoneClick} disabled={waitResponse}>
                            {waitResponse ?
                                <CircularProgress />
                                :
                                <DoneIcon htmlColor="green"/>
                            }
                        </IconButton>
                        <IconButton onClick={handleEditCancelClick}>
                            <CancelIcon htmlColor="red"/>
                        </IconButton>
                    </>
                    :
                    <>
                        <IconButton onClick={onEditClick}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={handleDeleteClick} size={'small'} disabled={waitResponse}>
                            {waitResponse ?
                                    <CircularProgress size={20}/>
                                    :
                                    <DeleteIcon />
                            }
                        </IconButton>
                    </>
                }
                </div>
            </div>
            <hr className="entry-line"/>
        </>

    );
};