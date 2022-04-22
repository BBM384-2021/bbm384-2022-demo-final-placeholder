import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import CardPreview from '../commons/CardPreview';
import { getMainFeed } from '../../services/PostService';

export default function MainFeed( {user} ) {
  const [contents, setContents] = useState([]);
  
  useEffect(() => {
    getMainFeed(user.id, setContents);
  }, [user.id]);
  
  console.log(contents);

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
      
      {contents.length > 0 &&
          contents.map((content) => {
              return (<CardPreview
                content={content}
                contentType={"post"}
                key={content.post.id}
              />);
          })
      }
      
    </Box>
  );
}