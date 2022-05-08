import React from "react";
import {
  IconButton,
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from "@mui/material";

const FileUploader = (props) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.setUploadedFile(fileUploaded);
  };
  return (
    <>
      <IconButton
        className={props.class}
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClick}
      >
        {props.children}
      </IconButton>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }} /* Make the file input element invisible */
      />
      {props.state.isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={props.state.isLoading}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              color="inherit"
              thickness={4}
              variant="determinate"
              value={props.state.value}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.primary"
              >
                {`${Math.round(props.state.value)}%`}
              </Typography>
            </Box>
          </Box>
        </Backdrop>
      )}
    </>
  );
};
export default FileUploader;
