import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import {participateEvent } from "../../services/EventService";

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./eventCard.css";
import {convertMs2TimeString} from '../commons/Comment'
import {useState} from "react";


export default function EventCard({ content, contentType, user, key }) {

    const [eventStatus, setEventStatus] = useState(contentType);

    const handleAttendClick = () => {
        participateEvent(user.id, content.event.id).then(
            (response) =>{
                setEventStatus("attend")
                if(response.data.code === 200){
                    setEventStatus("going")
                    if((new Date(content.event.end_date) - new Date() >  0)){
                        setEventStatus("ended")
                    }
                }   
            }
        ).catch((error) => console.log(error))
    }

    return (
        <Box className="card">
            <CardHeader className="cardHeader"
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{variant:'span'}}
                title={content.event.event_body} //body
            />
            <CardContent className="cardContent">
                <div className="cardContentContainer">
                    <div className="cardPosterInfo">
                        <span> {content.user.full_name} posted</span>
                    </div>
                    <div className="cardContentButton">
                        <button className={eventStatus+"-button"} onClick={handleAttendClick}>
                            {eventStatus.toUpperCase()}
                        </button>

                        <span> {content.participants.length + 1} attending</span>
                    </div>
                </div>
            </CardContent>
            <div className="cardBottomContent">
                <span>
                    In {convertMs2TimeString(new Date(content.event.start_date) - new Date())}
                </span>

                <span>
                    {convertMs2TimeString(new Date() - new Date(content.event.event_share_date))}
                </span>
            </div>


        </Box>
    );
}
