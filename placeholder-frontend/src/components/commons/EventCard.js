import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import {cancelParticipation, deleteEvent, participateEvent} from "../../services/EventService";

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./eventCard.css";
import {useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import EventCreateBox from "../events/EventCreateBox";

function convertMs2TimeString(time) {
    if (time / 1000 < 60) {
        // if less than a minute
        return " less than a min";
    } else if (time / (1000 * 60) < 60) {
        // if less than a hour
        return Math.floor(time / (1000 * 60)) + " minutes";
    } else if (time / (1000 * 60 * 60) < 24) {
        // if less than a day
        return Math.floor(time / (1000 * 60 * 60)) + " hours";
    } else {
        return Math.floor(time / (1000 * 60 * 60 * 24)) + " days";
    }
}

export default function EventCard({ content, contentType, user, isEventOver}) {

    const [eventStatus, setEventStatus] = useState(isEventOver?"ended":contentType);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        if (content.user.id === user.id || user.user_type == 0) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveClick = () => {
        deleteEvent(content.event.id)
            .then((response) => {
                if (response.data.code === 200) {
                    // request succesfull
                }
            }).catch( (error) => console.log(error))
    }

    const [openEditPost, setOpenEditPost] = useState(false);

    const handleAttendClick = () => {
        if(eventStatus === "attend"){
            participateEvent(user.id, content.event.id).then(
                (response) =>{
                    if(response.data.code === 200){
                        setEventStatus("going")
                    }
                }
            ).catch((error) => console.log(error))
        }else{
            cancelParticipation(user.id, content.event.id).then(
                (response) =>{
                    if(response.data.code === 200){
                        setEventStatus("attend")
                    }
                }
            ).catch((error)=> console.log(error))
        }
    }

    return (
        <Box className="card">
            <CardHeader className="cardHeader"
                action={(user.id === content.user.id || user.user_type<1) &&
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{variant:'span'}}
                title={content.event.event_body} //body
                //subtitle
                subheaderTypographyProps={{variant:'span'}}
                subheader={content.event.event_location}
            />
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                >
                <MenuItem onClick={()=>{setOpenEditPost(true); handleClose()}}>Edit</MenuItem>
                <MenuItem onClick={()=>{handleRemoveClick(); handleClose()}}>Delete</MenuItem>
            </Menu>
            {openEditPost &&
                <EventCreateBox
                    open={openEditPost}
                    setOpen={setOpenEditPost}
                    user={content.user}
                    isEdit={true}
                    content={content}
                >
                    {"Edit"+ content.user.full_name + "'s post"}
                </EventCreateBox>}

            <CardContent className="cardContent">
                <div className="cardContentContainer">
                    <div className="cardPosterInfo">
                        <span> {content.user.full_name} posted</span>
                    </div>
                    <div className="cardContentButton">
                        <button disabled={isEventOver} className={eventStatus+"-button"} onClick={handleAttendClick}>
                            {eventStatus.toUpperCase()}
                        </button>

                        <span> {content.participants.length + 1} attending</span>
                    </div>
                </div>
            </CardContent>
            <div className="cardBottomContent">
                {!isEventOver &&
                    <span>
                    In {convertMs2TimeString(new Date(content.event.start_date) - new Date())}
                    </span>
                }
                <span>
                    {convertMs2TimeString(new Date() - new Date(content.event.event_share_date))} ago
                </span>
            </div>


        </Box>
    );
}
