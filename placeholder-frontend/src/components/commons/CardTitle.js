import React from "react"
import { Box, IconButton } from "@mui/material"
import ProfileBanner from "./ProfileBanner";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CardTitle( {content, contentType} ) {
    return (
        <Box style={{ margin: '20px 0px 10px 30px', width:'95%', display: 'flex',
            flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{width:'60%', borderRadius: '25px'}}>
                <ProfileBanner
                    withoutName={false}
                    user={content.user}
                    contentType={contentType}
                    key={"postAuthor"+content.post.id+content.user.id}
                />
            </div>
            <IconButton sx={{height:'40px', width:'40px', marginRight:'20px'}}>
                <MoreHorizIcon />
            </IconButton>
        </Box>
    );
}