import React from "react";
import { useParams } from "react-router-dom";

// Custom
import { UserWrapper } from "components";
import { useListen, collections } from "utils";

// ! Transfer to another file
interface IProduct {
  description?: string;
  id: string;
  name: string;
  price: number;
  stocks: number;
  tags?: string[];
}

const SingleProduct: React.FC = () => {
  const { productId } = useParams();
  const { docs } = useListen({ collectionRef: collections.products.ref });
  const products: IProduct[] = docs || [];
  const productNotFound = !products.some(
    (product: any) => product.id === productId
  );
  const product = products.find((product: any) => product.id === productId);

  if (!productNotFound) console.log("product data", product);
  return (
    <UserWrapper>
      {products && !productNotFound ? (
        <h3>{products.find((product) => product.id === productId)?.name}</h3>
      ) : (
        <h3>Product Not found</h3>
      )}
    </UserWrapper>
  );
};

export default SingleProduct;
