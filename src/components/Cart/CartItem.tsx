import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { altImageName } from "utils";

interface ICartItemProps {
  picture: string | undefined;
  quantity: number;
  name: string | undefined;
}

const CartItem: React.FC<ICartItemProps> = ({ picture, quantity, name }) => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <img
        src={picture}
        style={{
          maxHeight: "8rem",
          borderRadius: "5px",
          marginRight: theme.spacing(3),
        }}
        alt={name as string}
      />
      <Box>
        <Typography variant="h6">{name}</Typography>
      </Box>
    </Container>
  );
};

export default CartItem;
