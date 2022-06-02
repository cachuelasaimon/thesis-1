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
  id,
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
    <Card
      sx={{
        maxWidth: 345,
        // "&:hover": { boxShadow: "10px 12px 33px -3px rgba(122,122,122,0.75)" },
      }}
    >
      <CardMedia
        sx={{ cursor: "pointer" }}
        component="img"
        height="200"
        image={picture}
        alt="product-picture"
        onClick={() => navigate(`/product/${id}`)}
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
