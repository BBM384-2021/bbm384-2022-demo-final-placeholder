import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function EventCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Ayşe Yılmaz posted,
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Should next class be online or not ?
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Join</Button>
            </CardActions>
        </Card>
    );
}
