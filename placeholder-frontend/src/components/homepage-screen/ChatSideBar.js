import React from 'react'
import Box from '@mui/material/Box';

export default function ChatSideBar() {

  return (
    <Box
      component={'div'}
      sx={{
        width:'100%',
        height: '100%',
        backgroundColor:'white',
        borderRadius:'17px',
        display:'flex',
        overflow: 'auto',
      }}
    >
      <div style={{ marginLeft: '31px'}}>
        <h3 style={{ color:'#888888'}}>Chat</h3>
      </div>
      
    </Box>
  );
}