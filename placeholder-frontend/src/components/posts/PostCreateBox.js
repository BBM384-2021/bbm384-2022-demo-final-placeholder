// Outer imports
import React, { useEffect, useState } from "react";
// Material
import {
  Modal,
  IconButton,
  CircularProgress,
  TextareaAutosize,
  Alert,
} from "@mui/material";
import { AddPhotoAlternate, Close as CloseIcon } from "@mui/icons-material";
// Inner imports
import TagSelectionBar from "./TagSelectionBar";
import FileUploader from "../commons/FileUploader";
// Services
import { getAllTags } from "../../services/TagService";
import { addPost } from "../../services/PostService";
import { uploadPicture, ROOT_S3_URL } from "../../services/S3Service";
// Style and Images
import sendIcon from "../../img/paper-plane.png";
import "./postCreateBox.css";

export default function PostCreateBox({ user, open, setOpen }) {
  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState({});

  const [preview, setPreview] = useState();

  const [waitResponse, setWaitResponse] = useState(false);
  const [noTagError, setNoTagError] = useState(false);
  const [emptyAlert, setEmptyAlert] = useState(false);
  // when implementing upload post: put postId inside state so that S3 can update the pics properly
  // TODO: Don't forget to change the link in the database
  const [state, setState] = useState({
    isLoading: false,
    value: 0,
    postKey: -1,
    postVisualData: undefined,
  });

  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const onSelectFile = (file) => {
    if (!file) {
      setState({ ...state, postVisualData: undefined });
      return;
    }
    // to preview the image without uploading it
    setState({ ...state, postVisualData: file });
  };

  // TODO: use this while submitting post to upload S3
  const handlePostVisualData = (selectedFile, currentState) => {
    uploadPicture(selectedFile, "postVisualData", user, setState, currentState);
  };

  useEffect(() => {
    if (open) {
      // get all tags available for posts
      getAllTags().then((response) => {
        if (response.data.code === 200) {
          const result = response.data.allTags;
          let allTags = {};
          for (let i = 0; i < result.length; i++) {
            allTags[result[i].id] = {
              isSelected: false,
              tagName: result[i].tag_name,
            };
          }
          setTags(allTags);
        }
      });
    }
  }, [open]);

  useEffect(() => {
    // create the preview
    let objectUrl;
    if (state.postVisualData) {
      objectUrl = URL.createObjectURL(state.postVisualData);
      setPreview(objectUrl);
    } else {
      setPreview(undefined);
    }
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [state.postVisualData]);

  const handleClose = () => {
    setPostContent("");
    setPreview(undefined);
    setState({
      isLoading: false,
      value: 0,
      postKey: -1,
      postVisualData: undefined,
    });
    setEmptyAlert(false);
    setNoTagError(false);
    setOpen(false);
  };

  const onPostCreateClick = () => {
    setWaitResponse(true);
    // since we don't know the post id yet, we generate a custom url for initial post image
    // (normally we use id to store in S3 in order to get objects easily)
    const customUrl = "newPost" + Math.floor(Math.random() * 100);
    // S3 service is  using that key to generate the below URL
    // we need to redefine the URL to save it on our database :D
    setState({ ...state, postKey: customUrl });
    const attachmentLink = preview ? ROOT_S3_URL + customUrl : undefined;
    console.log(attachmentLink);
    let selectedTags = [];
    for (const [id, values] of Object.entries(tags)) {
      if (values.isSelected) {
        selectedTags.push(id);
      }
    }
    if (!postContent) {
      setEmptyAlert(true);
    }

    if (selectedTags.length === 0) {
      setNoTagError(true);
      setWaitResponse(false);
    } else {
      addPost(user.id, postContent, attachmentLink, selectedTags)
        .then((response) => {
          if (response.data.code === 200) {
            // only when the upload is successful, we load the image to s3
            // state doesn't immediately update, while passing the state we mannually update the postKey to keep it updated
            //TODO: when the file is too large, code doesn't wait for this to end
            if (preview) {
              handlePostVisualData(state.postVisualData, {
                ...state,
                postKey: customUrl,
              });
            }
          }
          setWaitResponse(false);
          handleClose();
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
      <div className="post-create-container">
        <div className="post-create-header">
          <div className="post-create-header-inner">
            <img
              className="post-create-header-profile-pic"
              src={user.profile_pic_path}
              alt="user-profile"
            />
            <p>Create a post</p>
          </div>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <hr />
        {emptyAlert && (
          <Alert severity="error">{"Post Body Can NOT Be Empty!"}</Alert>
        )}

        <div >
          <TextareaAutosize
            className="post-content-input"
            aria-label="minimum height text area"
            minRows={3}
            maxRows={8}
            placeholder="Type something..."
            onChange={handlePostChange}
            value={postContent}
            
          />
        </div>

        {state.postVisualData && (
          <div className="postVDPContainer">
            <IconButton
              onClick={() => {
                setPreview(false);
                // reset the state
                setState({
                  isLoading: false,
                  value: 0,
                  postKey: -1,
                  postVisualData: undefined,
                });
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              className="postVisualDataPreview"
              alt="Post Attachment"
              src={preview}
            />
          </div>
        )}
        <hr />
        {noTagError && (
          <p style={{ color: "red" }}>YOU MUST SELECT AT LEAST ONE TAG!!!</p>
        )}
        <TagSelectionBar
          tags={tags}
          setTags={setTags}
          setNoTagError={setNoTagError}
        />
        <hr />
        <div className="post-config-bar">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FileUploader
              setUploadedFile={onSelectFile}
              class=""
              state={{ ...state, isLoading: false }}
            >
              <AddPhotoAlternate fontSize="large" />
            </FileUploader>
            {/* <p style={{ marginLeft: "10px" }}>{'No files'}</p> */}
          </div>

          {waitResponse ? (
            <CircularProgress />
          ) : (
            <IconButton
              className="send-post-button"
              onClick={onPostCreateClick}
            >
              <img
                src={sendIcon}
                alt="post-send-icon"
                style={{ height: "24px" }}
              />
            </IconButton>
          )}
        </div>
      </div>
    </Modal>
  );
}