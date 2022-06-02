import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// MUI
import { Grid, Button, Typography, Rating, Box } from "@mui/material";

// Custom
import { UserWrapper, ProductViewer } from "components";
import { collection } from "firebase/firestore";
import { useListen, collections, database } from "utils";

// ! Transfer to another file
interface IProduct {
  doc: any; // ? Firebase Document
  description?: string;
  picture: string;
  id: string;
  name: string;
  price: number;
  stocks: number;
  tags?: string[];
  ratings?: number;
}

interface IReview {
  description: string;
  picture: string;
  rating: number;
  title: string;
  userID: string;
}

const SingleProduct: React.FC = () => {
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
        {products && !productNotFound && product && (
          <Grid container spacing={3}>
            <Grid item container md={12} lg={6}>
              <ProductViewer
                productName={product.name}
                picture={product.picture}
              />
            </Grid>{" "}
            <Grid
              item
              container
              md={12}
              lg={6}
              alignContent="flex-start"
              rowSpacing={0}
            >
              <Typography variant="h4" mb={3} sx={{ minWidth: "100%" }}>
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
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
