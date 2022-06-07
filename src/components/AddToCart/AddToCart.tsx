import { FC, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { IProduct } from "types";

interface IAddToCartProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
}

const AddToCart: FC<IAddToCartProps> = ({ open, onClose, product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { name } = product;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleAddToCart = () => {
    enqueueSnackbar("Item added to cart", { variant: "success" });
    window.setTimeout(() => closeSnackbar(), 1500);
    window.clearTimeout();
    onClose();
  };
  const handleCancel = () => onClose();

  const handleQuantityChange = (e: React.BaseSyntheticEvent) => {
    setQuantity(e.target.value);
  };
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      {/* Dialog Title */}
      <DialogTitle> Add to Cart </DialogTitle>
      {/* Dialog Content */}
      <DialogContent>
        <Typography>{name}</Typography>
        {/* Increase Decrease Item */}
        <Box display="flex">
          <IconButton onClick={() => setQuantity((q) => (q > 1 ? --q : q))}>
            <Remove />
          </IconButton>
          <InputBase
            type="number"
            inputProps={{
              max: product.stocks,
              min: 1,
              "aria-label": `item name:${product.name} quantity`,
            }}
            sx={(theme) => ({
              width: theme.spacing(5),
              input: {
                textAlign: "center",
                "moz-appearance": "textfield",
                "-webkit-appearance": "textfield",
              },
              "input::-webkit-inner-spin-button, input::-webkit-outer-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: "0",
                },
            })}
            value={quantity}
            onChange={handleQuantityChange}
          />{" "}
          <IconButton
            onClick={() => setQuantity((q) => (q < product.stocks ? ++q : q))}
          >
            <Add />
          </IconButton>
        </Box>
      </DialogContent>
      {/* Dialog Actions */}
      <DialogActions>
        <Box display="flex">
          <Button
            onClick={handleCancel}
            sx={(theme) => ({ marginRight: theme.spacing(2) })}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddToCart;
