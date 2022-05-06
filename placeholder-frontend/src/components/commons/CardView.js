import React from "react";
import { Card } from "@mui/material";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import InteractionBar from "./InteractionBar";
import CommentSection from "./CommentSection";
import { Colors } from "../../Colors";

export default function CardView( {content, setContent,
    contentType, user, interactionContent, setInteractionContent, setIsRefresh} ) {
    return (
        
        <Card sx={{
            maxWidth : '65vw',
            position : 'absolute',
            transform : 'translate(15vw, 7vh)',
            backgroundColor: Colors.whiteShaded,
            borderRadius:'10px',
            paddingBottom: '20px'
        }}>
            <CardTitle content={content} contentType={contentType} />
            <CardContent content={content} enableShortView={false}/>
            <InteractionBar 
                content={interactionContent}
                curr_user_id={user.id}
                setContent={setInteractionContent}
                post_id={content.post.id}
                />
            <CommentSection 
                comments={content.comments}
                user_id={user.id}
                post_id={content.post.id}
                interactionContent={interactionContent}
                setInteractionContent={setInteractionContent}
                setIsRefresh={setIsRefresh}
                />
        </Card>
    );
}
