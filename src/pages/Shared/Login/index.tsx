import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import { Button, Grid } from "@mui/material";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    await console.log(values);
    window.setTimeout(() => resetForm(), 1500);
    navigate("/home");
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Login</h1>
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
        {(props) => (
          <Form>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item container justifyContent="center" xs={12}>
                {" "}
                <Field name="email" label="Email" component={TextField} />
              </Grid>
              <Grid item container justifyContent="center" xs={12}>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={TextField}
                />
              </Grid>
              <Grid item container justifyContent="center" xs={12}>
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
