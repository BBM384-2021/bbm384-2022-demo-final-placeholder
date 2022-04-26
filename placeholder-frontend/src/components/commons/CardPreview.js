import React, { createRef, useLayoutEffect, useState } from "react";
import { Card, Box, Typography, IconButton } from "@mui/material"
import ProfileBanner from "./ProfileBanner";
import { Colors } from "../../Colors"
import InteractionBar from "./InteractionBar";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { handleProfileBannerClick } from "../search-bar/SearchBar";
import "./cardPreview.css"

const textLengthLimit = 650;

export default function CardPreview ( { content, contentType, user } )
{
    const refText = createRef();
    const [showMore, setShowMore] = useState(false);

    useLayoutEffect( () => {
        if (refText.current.clientHeight < refText.current.scrollHeight) {
            setShowMore(true);
        }
    }, [refText])

    return (
        <Card sx={{ height:'420px', margin : '10px', borderRadius:'10px', backgroundColor: Colors.whiteShaded,
        display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
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
                <IconButton sx={{height:'40px', width:'40px', marginRight:'20px'}}>
                    <MoreHorizIcon />
                </IconButton>
            </Box>
            <Box style={{ margin: '20px 0px 0px 30px', borderRadius: '25px',
            width:'50vw', backgroundColor: Colors.white, boxShadow: '0px 3px 5px 0px ' + Colors.whiteShadow,   
            display:'flex', justifyContent:'space-between', flexDirection:'column', position:'relative',
            height:'60%'}}>
                <div style={{ height:'80%', overflow:'hidden'}} ref={refText}>
                    <Typography gutterBottom sx={{paddingLeft:'30px', paddingRight:'15px',
                    paddingTop:'20px', fontFamily:'Poppins'}} align="left">
                        {content.post.post_body}
                    </Typography>
                    {showMore &&
                        <div className="contentOverflowText" onClick={() => console.log("31")}>
                            <strong> Click to read more </strong>
                        </div>
                            
                    }
                </div>
                <div style={{display:'flex', justifyContent:'space-between', margin:'0px 20px 10px 30px'}}>
                    <strong>Files Attached (1)</strong>
                    <span style={{fontWeight:'100'}}>{content.post.post_share_date}</span>
                </div>

            </Box>
            <InteractionBar content={content} curr_user_id={user.id} />

        </Card>
    );
}