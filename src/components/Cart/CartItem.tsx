import React from "react";
import { Container, Paper, Typography, Grid } from "@mui/material";
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
    // <Grid container spacing={3}>
    //   <Grid container xs={12} md={6} item spacing={3}>
    //     {" "}
    //     <Grid item xs={4} sm={4}>
    //       {" "}
    //       <img
    //         src={picture}
    //         style={{
    //           maxWidth: "100%",
    //           borderRadius: "5px",
    //           marginRight: theme.spacing(3),
    //         }}
    //         alt={name as string}
    //       />
    //     </Grid>
    //     <Grid item xs={8} sm={8}>
    //       <Typography variant="h6">{name}</Typography>
    //     </Grid>
    //   </Grid>
    // </Grid>>
    <Grid container spacing={2}>
      <Grid item xs={4} sm={4}>
        {" "}
        <img
          src={picture}
          style={{
            maxWidth: "100%",
            borderRadius: "5px",
            marginRight: theme.spacing(3),
          }}
          alt={name as string}
        />
      </Grid>
      <Grid item xs={8} sm={8}>
        {" "}
        <Typography color="textPrimary" variant="h6">
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CartItem;
