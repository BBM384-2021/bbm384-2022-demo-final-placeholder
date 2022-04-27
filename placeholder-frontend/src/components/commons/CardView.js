import React from "react"
import { Card } from "@mui/material"
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";
import InteractionBar from "./InteractionBar";
import { Colors } from "../../Colors";

export default function CardView( {content, contentType, refPreview, user} ) {
    return (
        
        <Card sx={{
            position : 'fixed',
            left : '50%',
            transform : 'translate(-50%, 20%)',
            backgroundColor: Colors.whiteShaded,
            margin : '10px',
            borderRadius:'10px',
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'column'
        }}>
            <CardTitle content={content} contentType={contentType} />
            <CardContent content={content} enableShortView={false}/>
            <InteractionBar content={content} curr_user_id={user.id}/>
        </Card>
    );
}