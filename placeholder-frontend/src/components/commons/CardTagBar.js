import React from "react";
import "./cardTagBar.css";

export function TagView ( {tag_name} ) {
    return (
        <div className="tag-view-box">
            {tag_name}
        </div>
    );
}

export default function CardTagBar ( {tags} ) {
    return (
        <div className="tag-view-container">
            {tags.map((tag) => {
                return <TagView tag_name={tag.tag_name} />
            })}
        </div>
    );
};