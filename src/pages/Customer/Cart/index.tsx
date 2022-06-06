import React from "react";
import { UserWrapper, Cart } from "components";
import { Box } from "@mui/material";
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
      <Box
        sx={(theme) => ({
          maxWidth: "100vw",
          margin: `0 ${theme.spacing(5)}`,
          boxSizing: "border-box",
        })}
      >
        <h1>Cart</h1>
        <>
          {cartId && (
            <Box
              sx={(theme) => ({
                paddingBottom: theme.spacing(3),
              })}
            >
              <Cart cartId={cartId} />
            </Box>
          )}
        </>
      </Box>
    </div>
  );
};

export default CartPage;
