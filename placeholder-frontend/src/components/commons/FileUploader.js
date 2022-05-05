import React from "react";
import { IconButton } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

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
        className="editPPButton"
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClick}
      >
        <CameraAlt style={{ color: "#A5A5A5" }} />
      </IconButton>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }} /* Make the file input element invisible */
      />
    </>
  );
};
export default FileUploader;
