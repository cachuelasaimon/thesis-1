import { createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
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
      background: {
        default: blueGrey["900"],
      },
    },
    ...commonProps,
  }),

  darkTheme: createTheme({
    palette: {
      mode: "dark",
    },
    ...commonProps,
  }),
};

export default theme;
