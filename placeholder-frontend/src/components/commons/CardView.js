import React from "react"
import { Card } from "@mui/material"
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import InteractionBar from "./InteractionBar";
import CommentSection from "./CommentSection";
import { Colors } from "../../Colors";

export default function CardView( {content, contentType, user} ) {
    return (
        
        <Card sx={{
            maxWidth : '65vw',
            position : 'absolue',
            transform : 'translate(25%, 5%)',
            backgroundColor: Colors.whiteShaded,
            borderRadius:'10px',
            paddingBottom: '100px'
        }}>
            <CardTitle content={content} contentType={contentType} />
            <CardContent content={content} enableShortView={false}/>
            <InteractionBar content={content} curr_user_id={user.id}/>
            <CommentSection comments={content.comments} user_id={user.id} post_id={content.post.id}/>
        </Card>
    );
}