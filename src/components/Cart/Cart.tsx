import React, { useState } from "react";
import { collection } from "firebase/firestore";
import {
  database,
  collections,
  useListen,
  useErrorNotif,
  createSimpleTransaction,
} from "utils";
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
import Checkout from "./Checkout";

interface ICartProps {
  cartId: string;
}

const Cart: React.FC<ICartProps> = ({ cartId }) => {
  const [selectedItems, setSelectedItems] = useState<IProduct[] | null>([]);
  const showError = useErrorNotif();
  const theme = useTheme();
  const { docs: itemList } = useListen<IItem>({
    collectionRef: collection(
      database,
      `${collections.carts.string}/${cartId}/items`
    ),
  });
  const items = itemList || [];

  const { docs: productList } = useListen<IProduct>({
    collectionRef: collections.products.ref,
  });
  const products = productList || null;

  const handleCheckout = async () => {
    try {
      if (itemList !== null) {
        await createSimpleTransaction(
          itemList.map((item: any) => ({
            read: {
              ref: `${collections.carts.string}/${cartId}/items/${item.id}`,
              properties: ["productId", "quantity"],
            },
            write: {
              ref: `${collections.orders.string}/${cartId}/items/${item.id}`,
              initialProps: { createdAt: new Date() },
              properties: ["productId", "quantity"],
            },
          }))
        );
      }
    } catch (err) {
      showError();
    }
  };
  console.log("selected items", selectedItems);

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
                      .map(
                        ({
                          id,
                          name,
                          ...rest
                        }: Partial<IProduct> &
                          Partial<IItem> & { id: string }) => (
                          <Grid key={name || "" + id} item xs={12}>
                            <CartItem
                              cartId={cartId}
                              isSelected={Boolean(
                                selectedItems?.some((item) => item.id === id)
                              )}
                              id={id}
                              setSelectedItems={setSelectedItems}
                              {...rest}
                              name={name}
                              key={id}
                            />
                          </Grid>
                        )
                      )}
                  </Grid>
                </Paper>
              </Grid>
              {/* Checkout Section*/}
              <Checkout
                selectedItems={selectedItems}
                handleCheckout={handleCheckout}
              />
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" flexDirection="column">
              <img
                alt="empty-cart"
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
              alt="empty-cart"
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
