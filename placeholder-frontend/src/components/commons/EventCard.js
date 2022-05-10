import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import profilePic from '../profilepage-screen/assets/1.png'
import "./eventCard.css";
import Box from "@mui/material/Box";


export default function EventCard() {

    return (
        <Box className="card">
            <CardHeader className="cardHeader"
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Desmin Alpaslan posted" //body
            />
            <CardContent className="cardContent">
                <div className="cardContentContainer">
                    <Typography variant="body2" fontFamily="Poppins" fontSize="15px" color="text.secondary">
                        meeting this afternoon, zoom link
                    </Typography>
                    <div className="cardContentButton">
                        <box className="attend-button">
                            <span>ATTEND</span>
                        </box>
                        <span>23 attending</span>
                    </div>
                </div>
            </CardContent>


        </Box>
    );
}
