import React, { useEffect, useState, useRef } from "react";
import "./tagFilter.css";
import { getAllTags } from "../../services/TagService";
import { Checkbox, ListItem, Menu, MenuItem } from "@mui/material";
import { borderColor, margin } from "@mui/system";
import { red } from "@mui/material/colors";

export default function TagFilter ( {setSelectedTags, isRefresh} ) {
    const [tags, setTags] = useState({});
    const filterButton = useRef();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const onTagEntrySelect = (tag_id) => {
        let newTags = {...tags};
        return (event) => {
            newTags[tag_id] = {
                tagName : tags[tag_id].tagName,
                isSelected : event.target.checked
            }
            setTags(newTags)
        }
    }

    const onApplyFilterClick = () => {
        let selected_tag_list = [];
        for (const [key, value] of Object.entries(tags)) {
            if (value.isSelected) {
                selected_tag_list.push(key);
            }
        }
        setSelectedTags(selected_tag_list);
    }
    
    useEffect( () => {
        // get all tags available for posts
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
    }, [isRefresh])

    return (
        <div className="tag-filter-container">
            <button 
                ref={filterButton}
                className="tag-filter-button"
                onClick={handleClick}>
                    Select Tags
            </button>
            <Menu 
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    maxHeight: 48 * 4.5,
                    marginTop: '5px',
                    maxWidth:'50%'
                }}
            >
                {Object.keys(tags).map((tag_id) => {
                    return (
                        <ListItem key={"tag-entry-filter-" + tag_id}
                        sx={{
                            height:'30px',
                            margin:'5px 0px 5px 0px',
                            borderBottom:'1px solid gray',
                            padding:'0px',
                            width:filterButton.current.offsetWidth,
                        }}>
                        <div style={{display:'flex', alignItems:'center',
                        justifyContent:'space-between'}}>
                            <Checkbox
                                onChange={onTagEntrySelect(tag_id)}
                                checked={tags[tag_id].isSelected}
                            />
                            <p style={{overflowWrap:'break-word', textAlign:'left'}}>{tags[tag_id].tagName}</p>
                        </div>

                        </ListItem>
                    );
                })}
                <button 
                    style={{
                        background:"indianred",
                        width:'100%',
                        margin: '10px 0px 0px 0px',
                        border: 'none',
                        color: 'white',
                        cursor: "pointer",
                        padding: '5px 20px 5px 20px',
                        fontFamily: 'Poppins'
                    }}
                    onClick={onApplyFilterClick}
                >
                    Apply Filter
                </button>
            </Menu>
        </div>
    );
};