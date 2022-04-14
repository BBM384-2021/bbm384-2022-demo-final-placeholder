import React from 'react'
import Box from '@mui/material/Box';

export default function ChatSideBar() {

  return (
    <Box 
      sx={{
        width:'25%',
        backgroundColor:'white',
        borderRadius:'17px',
        display:'flex'
      }}
    >
      <div style={{ marginLeft: '31px'}}>
        <h3 style={{ color:'#888888'}}>Chat</h3>
      </div>
      
    </Box>
  );
}