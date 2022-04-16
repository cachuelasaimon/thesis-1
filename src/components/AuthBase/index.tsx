import React from "react";
import {
  Paper,
  Grid,
  useMediaQuery,
  Typography,
  Theme,
  // Container,
  // Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { makeStyles, createStyles, useTheme } from "@mui/styles";
// import { deepOrange } from "@mui/material/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Carousel, { CarouselProps } from "react-material-ui-carousel";
import ReDietLight from "assets/images/ReDiet-light.png";
import ReDietDark from "assets/images/ReDiet-dark.png";
import ReDietPlain from "assets/images/ReDiet-plain-2.png";
import BGImg1 from "assets/images/LoginBG-1.svg";
import BGImg2 from "assets/images/LoginBG-2.svg";
import BGImg3 from "assets/images/LoginBG-3.svg";
import BGImg4 from "assets/images/LoginBG-4.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "auto",
      margin: "0",
    },
    logo: {
      maxHeight: "3rem",
      margin: "1rem 0 5rem 1.5rem",
      marginBottom: "5rem",
    },
    logoMobile: {
      maxHeight: "15rem",
    },
    carouselImage: {
      maxHeight: "25rem",
    },
    paper: {
      borderBottomRightRadius: "20px",
      borderTopLeftRadius: "0px",
      minHeight: "100vh",
    },
    carouseItem: {
      minHeight: "30rem",
      userSelect: "none",
      padding: theme.spacing(3),
    },
  })
);

const CarouselItems = [
  { img: BGImg3, text: "Text " },
  { img: BGImg4, text: "Text " },
  {
    img: BGImg1,
    text: "Text ",
  },
  { img: BGImg2, text: "Text " },
];

const carouselSettings: CarouselProps = {
  animation: "slide",
  duration: 500,
  stopPlayOnHover: true,
  interval: 4000,
  cycleNavigation: true,
  swipe: true,
  indicatorIconButtonProps: {
    size: "large",
  },
  IndicatorIcon: <FiberManualRecordIcon style={{ fontSize: "0.8rem" }} />,
};

const Login: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  // @ts-ignore
  const md = useMediaQuery(theme.breakpoints.down("lg"));
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 2000);
  };

  return (
    <Grid className={classes.root} spacing={3} container>
      {/* may text na part */}
      <Grid
        item
        container
        alignItems={"center"}
        lg={6}
        justifyContent={"center"}
        xs={12}
      >
        <Grid xs={12} item>
          <Paper
            sx={{ boxShadow: 0, borderRadius: 0 }}
            className={classes.paper}
          >
            {!md && (
              <React.Fragment>
                <Grid container>
                  <Grid item xs={12}>
                    <img
                      className={classes.logo}
                      src={ReDietPlain}
                      alt="rediet-logo"
                    />
                  </Grid>
                  <Grid
                    container
                    sx={{ paddingLeft: "4rem" }}
                    justifyContent="space-around"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h2">Welcome to ReDiet</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        Dietary tips and Recipes for you to try!
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems=""
                  >
                    <LoadingButton
                      sx={{
                        // @ts-ignore
                        color: theme.palette.getContrastText(
                          // @ts-ignore
                          theme.palette.google.main
                        ),
                      }}
                      color="primary"
                      onClick={handleClick}
                      loading={loading}
                      variant="contained"
                    >
                      Continue as Guest
                    </LoadingButton>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {md && (
              <Grid
                sx={{ minHeight: "auto" }}
                item
                container
                justifyContent="space-between"
                direction="column"
                alignItems={"center"}
              >
                <Grid item container justifyContent="space-around" xs={12}>
                  <img
                    className={classes.logoMobile}
                    src={
                      // @ts-ignore
                      theme.palette.mode === "dark" ? ReDietDark : ReDietLight
                    }
                    alt="rediet-logo"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  sx={{ marginBottom: "4rem" }}
                >
                  <LoadingButton
                    sx={{
                      marginTop: "3rem",
                      // @ts-ignore
                      color: theme.palette.getContrastText(
                        // @ts-ignore
                        theme.palette.google.main
                      ),
                    }}
                    color="primary"
                    onClick={handleClick}
                    loading={loading}
                    variant="contained"
                  >
                    Continue as Guest
                  </LoadingButton>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
      {/* may image na part */}
      {!md && (
        <Grid
          item
          container
          lg={6}
          justifyContent="space-around"
          alignItems="center"
        >
          {/* <img className={classes.logo} src={BGImg1} alt="rediet-logo" /> */}

          <Grid item xs={11}>
            <Carousel {...carouselSettings}>
              {CarouselItems.map(({ text, img }) => (
                <div className={classes.carouseItem}>
                  <Grid
                    sx={{ marginBottom: "1rem" }}
                    container
                    justifyContent="center"
                  >
                    <img
                      draggable={false}
                      className={classes.carouselImage}
                      src={img}
                      alt="rediet-logo"
                    />
                  </Grid>
                  <Typography align="center" variant="h5" color="textPrimary">
                    {text}
                  </Typography>
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
