import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Colors } from "../../Colors";

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="inherit" />
    </Box>
  );
}
