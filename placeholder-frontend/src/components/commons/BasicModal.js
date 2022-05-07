import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { modalStyles } from "./styles";
import CommonButton from "./CommonButton";

const BasicModal = ({
  open,
  onClose,
  title,
  subTitle,
  content,
  onSubmit,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles.wrapper}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {subTitle && <Typography sx={{ mt: 2 }}>{subTitle}</Typography>}
        {content ? content : children}
        <Box sx={modalStyles.buttons}>
          {onSubmit && (
            <CommonButton color="error" variant="contained" onClick={onSubmit}>
              Save
            </CommonButton>
          )}
          <CommonButton color="error" onClick={onClose}>
            Close
          </CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
