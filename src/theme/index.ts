import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Theme } from "@mui/material/styles";

const commonProps = {
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    button: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  },
};

const theme = {
  lightTheme: createTheme({
    palette: {
      mode: "light",
      // background: {
      //   default: grey[200],
      // },
      // @ts-ignore
      google: {
        main: grey[900],
      },
    },
    ...commonProps,
  }),

  darkTheme: createTheme({
    palette: {
      mode: "dark",
      // @ts-ignore
      // google: {
      //   main: grey[200],
      // },
    },
    ...commonProps,
  }),
};

export default theme;
