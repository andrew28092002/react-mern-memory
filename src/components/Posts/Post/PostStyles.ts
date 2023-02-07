import { SxProps } from "@mui/material";

export const media: SxProps = {
  height: 0,
  paddingTop: "56.25%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundBlendMode: "darken",
};
export const border: SxProps = {
  border: "solid",
};
export const fullHeightCard: SxProps = {
  height: "100%",
};
export const card: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
};
export const overlay: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  left: "20px",
  color: "white",
};
export const overlay2: React.CSSProperties = {
  position: "absolute",
  top: "20px",
  right: "5px",
  color: "white",
};
export const grid: SxProps = {
  display: "flex",
};
export const details: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  margin: "20px",
};
export const title: SxProps = {
  padding: "0 16px",
};
export const cardActions: SxProps = {
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
};

export const cardAction: SxProps = {
  display: 'block',
  textAlign: 'initial',
}