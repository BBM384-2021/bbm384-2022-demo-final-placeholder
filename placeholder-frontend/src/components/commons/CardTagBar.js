import React from "react";
import "./cardTagBar.css";

export function TagView ( {tag_name} ) {
    return (
        <div className="tag-view-box">
            {tag_name}
        </div>
    );
}

export default function CardTagBar ( {content_id, tags} ) {
    return (
        <div className="tag-view-container">
            {tags.map((tag) => {
                return <TagView 
                            tag_name={tag.tag_name} 
                            key={content_id + "-" + "tag" + tag.id}    
                        />
            })}
        </div>
    );
};