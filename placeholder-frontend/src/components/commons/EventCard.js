import * as React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./eventCard.css";

export default function EventCard({ content, contentType, user, key }) {

    return (
        <Box className="card">
            <CardHeader className="cardHeader"
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{variant:'span'}}
                title="BBM3131 Discussion" //body
            />
            <CardContent className="cardContent">
                <div className="cardContentContainer">
                    <div className="cardPosterInfo">
                        <span>Selman Kahya posted</span>
                    </div>
                    <div className="cardContentButton">
                        <button className="attend-button">
                            ATTEND
                        </button>
                        <button className="going-button">
                            GOING
                        </button>
                        <button className="going-button">
                            GOING
                        </button>
                        <span> 23 attending</span>
                    </div>
                </div>
            </CardContent>
            <div className="cardBottomContent">
                <span>
                    Starting in 18 hours
                </span>

                <span>
                    Today
                </span>
            </div>


        </Box>
    );
}
