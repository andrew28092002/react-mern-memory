import { FC, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Avatar,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { paper, avatar, form, submit, googleButton } from "./AuthStyles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Icon from "./Icon";
import AuthInput from "./AuthInput";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import {
  useAuthProfileMutation,
  useRegistrationProfileMutation,
} from "../../redux/api/authApi";
import { setCredentials, switchMode } from "../../redux/store/slice/tokenSlice";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";

const clientId =
  "163314534552-ujsg1inj87ai806uaqc40e5g14j57hl0.apps.googleusercontent.com";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

type TProfile = typeof initialState;

const Auth: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isSignUp = useTypedSelector((state) => state.token.isSignUp);
  const [profileData, setProfileData] = useState<TProfile>(initialState);
  const [createProfile] = useRegistrationProfileMutation();
  const [authProfile] = useAuthProfileMutation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    };

    gapi.load("client:auth2", start);
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let userDataFromServer;

    if (isSignUp) {
      userDataFromServer = await createProfile(profileData);
    } else {
      userDataFromServer = await authProfile(profileData);
    }

    if ("data" in userDataFromServer) {
      dispatch(setCredentials(userDataFromServer.data));

      localStorage.setItem(
        "user",
        JSON.stringify(userDataFromServer.data.user)
      );
      localStorage.setItem("token", userDataFromServer.data.accessToken);
    }

    if ("error" in userDataFromServer) {
      console.log(userDataFromServer.error);
    }

    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      let result, token;
      if ("profileObj" in response) {
        result = response.profileObj;
        localStorage.setItem("user", JSON.stringify(result))
      }
      if ("tokenId" in response) {
        token = response.tokenId;
        localStorage.setItem("token", token);
      }

      dispatch(setCredentials({ user: result, accessToken: token }));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const googleFailure = (error: GoogleLoginResponse) => console.log(error);

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={paper} elevation={3}>
        <Avatar sx={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign in"}</Typography>
        <form style={form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <AuthInput
                  half
                  name="firstName"
                  label="First Name"
                  autoFocus={true}
                  handleChange={handleChange}
                />

                <AuthInput
                  half
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}

            <AuthInput
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <AuthInput
              name="password"
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? "text" : "password"}
            />
            {isSignUp && (
              <AuthInput
                name="confirmedPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <Button
                sx={googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            )}
            cookiePolicy="single_host_origin"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => dispatch(switchMode(""))}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
