import React from "react";
import { UserWrapper } from "components";
import { Grid } from "@mui/material";

const Cart: React.FC = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <UserWrapper />
      <Grid sx={{ margin: "0 5rem" }} container>
        <Grid item>
          <h1>Cart</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
