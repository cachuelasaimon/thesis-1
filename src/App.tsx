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
  AdminOrderList,
  AdminProductList,
} from "pages";

const Pages: IPage[] = [
  { path: "/cart", Component: Cart, requireAuth: true, requireAdmin: false },
  { path: "/home", Component: Home, requireAuth: true, requireAdmin: false },
  { path: "/", Component: Login, requireAuth: false, requireAdmin: false },
  {
    path: "/sign-up",
    Component: SignUp,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: "/test",
    Component: APITest,
    requireAuth: false,
    requireAdmin: false,
  },
  { path: "*", Component: NotFound, requireAuth: false, requireAdmin: false },
  {
    path: "/product/:productId",
    Component: SingleProduct,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: "/orders",
    Component: AdminOrderList,
    requireAuth: true,
    requireAdmin: true,
  },

  {
    path: "/inventory",
    Component: AdminProductList,
    requireAuth: true,
    requireAdmin: true,
  },
];

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     background: (props: any) => props.palette.background.default,
//   },
// }));

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    true
    // localStorage.getItem("darkMode") === null
    //   ? true
    //   : localStorage.getItem("darkMode") === "true"
    //   ? true
    //   : false
  );
  // const classes = useStyles(theme as Theme);
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || "";
  const theme = darkMode ? CustomTheme.darkTheme : CustomTheme.lightTheme;

  const toggleTheme = () => {
    setDarkMode((curr) => {
      localStorage.setItem("darkMode", JSON.stringify(!curr));
      return !curr;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: theme.palette.background.default }}>
        <PayPalScriptProvider options={{ "client-id": clientId }}>
          <Router>
            <Routes>
              {Pages.map(({ path, Component, requireAuth, requireAdmin }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    requireAuth ? (
                      <WithAuth
                        requireAdmin={requireAdmin}
                        Component={Component}
                      />
                    ) : (
                      <Component
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                      />
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
