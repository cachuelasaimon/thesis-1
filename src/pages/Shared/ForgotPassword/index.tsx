import React, { useState } from "react";
import { AuthBase } from "components";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { useErrorNotif } from "utils";

const ForgotPassword: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const showError = useErrorNotif();
  const theme = useTheme();
  const handleSubmit = async (values: { email: string }) => {
    try {
      console.log(values);
    } catch (err: any) {
      showError(err.message);
    }
  };
  return (
    <AuthBase
      carouselItems={[
        {
          img: "assets/images/ForgotPass.svg",
        },
      ]}
    >
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography gutterBottom variant="h4">
          We've all been here before
        </Typography>
        <Typography textAlign="center" variant="body2">
          {" "}
          Give us your email and we'll send you a link to reset your password
        </Typography>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
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

              <LoadingButton
                loading={isSubmitting}
                style={{ marginTop: theme.spacing(2) }}
                variant="contained"
                type="submit"
              >
                Send Link
              </LoadingButton>
            </Box>{" "}
          </Form>
        </Formik>
      </Box>
    </AuthBase>
  );
};

export default ForgotPassword;
