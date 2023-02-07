import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import memories from "./../../images/memories.png";
import {
  appBar,
  brandContainer,
  heading,
  image,
  profile,
  purple,
  toolbar,
  userName,
  logoutStyle,
} from "./NavbarStyles";
import { Link } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import { setCredentials } from "../../redux/store/slice/tokenSlice";
import { logout } from "../../redux/store/slice/tokenSlice";

const Navbar: FC = () => {
  const { user } = useTypedSelector(state => state.token);
  const dispatch = useTypedDispatch()
  const location = useLocation()
  
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    const accessToken = localStorage.getItem("token");

    if (userFromLocalStorage && accessToken) {
      dispatch(setCredentials({
        user: JSON.parse(userFromLocalStorage),
        accessToken
      }))
    }
  }, [location, dispatch]);

  const outputButton = () => {
    dispatch(logout(''))
    localStorage.clear()
  }
  
  return (
    <AppBar sx={appBar} position="static" color="inherit">
      <div style={brandContainer}>
        <Typography
          component={Link}
          to="/react-mern-memory/"
          sx={heading}
          align="center"
          variant="h3"
        >
          Memories
        </Typography>
        <img style={image} src={memories} height="60" />
      </div>
      <Toolbar sx={toolbar}>
        {user ? (
          <div style={profile}>
            <Avatar
              sx={purple}
              alt={user?.name}
              src={user?.imageUrl}
            >
              {user?.name.charAt(0)}
            </Avatar>
            <Typography sx={userName} variant="h6">
              {user?.name}
            </Typography>
            <Button variant="contained" color="secondary" sx={logoutStyle} onClick={outputButton}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="contained" component={Link} to="/react-mern-memory/auth">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
