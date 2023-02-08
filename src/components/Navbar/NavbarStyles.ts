import { SxProps } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export const heading: SxProps = {
  color: "rgba(0,183,255, 1)",
  textDecoration: "none",
  fontSize: {xs: "24px", sm: "36px", md: "48px"}
};

export const appBar: SxProps = {
  borderRadius: "15px",
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const image: SxProps = {
  marginLeft: "15px",
  height: "60px",
  display: {xs: 'none', md: 'block'}
};

export const toolbar: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
};
export const profile: SxProps = {
  display: "flex",
  justifyContent: { xs: "flex-end", md: "space-between" },
};
export const userName: SxProps = {
  display: { xs: "none", md: "flex" },
  alignItems: "center",
  marginLeft: "10px"
};
export const brandContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginLeft: "10px"
};
export const purple: SxProps = {
  color: `getContrastText(${deepPurple[500]})`,
  backgroundColor: deepPurple[500],
  display: { xs: "none", md: "block" },
};
export const logoutStyle: SxProps = {
  marginLeft: "10px",
  fontSize:  {xs: "12px", sm: "14px", md: "16px"},
};
