import React from "react";
import { UserWrapper, Cart } from "components";
import { Box, Grid, Paper } from "@mui/material";
import { collections, useListen } from "utils";
import { IUser } from "types";

const CartPage: React.FC = () => {
  // ! Replace with logged in user ID
  const userId = "K3z4QCFHC3iSjCEMUYjZ";
  const { docs: userList } = useListen({
    collectionRef: collections.users.ref,
  });
  const users: IUser[] = userList || null;
  const user: IUser | null =
    users?.find((user: IUser) => user.id === userId) || null;
  const userNotFound = !user;

  const cartId = user?.cartId || "";

  if (userNotFound) return <>User Not Found</>;

  return (
    <div style={{ overflowX: "hidden" }}>
      <UserWrapper />
      <Grid sx={{ minHeight: "100vh" }} container>
        {cartId && (
          <Box
            width="100%"
            my={3}
            sx={(theme) => ({
              paddingBottom: theme.spacing(3),
            })}
          >
            {/* <Paper>Test</Paper> */}
            <Cart cartId={cartId} />
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default CartPage;
