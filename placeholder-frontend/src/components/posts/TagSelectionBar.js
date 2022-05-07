import React from "react";
import TagBox from "./TagBox";
import "./tagSelectionBar.css"

export default function TagSelectionBar ( {tags, setTags} ) {

    const onTagClick = (id) => {
        return (select) => {
            tags[id] = {
                isSelected:select,
                tagName:tags[id].tagName
            }
            setTags(tags);
        }
    };

    return (
        <div className="tag-selection-bar">
            {Object.keys(tags).map((id)=>{
                return <TagBox
                    onClick={onTagClick(id)}
                    tag={tags[id]}
                    key={"tagCreate"+id}
                >
                    {tags[id].tagName}
                </TagBox>
            })}
        </div>
    );
};