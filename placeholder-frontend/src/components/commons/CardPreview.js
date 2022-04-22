import React from "react";
import { Card, Box, Typography } from "@mui/material"
import ProfileBanner from "./ProfileBanner";
import { Colors } from "../../Colors"
import { bgcolor } from "@mui/system";

export default function CardPreview ( { content, contentType } )
{   
    return (
        <Card sx={{ height : '400px', margin : '10px', borderRadius:'10px', backgroundColor: Colors.whiteShaded}}>
            <Box style={{ margin: '20px 0px 10px 30px', borderRadius: '25px', width:'60%'}}>
                <ProfileBanner
                    withoutName={false}
                    withStatus={false}
                    user={{full_name : "Desmin Alpaslan"}}
                    contentType={contentType}
                    onClick = { () => console.log("hello") }
                    key={"postID29"}
                />
            </Box>
            <Box style={{ margin: '20px 0px 0px 30px', borderRadius: '25px', minWidth:'100vh',
            width:'100vh', backgroundColor: Colors.white, boxShadow: '0px 3px 5px 0px ' + Colors.whiteShadow,
            height:'30vh', minHeight: '10vh'}}>
                <Typography gutterBottom sx={{paddingLeft:'30px', paddingTop:'20px', fontFamily:'Poppins'}} align="left">
                {
                    // Post content goes here
                }
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <div style={{ display:'flex', justifyContent:'space-between', margin:'0px 20px 0px 30px'}}>
                    <strong>Files Attached (1)</strong>
                </div>
            </Box>

        </Card>
    );
}