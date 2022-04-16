import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function MediaCard({
  name,
  description,
  picture,
  price,
  ...rest
}: any) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const triggerSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
    window.setTimeout(() => closeSnackbar(), 1500);
  };

  const navigate = useNavigate();

  console.log(rest);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={picture}
        alt="product-picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={() => navigate("/checkout")} size="small">
              Buy Now
            </Button>
          </Grid>
          <Grid onClick={() => triggerSnackbar("Added to Cart")} item>
            <Button size="small">Add To Cart</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
