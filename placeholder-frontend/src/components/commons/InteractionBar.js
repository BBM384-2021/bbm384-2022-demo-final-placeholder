import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from "@mui/material";
import "./InteractionBar.css"

export default function InteractionBar ( {likeCount, commentCount, isFavorite, viewCount} )
{
    const [likeFlag, setFlag] = useState(isFavorite);

    const handleFavoriteClick = () => {
        setFlag(!likeFlag);
    };

    return (
        <div style={{marginTop: '30px', display:'flex', justifyContent:'space-between',flexDirection:'row'}}
            >
            <div className="interaction-bar-row" style={{display: 'flex', flexDirection: 'row', marginLeft:'30px'}}>
                <div>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    3
                </div>

                <div>
                    <IconButton>
                        <ModeCommentIcon />
                    </IconButton>
                    5
                </div>

                <div>
                    <IconButton
                        onClick={handleFavoriteClick}
                        variant="contained"
                    >
                        {likeFlag && 
                            <StarIcon htmlColor="#fcba03"/>
                        }
                        {!likeFlag &&
                            <StarOutlineIcon />
                        }
                    </IconButton>
                </div>

            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginRight:'30px'}}>
                <VisibilityIcon sx={{ marginRight:'5px' }}/>
                82
            </div>

        </div>
    );
}