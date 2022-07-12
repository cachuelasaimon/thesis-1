import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { APITest } from "pages";
// Routing
import { useState } from "react";

// Layouts
import { WithAuth } from "layouts";

// Types
import { IPage } from "types";

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

import { Login, Home, Cart, SingleProduct, NotFound, SignUp } from "pages";

const Pages: IPage[] = [
  { path: "/cart", Component: Cart, requireAuth: false },
  { path: "/home", Component: Home, requireAuth: true },
  { path: "/", Component: Login, requireAuth: false },
  { path: "/sign-up", Component: SignUp, requireAuth: false },
  { path: "/test", Component: APITest, requireAuth: false },
  { path: "*", Component: NotFound, requireAuth: false },
  { path: "/product/:productId", Component: SingleProduct, requireAuth: true },
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: (props: any) => props.palette.background.default,
  },
}));

function App() {
  const [theme] = useState(CustomTheme.darkTheme);
  const classes = useStyles(theme as Theme);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Routes>
            {Pages.map(({ path, Component, requireAuth }) => (
              <Route
                key={path}
                path={path}
                element={
                  requireAuth ? (
                    <WithAuth>{<Component />}</WithAuth>
                  ) : (
                    <Component />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
