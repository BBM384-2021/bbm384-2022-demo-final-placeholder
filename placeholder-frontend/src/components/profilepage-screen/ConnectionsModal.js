import React from "react";
import { Box, Typography } from "@mui/material";
import BasicModal from "../commons/BasicModal";
import ProfileBanner from "../commons/ProfileBanner";
import "./Profile.css";

export default function ConnectionsModal({
  setOpen,
  open,
  connections,
  userName,
  title,
}) {
  const handleCloseConnections = () => setOpen(false);
  return (
    <div>
      <BasicModal
        open={open}
        onClose={handleCloseConnections}
        title={title ? title : `Connections of ${userName}`}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {connections.map((u) => {
          return (
            <div key={u.id}>
              <ProfileBanner user={u} contentType="connection"></ProfileBanner>
            </div>
          );
        })}
      </BasicModal>
    </div>
  );
}
