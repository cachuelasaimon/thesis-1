import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
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

import {
  Login,
  Home,
  Cart,
  SingleProduct,
  NotFound,
  SignUp,
  ForgotPassword,
} from "pages";

const Pages: IPage[] = [
  { path: "/cart", Component: Cart, requireAuth: true },
  { path: "/home", Component: Home, requireAuth: true },
  { path: "/", Component: Login, requireAuth: false },
  { path: "/sign-up", Component: SignUp, requireAuth: false },
  { path: "/forgot-password", Component: ForgotPassword, requireAuth: false },
  { path: "/test", Component: APITest, requireAuth: false },
  { path: "*", Component: NotFound, requireAuth: false },
  { path: "/product/:productId", Component: SingleProduct, requireAuth: true },
];

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     background: (props: any) => props.palette.background.default,
//   },
// }));

function App() {
  const [theme] = useState(CustomTheme.darkTheme);
  // const classes = useStyles(theme as Theme);
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || "";

  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: theme.palette.background.default }}>
        <PayPalScriptProvider options={{ "client-id": clientId }}>
          <Router>
            <Routes>
              {Pages.map(({ path, Component, requireAuth }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    requireAuth ? (
                      <WithAuth Component={Component} />
                    ) : (
                      <Component />
                    )
                  }
                />
              ))}
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
