import React from "react";
import styled from "styled-components";
import { Card } from "@mui/material";
import { Colors } from "../../Colors";

// Styled component for card wrapper
const CardContainer = styled.div`
  marigin: auto;
  border-color: ${Colors.hacettepe}
`;

export default function CardContainerSc({ children }) {
  return <div style={{textAllign: 'center'}}>
      <CardContainer>error</CardContainer>;
  </div>
}
