import React from "react";
import {
  Paper,
  Grid,
  useMediaQuery,
  Typography,
  Box,
  // Container,
  // Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";
// import { deepOrange } from "@mui/material/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Carousel from "react-material-ui-carousel";
// import { CarouselProps } from "types";
// import ReDietLight from "assets/images/ReDiet-light.png";
// import ReDietDark from "assets/images/ReDiet-dark.png";
// import ReDietPlain from "assets/images/ReDiet-plain-2.png";
// import BGImg1 from "assets/images/LoginBG-1.svg";
// import BGImg2 from "assets/images/LoginBG-2.svg";
// import BGImg3 from "assets/images/LoginBG-3.svg";
// import BGImg4 from "assets/images/LoginBG-4.svg";
const TestBG = require("./LoginBG-2.svg");

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       minHeight: "auto",
//       margin: "0",
//     },
//     logo: {
//       maxHeight: "3rem",
//       margin: "1rem 0 5rem 1.5rem",
//       marginBottom: "5rem",
//     },
//     logoMobile: {
//       maxHeight: "15rem",
//     },
//     carouselImage: {
//       maxHeight: "25rem",
//     },
//     paper: {
//       borderBottomRightRadius: "20px",
//       borderTopLeftRadius: "0px",
//       minHeight: "100vh",
//     },
//     carouseItem: {
//       minHeight: "30rem",
//       userSelect: "none",
//       // padding: theme.spacing(3),
//     },
//   })
// );

const styles: any = {
  root: {
    padding: "0",
    minHeight: "auto",
    margin: "0",
    maxWidth: "100vw",
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
    // padding: theme.spacing(3),
  },
};

const CarouselItems = [
  { img: TestBG, text: "Text 1" },
  { img: TestBG, text: "Text 2" },
  {
    img: TestBG,
    text: "Text ",
  },
  { img: TestBG, text: "Text 3" },
];

const carouselSettings: any = {
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

const Login: React.FC = (props: any) => {
  console.log("prop logs", props);
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
    <Grid style={styles.root} container>
      {/* may text na part */}
      <Grid
        item
        container
        alignItems={"center"}
        lg={6}
        justifyContent={"center"}
        xs={12}
        sx={{ padding: "0" }}
      >
        <Grid xs={12} item>
          {!md && <Paper style={styles.paper}>{props.children}</Paper>}

          {md && <>{props.children}</>}
        </Grid>
      </Grid>
      {/* may image na part */}
      {!md && (
        <Grid
          sx={{ padding: "0" }}
          item
          container
          lg={6}
          justifyContent="space-around"
          alignItems="center"
        >
          {/* <img style={classes.logo} src={BGImg1} alt="rediet-logo" /> */}

          <Grid item xs={11}>
            <Carousel {...carouselSettings}>
              {CarouselItems.map(({ text, img }, index) => (
                <div
                  key={index}
                  style={{ ...styles.carouseItem, padding: theme.spacing(3) }}
                >
                  <Grid
                    sx={(theme) => ({ marginBottom: theme.spacing(2) })}
                    container
                    justifyContent="center"
                  >
                    <img
                      draggable={false}
                      style={styles.carouselImage}
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
