import { FC } from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckoutProps } from "types";

const Checkout: FC<CheckoutProps> = ({ selectedItems, handleCheckout }) => {
  const theme = useTheme();
  return (
    <Grid item md={4}>
      <Paper sx={{ padding: theme.spacing(2) }}>
        <Typography variant="h6">Proceed to Checkout</Typography>
        {selectedItems && selectedItems.length > 0 ? (
          selectedItems.map(({ name, quantity }) => (
            <Box mt={2} mb={1}>
              <Typography gutterBottom variant="body2">
                {name}
              </Typography>
              <Typography gutterBottom variant="caption" color="textSecondary">
                × {quantity}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            component="div"
            sx={{
              minHeight: "5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            textAlign="center"
            variant="body2"
            color="textSecondary"
          >
            No Items selected
          </Typography>
        )}
        <Button
          disabled={!Boolean(selectedItems && selectedItems.length > 0)}
          onClick={handleCheckout}
          fullWidth={true}
          variant="contained"
          sx={{ borderRadius: "5px" }}
        >
          Checkout
        </Button>
      </Paper>
    </Grid>
  );
};

export default Checkout;
