import React, { createRef, useLayoutEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Colors } from "../../Colors";
import InteractionBar from "./InteractionBar";
import "./cardPreview.css";
import CardView from "./CardView";
import CardTitle from "./CardTitle";

export default function CardContent({
  content,
  enableShortView,
  handleModalOpen,
}) {
  const refText = createRef();
  const [showMore, setShowMore] = useState(false);

  useLayoutEffect( () => {
      if (refText.current.clientHeight < refText.current.scrollHeight) {
          setShowMore(true);
      }
  }, [refText])

  return (
      <Box style={{ margin: '20px 20px 0px 30px', borderRadius: '25px',
      minWidth: enableShortView ? '40vw' : '60vw', maxWidth: '100%',
      backgroundColor: Colors.white, boxShadow: '0px 3px 5px 0px ' + Colors.whiteShadow,   
      display:'flex', justifyContent:'space-between', flexDirection:'column', position:'relative',
      height: enableShortView ? '60%' : 'auto', fontFamily:'Poppins'}}>
          <div style={{ height:'80%',
          overflow: enableShortView ? 'hidden' : 'none'}} ref={refText}>
              <Typography gutterBottom sx={{paddingLeft:'30px', paddingRight:'15px',
              paddingTop:'20px', fontFamily:'Poppins'}} align="left">
                  {content.post.post_body}
              </Typography>
              {(enableShortView && showMore) &&
                  <div className="contentOverflowText" onClick={handleModalOpen}>
                      <strong> Click to read more </strong>
                  </div>
                      
              }
          </div>
          <div style={{display:'flex', justifyContent:'space-between', margin:'0px 20px 10px 30px'}}>
              {/* <strong>Files Attached (1)</strong> */}
              <span style={{fontWeight:'100'}}>{content.post.post_share_date}</span>
          </div>

      </Box>
    );
}
