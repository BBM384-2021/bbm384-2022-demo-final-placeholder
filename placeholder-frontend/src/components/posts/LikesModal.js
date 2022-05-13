import React from "react";
import { Box, Typography } from "@mui/material";
import BasicModal from "../commons/BasicModal";
import ProfileBanner from "../commons/ProfileBanner";

export default function LikesModal({ setOpen, open, likes }) {
  const handleCloseModal = () => setOpen(false);
  return (
    <div>
      <BasicModal
        open={open}
        onClose={handleCloseModal}
        title={`Liked users`}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {likes.map((like) => {
            const user = like.user === null ?
                { full_name : "Deleted user", "id" : "10000000000" }
                :
                like.user;
            return (
                <div key={`like-${like.like.post_id}-${like.like.user_id}`}>
                <ProfileBanner user={user} contentType="connection"></ProfileBanner>
                </div>
            );
        })}
      </BasicModal>
    </div>
  );
}
