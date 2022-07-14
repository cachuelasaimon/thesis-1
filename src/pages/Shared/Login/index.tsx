import React, { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
import { auth, useErrorNotif, useLogin } from "utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthBase } from "components";

import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
} from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const showError = useErrorNotif();
  const { loggedIn, isLoading, checkState } = useLogin();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const theme = useTheme();

  const [showPassword, setShowpassword] = useState<boolean>(false);

  const handleChangeVisibility = () =>
    setShowpassword((curr: boolean) => !curr);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (loggedIn && !isLoading) {
      navigate("/home");
    } else {
      checkState();
    }
  }, [isLoading, loggedIn, navigate, checkState]);

  const handleSubmit = async (
    values: any
    // { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsSubmitting(true);
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (user) navigate("/home");
      // window.setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      // console.log("error logs", err);
      showError((err as any).message);
    } finally {
      setIsSubmitting(false);
    }
    navigate("/home");
  };
  return (
    <AuthBase
      carouselItems={[
        {
          img: "assets/images/Login.svg",
        },
      ]}
    >
      <Box
        display="flex"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h4"
          style={{ textAlign: "center" }}
        >
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .required("Required"),
            password: Yup.string()
              .min(8, "Minimum of 8 characters")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            {" "}
            <Box display="flex" flexDirection="column">
              <Box
                sx={{
                  marginTop: theme.spacing(2),
                }}
              >
                <Field
                  name="email"
                  label="Email"
                  component={TextField}
                  fullWidth
                  autoFocus
                />
              </Box>
              <Box
                sx={{
                  marginTop: theme.spacing(2),
                }}
              >
                <Field
                  component={TextField}
                  required
                  name="password"
                  label="Password"
                  autoComplete="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleChangeVisibility}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <HideIcon /> : <ShowIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mt={1}>
                <ButtonBase
                  sx={{
                    ...theme.typography.caption,
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </ButtonBase>
              </Box>

              <LoadingButton
                loading={isSubmitting}
                style={{ marginTop: theme.spacing() }}
                variant="contained"
                type="submit"
              >
                Login
              </LoadingButton>
              <Box mt={1}>
                <Typography variant="caption">
                  Don't have an account?{" "}
                  <ButtonBase
                    sx={{
                      ...theme.typography.caption,
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate("/sign-up")}
                  >
                    Create an acccount
                  </ButtonBase>
                </Typography>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </AuthBase>
  );
};

export default LoginPage;
