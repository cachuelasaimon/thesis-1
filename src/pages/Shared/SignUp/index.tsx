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
import { auth, useErrorNotif, useLogin, useQuickNotif } from "utils";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { collections, database, Set } from "utils";
import { AuthBase } from "components";

import {
  VisibilityOutlined as ShowIcon,
  VisibilityOffOutlined as HideIcon,
} from "@mui/icons-material";
import { INewUser } from "types/INewIUser";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Required")
    .nullable(),
  password: Yup.string()
    .min(8, "Minimum of 8 characters")
    .required("Required")
    .nullable(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Required")
    .nullable(),
});

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const showError = useErrorNotif();
  const quickNotif = useQuickNotif();
  const { loggedIn, isLoading, checkState } = useLogin("/sign-up");
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
    values: Yup.InferType<typeof validationSchema>
    // { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential.user) {
        const { uid, displayName } = userCredential.user;
        const userRef = doc(database, collections.users.string + "/" + uid);
        const user = await getDoc(userRef);
        if (!user.exists()) {
          // Create a new firestore user if user doesn't exist yet
          await Set<INewUser>({
            docRef: userRef,
            data: {
              id: uid,
              contactNo: "",
              displayName: displayName || "New User",
              email: values.email,
              roles: ["customer"],
            },
          });
          const loginCredentials = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          if (loginCredentials.user) navigate("/home");
        }
      }
      // window.setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      console.log("error logs", err.message);
      showError(err.message);
    } finally {
      setIsSubmitting(false);
    }
    // navigate("/home");
  };
  return (
    <AuthBase
      carouselItems={[{ img: "assets/images/Login.png", text: "Join us" }]}
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
          Sign Up
        </Typography>
        <Formik
          initialValues={
            { email: "", password: "", confirmPassword: "" } as Yup.InferType<
              typeof validationSchema
            >
          }
          validationSchema={validationSchema}
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
                  fullWidth
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
              <Box
                sx={{
                  marginTop: theme.spacing(2),
                }}
              >
                <Field
                  fullWidth
                  component={TextField}
                  required
                  name="confirmPassword"
                  label="Confirm Password"
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

              <LoadingButton
                loading={isSubmitting}
                style={{ marginTop: theme.spacing(2) }}
                variant="contained"
                type="submit"
              >
                Sign up
              </LoadingButton>
            </Box>{" "}
            <Box mt={1}>
              <Typography variant="caption">
                Already have an account?{" "}
                <ButtonBase
                  sx={{
                    ...theme.typography.caption,
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/")}
                >
                  Login to your account
                </ButtonBase>
              </Typography>
            </Box>
          </Form>
        </Formik>
      </Box>
    </AuthBase>
  );
};

export default SignUpPage;
