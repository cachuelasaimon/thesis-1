import React from "react";
import { collection } from "firebase/firestore";
import { database, collections, useListen } from "utils";
import { IItem, IProduct } from "types";
import CartItem from "./CartItem";
import {
  Grid,
  Hidden,
  Paper,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";

interface ICartProps {
  cartId: string;
}

const Cart: React.FC<ICartProps> = ({ cartId }) => {
  const { docs: itemList } = useListen({
    collectionRef: collection(
      database,
      `${collections.carts.string}/${cartId}/items`
    ),
  });
  const items: IItem[] = itemList || null;

  const { docs: productList } = useListen({
    collectionRef: collections.products.ref,
  });
  const products: IProduct[] = productList || null;

  return (
    <>
      <Container maxWidth="lg">
        {/*  Desktop -> Tablet */}
        <Hidden mdDown>
          <Grid container spacing={2}>
            {/* Cart Items Section */}
            <Grid item md={8}>
              {" "}
              <Paper sx={(theme) => ({ padding: theme.spacing(2) })}>
                <Typography gutterBottom variant="h6">
                  Cart items ({items?.length})
                </Typography>
                <Grid container spacing={3}>
                  {items &&
                    products &&
                    items
                      .map((item) => ({
                        ...products.find(
                          (product) => product.id === item.productId
                        ),
                        ...item,
                      }))
                      .map(({ picture, quantity, name, id }) => (
                        <Grid key={name || "" + id} item xs={12}>
                          <CartItem
                            picture={picture}
                            quantity={quantity}
                            name={name}
                            key={id}
                          />
                        </Grid>
                      ))}
                </Grid>
              </Paper>
            </Grid>
            {/* Checkout Section*/}
            <Grid item md={4}>
              <Paper sx={(theme) => ({ padding: theme.spacing(2) })}>
                <Typography variant="h6">Proceed to Checkout</Typography>
                <Button
                  fullWidth={true}
                  variant="contained"
                  sx={{ borderRadius: "5px" }}
                >
                  Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Hidden>
        {/* Mobile */}
        <Hidden mdUp>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h6">
                Cart Items ({items?.length})
              </Typography>
            </Grid>
          </Grid>
        </Hidden>
      </Container>
      <Hidden mdUp>
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "fixed",
            bottom: theme.spacing(2),
          })}
        >
          <Button
            size="large"
            variant="contained"
            sx={{ borderRadius: "25px", width: "85%" }}
          >
            Proceed to checkout
          </Button>
        </Box>
      </Hidden>
    </>
  );
};

export default Cart;
