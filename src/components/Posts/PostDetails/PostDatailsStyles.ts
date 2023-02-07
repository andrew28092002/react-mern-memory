import { SxProps } from "@mui/material";
import React from "react";

export const card: SxProps = {
  display: "flex",
  width: "100%",
  flexWrap: { sm: "wrap", md: 'nowrap' },
  flexDirection: { sm: "column", md: 'row' },
};
export const section: SxProps = {
  borderRadius: "20px",
  margin: "10px",
  flex: 1,
};
export const imageSection: SxProps = {
  marginLeft: { sm: 0, md: "20px" },
  flex: 1,
};
export const recommendedPostsStyles: SxProps = {
  display: "flex",
  flexDirection: { sm: "column", md: 'row' },
  justifyContent: "center",
  alignItems: "center"
};
export const loadingPaper: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  height: "39vh",
};
export const media: React.CSSProperties = {
  borderRadius: "20px",
  objectFit: "cover",
  width: "100%",
  maxHeight: "900px",
};
