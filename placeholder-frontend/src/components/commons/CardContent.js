import React, { createRef, useLayoutEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Colors } from "../../Colors";
import "./cardPreview.css";

function convertMs2TimeString(time_obj) {
  const time = (new Date()) - time_obj;
  if (time / 1000 < 60) { // if less than a minute
      return Math.floor(time / 1000) + " seconds ago";
  } else if (time / (1000 * 60) < 60) { // if less than a hour
      return Math.floor(time / (1000 * 60)) + " minutes ago";
  } else if (time / (1000 * 60 * 60) < 24) { // if less than a day
      return Math.floor(time / (1000 * 60 * 60)) + " hours ago";
  } else {
      return Math.floor(time / (1000 * 60 * 60 * 24)) + " days ago";
  }
};

export default function CardContent({
  content,
  enableShortView,
  handleModalOpen,
}) {
  const refText = createRef();
  const [showMore, setShowMore] = useState(false);

  const pvdp = content.post.post_visual_data_path;
  const date = new Date(content.post.post_share_date);

  // useState(() => {
  //   console.log(
  //     content.post.post_visual_data_path
  //       ? content.post.post_visual_data_path
  //       : content.post
  //   );
  // }, [content]);

  useLayoutEffect(() => {
    if (refText.current.clientHeight < refText.current.scrollHeight) {
      setShowMore(true);
    }
  }, [refText]);

  return (
    <Box
      style={{
        margin: "0px 30px",
        borderRadius: "25px",
        minWidth: enableShortView ? "40vw" : "60vw",
        maxWidth: "100%",
        backgroundColor: Colors.white,
        boxShadow: "0px 3px 5px 0px " + Colors.whiteShadow,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        position: "relative",
        maxHeight: enableShortView ? "60%" : "auto",
        fontFamily: "Poppins",
      }}
    >
      <div
        // style={{ height: "80%", overflow: enableShortView ? "hidden" : "none" }}
        ref={refText}
      >
        <Typography
          gutterBottom
          sx={{
            paddingLeft: "30px",
            paddingRight: "15px",
            paddingTop: "20px",
            fontFamily: "Poppins",
          }}
          align="left"
        >
          {content.post.post_body}
        </Typography>
        {enableShortView && showMore && (
          <div className="contentOverflowText" onClick={handleModalOpen}>
            <strong> Click to read more </strong>
          </div>
        )}
      </div>
      {(pvdp !== "null" && pvdp !== null) && (
        <img
          className="postVisualDataPreview"
          alt="Post Attachment"
          src={content.post.post_visual_data_path}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 20px 10px 30px",
        }}
      >
        {/* <strong>Files Attached (1)</strong> */}
        <span style={{ fontWeight: "100" }}>
          {(date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + "." +
           (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()) + " " +
           date.toLocaleDateString()
          }
        </span>
      </div>
    </Box>
  );
}
