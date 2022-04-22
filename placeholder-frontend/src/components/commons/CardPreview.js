import React from "react";
import { Card, Box, Typography, IconButton } from "@mui/material"
import ProfileBanner from "./ProfileBanner";
import { Colors } from "../../Colors"
import InteractionBar from "./InteractionBar";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { handleProfileBannerClick } from "../search-bar/SearchBar";

export default function CardPreview ( { content, contentType } )
{   
    return (
        <Card sx={{ height : '400px', margin : '10px', borderRadius:'10px', backgroundColor: Colors.whiteShaded}}>
            <Box style={{ margin: '20px 0px 10px 30px', width:'115vh', display: 'flex',
             flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{width:'60%', borderRadius: '25px'}}>
                    <ProfileBanner
                        withoutName={false}
                        withStatus={false}
                        user={content.user}
                        contentType={contentType}
                        onClick = {handleProfileBannerClick(content.user)}
                        key={"postAuthor"+content.post.id+content.user.id}
                    />
                </div>
                <IconButton sx={{height:'40px', width:'40px'}}>
                    <MoreHorizIcon />
                </IconButton>
            </Box>
            <Box style={{ margin: '20px 0px 0px 30px', borderRadius: '25px', minWidth:'100vh',
            width:'100vh', backgroundColor: Colors.white, boxShadow: '0px 3px 5px 0px ' + Colors.whiteShadow,
            height:'30vh', minHeight: '10vh', display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
                <Typography gutterBottom sx={{paddingLeft:'30px', paddingTop:'20px', fontFamily:'Poppins'}} align="left">
                {content.post.post_body}
                </Typography>
                <div style={{ display:'flex', justifyContent:'space-between', margin:'0px 20px 15px 30px'}}>
                    <strong>Files Attached (1)</strong>
                    <span style={{fontWeight:'100'}}>{content.post.post_share_date}</span>
                </div>
            </Box>
            <InteractionBar isFavorite/>

        </Card>
    );
}