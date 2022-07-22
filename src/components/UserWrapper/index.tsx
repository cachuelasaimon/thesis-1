import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useErrorNotif, auth, useLogin, Get, collections } from "utils";
import { ICompanyInformation, IUser, ROLES } from "types";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [companyInfo, setCompanyInfo] = useState<
    ICompanyInformation | undefined
  >();
  const [userInfo, setUserInfo] = useState<IUser | undefined>();

  const { user } = useLogin();

  useEffect(() => {
    const getCompanyInfo = async () => {
      const data = await Get<ICompanyInformation>({
        docRef: collections.companyInfo.ref,
      });
      setCompanyInfo(data);
    };

    if (!companyInfo) getCompanyInfo();
  }, [companyInfo]);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await Get<IUser>({
        docRef: `${collections.users.string}/${user?.uid}`,
      });
      setUserInfo(data);
    };

    if (!userInfo && user) getUserInfo();
  }, [userInfo, user]);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { checkState } = useLogin("/");
  const showError = useErrorNotif();

  const handleLogout = async () => {
    try {
      signOut(auth);
      checkState();
    } catch (err) {
      showError(err);
    }
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => navigate("/home")}>
          <Box display="flex" alignItems="center">
            <ListItemIcon>
              <img
                draggable={false}
                src={companyInfo?.logo}
                style={{ maxHeight: "2rem" }}
                alt="company-logo"
              />
            </ListItemIcon>
            <Typography>
              <strong>{companyInfo?.companyName}</strong>
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          { label: "Cart", Icon: ShoppingCartIcon, link: "/cart" },
          // { label: "Wishlist", Icon: StarIcon, link: "/wishlist" },
          // { label: "Contact", Icon: PhoneIcon, link: "/contact" },
        ].map(({ label, Icon, link }) => (
          <ListItem onClick={() => navigate(link)} button key={label}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}

        <Divider />
        {userInfo &&
          userInfo.roles.includes(ROLES.ADMIN) &&
          [
            { label: "Orders", Icon: ReceiptLongIcon, link: "/orders" },
            { label: "Inventory", Icon: InventoryIcon, link: "/inventory" },
            // { label: "Contact", Icon: PhoneIcon, link: "/contact" },
          ].map(({ label, Icon, link }) => (
            <ListItem onClick={() => navigate(link)} button key={label}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const navigate = useNavigate();
  return (
    <>
      {companyInfo && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                ></Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </div>
      )}
    </>
  );
}
