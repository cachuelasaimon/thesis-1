import { FC } from "react";
import { Dialog, DialogTitle } from "@mui/material";

interface IAddToCartProps {
  open: boolean;
  onClose: () => void;
}

const AddToCart: FC<IAddToCartProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Add to Cart </DialogTitle>
    </Dialog>
  );
};

export default AddToCart;
