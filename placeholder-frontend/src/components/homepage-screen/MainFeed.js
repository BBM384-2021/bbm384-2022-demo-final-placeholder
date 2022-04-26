import React from 'react'
import Box from '@mui/material/Box';

export default function MainFeed() {

  return (
    <Box 
      sx={{
        flex: '6',
        marginLeft: '30px',
        marginRight: '30px',
        width: '75%',
        backgroundColor:'white',
        borderRadius:'17px',
        display:'flex'
      }}
    >
      <div style={{ marginLeft: '31px'}}>
        <h3 style={{ color:'#888888'}}>Main Feed</h3>
      </div>
      
    </Box>
  );
}