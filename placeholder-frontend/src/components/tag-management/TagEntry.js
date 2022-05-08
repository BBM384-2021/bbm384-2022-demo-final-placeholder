import React from "react";
import "./tagEntry.css"

export default function TagEntry ({tag}) {
    return (
        <>
            <div className="tag-entry">
                <p>{tag.id}</p>
                <p>{tag.tag_name}</p>
                <p>ddd</p> 
            </div>
            <hr className="entry-line"/>
        </>

    );
};