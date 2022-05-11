import React, { useEffect, useState } from "react";
import "./tagFilter.css";
import { getAllTags } from "../../services/TagService";
import { Checkbox, ListItem, Menu, MenuItem } from "@mui/material";

export default function TagFilter ( {setSelectedTags} ) {
    const [tags, setTags] = useState({
        "12" : {
            isSelected : false,
            tagName : "DREAM"
        },
        "34" : {
            isSelected : false,
            tagName : "My Tag"
        },
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const getTagMenu = () => {
        let tag_entries = [];
        for (const [key, value] of Object.entries(tags)) 
        {
            console.log(key);
            tag_entries.push(
                <ListItem key={"tag-entry-filter-" + key}>
                    <Checkbox />
                    {value.tagName}
                </ListItem>
            )
        }
        return tag_entries;
    }
    
    useEffect( () => {
        // get all tags available for posts
        return;
        getAllTags().then((response) => {
            if (response.data.code === 200) {
                const result = response.data.allTags;
                let allTags = {};
                for (let i = 0; i < result.length; i++) {
                    allTags[result[i].id] = {
                    isSelected: false,
                    tagName: result[i].tag_name,
                    };
                }
                setTags(allTags);
            }
        });
    }, [])

    useEffect( () => {
        const new_selected_tags = [];
        for (const [key, value] of Object.entries(tags)) {
            if (value.isSelected) {
                new_selected_tags.push(key);
            }
        }
        setSelectedTags(new_selected_tags);
    }, [tags])

    return (
        <div className="tag-filter-container">
            <button onClick={handleClick}>Select Tags</button>
            <Menu 
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    getTagMenu()
                }
            </Menu>
        </div>
    );
};