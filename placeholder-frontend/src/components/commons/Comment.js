import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";

import { updateComment, deleteComment } from "../../services/CommentService";
import ProfileBanner from "./ProfileBanner";
import ConfirmationDialog from "../commons/ConfirmationDialog";

import "./comment.css";

export function convertMs2TimeString(time) {
  if (time / 1000 < 60) {
    // if less than a minute
    return Math.floor(time / 1000) + " seconds ago";
  } else if (time / (1000 * 60) < 60) {
    // if less than a hour
    return Math.floor(time / (1000 * 60)) + " minutes ago";
  } else if (time / (1000 * 60 * 60) < 24) {
    // if less than a day
    return Math.floor(time / (1000 * 60 * 60)) + " hours ago";
  } else {
    const day = Math.floor(time / (1000 * 60 * 60 * 24));
    return day > 1 ? day + " days ago" : "yesterday";
  }
}

export default function Comment({
  comment,
  timeDiffMS,
  enableCommentOptions,
  setIsRefresh,
  setInteractionContent,
  interactionContent,
}) {
  const [waitResponse, setWaitResponse] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // ========================= HANDLE COMMENT OPTION CLICKS ==================== \\
  const handleEditClick = () => {
    setIsEdit(true);
    handleClose();
  };
  const handleEditCancelClick = () => {
    setIsEdit(false);
    setCommentInput(comment.comment.body);
  };
  const handleEditDoneClick = () => {
    if (commentInput.length === 0) {
      setNoCommentError(true);
    } else {
      setWaitResponse(true);
      const editFinishFunction = () => {
        setIsEdit(false);
        setIsRefresh(true);
        setWaitResponse(false);
      };
      updateComment(comment.comment.id, commentInput, editFinishFunction);
    }
  };

  const handleRemoveClick = () => {
    const removeCommentFinishFunction = () => {
      setIsRefresh(true);
    };
    setInteractionContent({
      ...interactionContent,
      commentCount: interactionContent.commentCount - 1,
    });
    deleteComment(comment.comment.id, removeCommentFinishFunction);
    handleClose();
  };
  // ==========================================================================

  const [commentInput, setCommentInput] = useState(comment.comment.body);
  const [noCommentError, setNoCommentError] = useState(false);
  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
    setNoCommentError(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (enableCommentOptions) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //========== Confirmation Dialog Functions
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const askConfirmation = () => {
    setConfirmationOpen(true);
  };

  return (
    <Box className="comment-box">
      <div className="comment-title">
        <div className="comment-profile-banner-wrapper">
          <ProfileBanner
            withoutName={false}
            contentType={"comment"}
            user={comment.user}
            status={convertMs2TimeString(timeDiffMS)}
          />
        </div>
        <IconButton
          sx={{ height: "40px", width: "40px", marginRight: "20px" }}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={askConfirmation}>Remove</MenuItem>
        </Menu>
      </div>

      {isEdit ? (
        <div className="comment-edit-wrapper">
          {noCommentError &&
            <p style={{color:'red', fontWeight:'600'}}>Comments can not be empty</p>
          }
          <textarea
            className="comment-edit-body"
            maxLength={1000}
            placeholder={"Edit your comment"}
            onChange={handleCommentChange}
            value={commentInput}
          />
          <div className="comment-edit-icon-wrapper">
            <IconButton onClick={handleEditDoneClick} disabled={waitResponse}>
              {waitResponse ? (
                <CircularProgress />
              ) : (
                <DoneIcon htmlColor="green" />
              )}
            </IconButton>
            <IconButton onClick={handleEditCancelClick}>
              <CancelIcon htmlColor="red" />
            </IconButton>
          </div>
        </div>
      ) : (
        <p>{comment.comment.body}</p>
      )}
      <ConfirmationDialog
        onConfirm={handleRemoveClick}
        open={confirmationOpen}
        setOpen={setConfirmationOpen}
      >
        Your comment will be deleted permanently, do you want to proceed?
      </ConfirmationDialog>
    </Box>
  );
}
