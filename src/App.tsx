import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { APITest } from "pages";
// Routing
import React, { useState } from "react";

// UI
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "@mui/material";
import {
  // createStyles,
  makeStyles,
} from "@mui/styles";
import CustomTheme from "theme";

// Fonts
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

const Pages = [{ path: "/test", Component: APITest }];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: (props: any) => props.palette.background.default,
  },
}));

function App() {
  const [theme] = useState(CustomTheme.lightTheme);
  const classes = useStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Routes>
            {Pages.map(({ path, Component }) => (
              <Route path={path} element={<Component />} />
            ))}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
