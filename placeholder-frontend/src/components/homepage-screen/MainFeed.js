import React from 'react'
import Box from '@mui/material/Box';
import CardPreview from '../commons/CardPreview';

export default function MainFeed() {

  return (
    <Box 
      sx={{
        marginLeft: '30px',
        marginRight: '30px',
        width: '100%',
        backgroundColor:'white',
        borderRadius:'20px',
        display:'flex',
        flexDirection : 'column',
        paddingInline : '10px',
      }}
    >
      <div style={{}}>
        <h3 style={{ color:'#888888'}}>Main Feed</h3>
      </div>
      <CardPreview contentType={'event'}/>
      <CardPreview contentType={'event'}/>
      
    </Box>
  );
}