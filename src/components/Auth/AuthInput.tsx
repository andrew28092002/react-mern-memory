import React, { FC } from "react";
import { Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type Props = {
  half?: boolean;
  name: string;
  label: string;
  autoFocus?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleShowPassword?: () => void;
  type?: string;
};

const AuthInput: FC<Props> = ({
  half,
  name,
  label,
  autoFocus,
  handleChange,
  handleShowPassword,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        autoComplete="false"
        variant="outlined"
        name={name}
        onChange={handleChange}
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={ name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }: undefined}
      />
    </Grid>
  );
};

export default AuthInput;
