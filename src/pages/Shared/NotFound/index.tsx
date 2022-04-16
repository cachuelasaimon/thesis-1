import { Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import React from "react";

const OopsieSVG = require("./404.svg");

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100vh",
      width: "100%",
    },
  })
);

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/home");
  };
  return (
    <Grid
      className={classes.root}
      container
      justifyContent={"space-around"}
      alignItems={"center"}
      direction="column"
    >
      <Grid item>
        <img
          src={OopsieSVG}
          alt="page-not-found"
          style={{ maxHeight: "20rem" }}
        />
      </Grid>
      <Grid item container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography color="textPrimary" align="center" variant="h4">
            Oopsie, looks like we're lost...
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleGoHome} variant="contained">
            Go home
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NotFound;
