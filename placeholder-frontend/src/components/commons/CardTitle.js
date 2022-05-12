import React, {useState} from "react"
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { deletePost } from "../../services/PostService";
import ProfileBanner from "./ProfileBanner";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PostCreateBox from "../posts/PostCreateBox";

export default function CardTitle( {content, contentType, enablePostOptions, setIsRefresh} ) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (enablePostOptions) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleRemoveClick = () => {
        deletePost(content.post.id)
            .then((response) => {
                if (response.data.code === 200) {
                    // request succesfull
                }
            }).catch( (error) => console.log(error))
    }

    const [openEditPost, setOpenEditPost] = useState(false);

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
            {enablePostOptions &&
                <IconButton sx={{height:'40px', width:'40px', marginRight:'20px'}} onClick={handleClick}>
                    <MoreHorizIcon />
                </IconButton>
            }

            <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <MenuItem onClick={()=>{setOpenEditPost(true); handleClose()}}>Edit</MenuItem>
                    <MenuItem onClick={()=>{handleRemoveClick(); handleClose()}}>Remove</MenuItem>
            </Menu>
            {openEditPost &&
                <PostCreateBox  
                    open={openEditPost}
                    setOpen={setOpenEditPost}
                    user={content.user}
                    isEdit={true}
                    content={content}
                    setIsRefresh={setIsRefresh}
                >
                {"Edit " + content.user.full_name + "'s post"} 
                </PostCreateBox>
            }
        </Box>
    );
}