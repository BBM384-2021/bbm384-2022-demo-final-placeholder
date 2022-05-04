import { Box } from "@mui/material";
import React from "react";
import profilePic from "../profilepage-screen/assets/1post.png";
import calenderPic from "../../img/calendar.png";
import { Colors } from "../../Colors";
import "./ProfileBanner.css";


function handleProfileBannerClick(user) {
    return () => {
        // const user_prof_id = user.cs_mail.split('@')[0]
        window.open("/in/" + user.id, "_blank");
    };
}

export default function ProfileBanner( {withoutName, contentType,
                                        user, status}) {
    const styleClassName = "profileBanner-" +  contentType;
    const withStatus = status === undefined ? false : true;
    const contentEnum = contentType === 'post' ? 0 : (contentType === 'event' ? 1 : 2);
    return (
        <Box className={'profileBanner ' + styleClassName} component={ 'button' } onClick={handleProfileBannerClick(user)}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <img className='profileBanner---profilePic'
                    src={profilePic} alt="" style={{ margin: '0px 10px 0px 5px'}}/>
                    <div>
                        {!withoutName &&
                            <p style={{margin: '0px', wordWrap: 'normal'}}>
                                <strong> {user.full_name} </strong> 
                                    {(contentEnum < 2) && (contentEnum === 0 ? "shared a post" : "shared an event")}
                            </p>
                        }

                        {withStatus &&   
                        <span>{status}</span>
                        }
                    </div>

                </div>
                
                {contentEnum === 1 &&
                    <img className="pBanner---calender" src={calenderPic} alt="calender"/>
                }
        </Box>
  )
}
