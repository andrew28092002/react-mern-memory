import { SxProps } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export const heading: SxProps = {
  color: "rgba(0,183,255, 1)",
  textDecoration: 'none'
};

export const appBar: SxProps = {
  borderRadius: "15px",
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const image: React.CSSProperties = {
  marginLeft: "15px",
};

export const toolbar: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  width: "400px",
};
export const profile: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "400px",
};
export const userName: SxProps = {
  display: "flex",
  alignItems: "center",
};
export const brandContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};
export const purple: SxProps = {
  color: `getContrastText(${deepPurple[500]})`,
  backgroundColor: deepPurple[500],
};
export const logoutStyle: SxProps = {
    marginLeft: "20px"
}