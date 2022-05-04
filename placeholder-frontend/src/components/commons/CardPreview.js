import React, { createRef, useLayoutEffect, useState } from "react";
import { Card, Box, Typography, Modal } from "@mui/material";
import { Colors } from "../../Colors";
import InteractionBar from "./InteractionBar";
import "./cardPreview.css";
import CardView from "./CardView";
import CardTitle from "./CardTitle";
import CardContent from "./CardContent";

const textLengthLimit = 650;

export default function CardPreview({ content, contentType, user }) {
  const refBody = createRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      ref={refBody}
      sx={{
        height: "420px",
        margin: "10px",
        borderRadius: "10px",
        backgroundColor: Colors.whiteShaded,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardTitle content={content} contentType={contentType} />
      <CardContent
        content={content}
        enableShortView={true}
        handleModalOpen={handleOpen}
      />
      <InteractionBar content={content} curr_user_id={user.id} />

      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <CardView
          contentType={contentType}
          content={content}
          refPreview={refBody}
          user={user}
        />
      </Modal>
    </Card>
  );
}
