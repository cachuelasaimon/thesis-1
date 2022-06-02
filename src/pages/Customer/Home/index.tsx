import React from "react";
import { UserWrapper, ProductCard } from "components";
import { Container, Grid } from "@mui/material";

import { collections, useListen } from "utils";

const HomePage: React.FC = () => {
  const { docs: productList } = useListen({
    collectionRef: collections.products.ref,
  });

  return (
    <div style={{ overflowX: "hidden" }}>
      <UserWrapper />
      <Container maxWidth="xl">
        <Grid sx={{ margin: "0 5rem" }} container>
          <Grid item>
            <h1>Home</h1>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            {productList &&
              productList.length > 0 &&
              productList.map((product: any, index: number) => (
                <Grid key={index} item xs={12} md={4} lg={3}>
                  <ProductCard {...product} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
