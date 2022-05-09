import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createToken } from "../../Redux/Actions/authAction";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinkMaterial from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "./logo2.png";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <LinkMaterial color="inherit" href="https://ghitbd.com/">
        GHIT
      </LinkMaterial>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
let emptySignIn = {
  userId: "",
  password: "",
  remember: false,
};

function LogingError(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={4}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Credential fails — <strong>check your User Id or password</strong>
        </Alert>
      </Stack>
    );
  }
  return <div></div>;
}

export default function SignIn() {
  const [errors, setErrors] = useState({});
  const [loginFail, setLoginFail] = useState(false);
  const [signIn, setSignIn] = useState(emptySignIn);
  const [validateOnChange, setvalidateOnChange] = useState(true);
  let history = useHistory();

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.authReducer);

  if (isLoggedIn) {
    history.push("/");
  }

  //FRONTEND VALIDATION
  const validate = (fieldValues = signIn) => {
    let temp = { ...errors };
    if ("userId" in fieldValues) {
      temp.userId = fieldValues.userId ? "" : "User Id field is required.";
    }

    // if ("email" in fieldValues)
    //   temp.email = /$^|.+@.+..+/.test(fieldValues.email)
    //     ? ""
    //     : "Email is not valid.";

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Password field is required.";

    setErrors({
      ...temp,
    });
    if (fieldValues === signIn)
      return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      // var token = localStorage.getItem("user");
      // const myObj = JSON.parse(token);

      dispatch(createToken(signIn.userId, signIn.password))
        .then(() => {
          history.push("/");
        })
        .catch(() => {
          setLoginFail(true);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn({
      ...signIn,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={logo}
              style={{ width: "200px", height: "200px" }}
               alt="GHIT Image"
            />
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <LogingError isLoggedIn={loginFail} />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Id"
              name="userId"
              autoComplete="userId"
              autoFocus
              onChange={handleChange}
              value={signIn.userId}
              error={errors.userId}
              helperText={errors.userId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              value={signIn.password}
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="true"
                  name="remember"
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item>
                <LinkMaterial href="/signup " variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkMaterial>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
