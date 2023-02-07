import { SxProps } from "@mui/system";

export const mainContainer: SxProps = {
  flexDirection: { sm: "column-reverse", md: "row" },
};

export const gridContainer: SxProps = {
  flexDirection: { xs: "column-reverse", sm: "row" },
};

export const appBarSearch: SxProps = {
  borderRadius: 4,
  marginBottom: "1rem",
  display: "flex",
  padding: "16px",
};

export const pagination: SxProps = {
  borderRadius: 4,
  marginTop: "1rem",
  padding: "16px",
};

export const searchButton: SxProps = {
  margin: "10px 0"
}
