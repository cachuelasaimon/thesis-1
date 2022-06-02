import { useState, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MUI
import {
  Grid,
  Button,
  Typography,
  Rating,
  Box,
  Container,
} from "@mui/material";

// Custom
import { UserWrapper, ProductViewer, AddToCart } from "components";
import { collection } from "firebase/firestore";
import { useListen, collections, database, formatCurrency } from "utils";
import { IProduct, IReview } from "types";
// ! Transfer to another file

const SingleProduct: FC = () => {
  const [openAddToCart, setOpenAddToCart] = useState<boolean>(false);
  const handleOpenAddToCart = () => setOpenAddToCart(true);
  const handleCloseAddToCart = () => setOpenAddToCart(false);
  const { productId } = useParams();
  // Fetch Product Details
  const { docs: productDocs } = useListen({
    collectionRef: collections.products.ref,
  });
  const products: IProduct[] = productDocs || [];
  const productNotFound = !products.some(
    (product: any) => product.id === productId
  );
  const product = products.find((product: any) => product.id === productId);

  // Fetch Reviews
  const { docs: reviewsDocs } = useListen({
    collectionRef: collection(
      database,
      `${collections.products.string}/${productId}/reviews`
    ),
  });
  const reviews: IReview[] = reviewsDocs || [];
  const noReviews = reviewsDocs.length < 1;
  const rating = !noReviews
    ? reviews.reduce((acc: number, curr: IReview) => acc + curr.rating, 0) /
      reviews.length
    : 0;
  console.log(rating);

  const navigate = useNavigate();
  if (productNotFound)
    return (
      <>
        <UserWrapper />
        <h2 style={{ textAlign: "center", marginTop: "41vh" }}>
          We could not find what you're looking for... {":<"}
        </h2>
        <Grid container justifyContent={"center"}>
          <Button variant="contained" onClick={() => navigate("/home")}>
            Go Home
          </Button>
        </Grid>
      </>
    );

  return (
    <>
      <UserWrapper />
      <div style={{ margin: " 1.5rem 3rem" }}>
        {/* Display Product Details */}
        <Container maxWidth="xl">
          {" "}
          {products && !productNotFound && product && (
            <Grid container spacing={2}>
              <Grid item container md={12} lg={7}>
                <ProductViewer
                  productName={product.name}
                  picture={product.picture}
                />
              </Grid>{" "}
              <Grid
                item
                container
                md={12}
                lg={5}
                alignContent="flex-start"
                rowSpacing={0}
              >
                <Typography variant="h3" mb={3} sx={{ minWidth: "100%" }}>
                  {product.name}
                </Typography>
                {!noReviews && (
                  <Box display="flex" width="100%" alignItems="center">
                    <Rating readOnly precision={0.5} value={rating} />{" "}
                    <Typography variant="body2" mx={1}>
                      {reviews.length} reviews
                    </Typography>
                  </Box>
                )}
                <Box my={4} alignSelf={"flex-end"} display="flex" width="100%">
                  <Typography variant="body1">
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>

                <Box width="100%" display="flex" justifyContent="center">
                  <Button
                    onClick={handleOpenAddToCart}
                    sx={{
                      padding: "1.5rem 0",
                      borderRadius: "25px",
                    }}
                    fullWidth
                    variant="contained"
                  >
                    Add to Cart
                  </Button>
                </Box>

                <Box my={3} width="100%">
                  <Typography my={2} sx={{ minWidth: "100%" }} variant="h5">
                    Description
                  </Typography>
                  <Typography variant="body1">{product.description}</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          <AddToCart onClose={handleCloseAddToCart} open={openAddToCart} />
        </Container>
      </div>
    </>
  );
};

export default SingleProduct;
