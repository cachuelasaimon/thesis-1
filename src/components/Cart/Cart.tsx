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
import { useTheme } from "@mui/material/styles";

interface ICartProps {
  cartId: string;
}

const Cart: React.FC<ICartProps> = ({ cartId }) => {
  const theme = useTheme();
  const { docs: itemList } = useListen({
    collectionRef: collection(
      database,
      `${collections.carts.string}/${cartId}/items`
    ),
  });
  const items: IItem[] = itemList || [];

  const { docs: productList } = useListen({
    collectionRef: collections.products.ref,
  });
  const products: IProduct[] = productList || null;

  return (
    <>
      <Container maxWidth="lg">
        {/*  Desktop -> Tablet */}
        <Hidden mdDown>
          {products && items && items.length > 0 ? (
            <Grid container spacing={2}>
              {/* Cart Items Section */}
              <Grid item md={8}>
                {" "}
                <Paper sx={{ padding: theme.spacing(2) }}>
                  <Typography gutterBottom variant="h6">
                    Cart items ({items?.length || 0})
                  </Typography>
                  <Grid container spacing={3}>
                    {items
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
                <Paper sx={{ padding: theme.spacing(2) }}>
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
          ) : (
            <Box display="flex" justifyContent="center" flexDirection="column">
              <img
                alt="empty-cart-picture"
                src="/assets/images/EmptyCart.svg"
                style={{ maxHeight: "20rem", marginTop: theme.spacing(5) }}
              />
              <Box mt={3}>
                <Typography textAlign="center" color="textPrimary" variant="h5">
                  You have no items in your cart
                </Typography>
              </Box>
            </Box>
          )}
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
        {products && items && items.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: "fixed",
              bottom: theme.spacing(2),
            }}
          >
            <Button
              size="large"
              variant="contained"
              sx={{ borderRadius: "25px", width: "85%" }}
            >
              Proceed to checkout
            </Button>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh"
            flexDirection="column"
          >
            <img
              alt="empty-cart-picture"
              src="/assets/images/EmptyCart.svg"
              style={{ maxHeight: "10rem", marginTop: theme.spacing(5) }}
            />
            <Box mt={3}>
              <Typography textAlign="center" color="textPrimary" variant="h6">
                You have no items in your cart
              </Typography>
            </Box>
          </Box>
        )}
      </Hidden>
    </>
  );
};

export default Cart;
