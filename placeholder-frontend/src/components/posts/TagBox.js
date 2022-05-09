import React, { useState } from "react";
import "./tagBox.css";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

export default function TagBox ({children, tag, onClick}) {
    const [isSelected, setIsSelected] = useState(tag.isSelected);

    const onTagClick = () => {
        onClick(!isSelected)
        setIsSelected(!isSelected)
    }

    return (
        <button className={"tag-box" + (isSelected ? " selected" : " nselected")}
            onClick={onTagClick}>
            {isSelected ?
                <DoneIcon sx={{width:'20px', marginRight: '5px'}}/>
                :
                <AddIcon sx={{width:'20px', marginRight: '5px'}}/>
            }
            
            <p>{children}</p>
        </button>
    );
};