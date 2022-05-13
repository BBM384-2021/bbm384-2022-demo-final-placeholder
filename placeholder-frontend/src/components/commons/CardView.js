import React from "react";
import { Card } from "@mui/material";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import InteractionBar from "./InteractionBar";
import CommentSection from "./CommentSection";
import { Colors } from "../../Colors";
import CardTagBar from "./CardTagBar";

const CardView = React.forwardRef( ({content, setContent,
    contentType, user, interactionContent, setInteractionContent, setIsRefresh}, ref ) => {
    return (
        <Card sx={{
            maxWidth : '65vw',
            position : 'absolute',
            transform : 'translate(15vw, 7vh)',
            backgroundColor: Colors.whiteShaded,
            borderRadius:'10px',
            paddingBottom: '20px'
        }}
        ref={ref}
        >
            <CardTitle content={content} contentType={contentType}/>
            <CardTagBar tags={content.tags} content_id={content.post.id}/>
            <CardContent content={content} enableShortView={false}/>
            <InteractionBar 
                content={interactionContent}
                user={user}
                setContent={setInteractionContent}
                post_id={content.post.id}
                />
            <CommentSection 
                comments={content.comments}
                user={user}
                post_id={content.post.id}
                interactionContent={interactionContent}
                setInteractionContent={setInteractionContent}
                setIsRefresh={setIsRefresh}
                />
        </Card>
    );
});

export default CardView;