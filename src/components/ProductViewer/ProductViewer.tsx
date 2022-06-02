import { FC } from "react";

interface IProductViewerProps {
  picture: string;
  productName: string;
}

const ProductViewer: FC<IProductViewerProps> = ({ picture, productName }) => {
  return (
    <img
      style={{ maxWidth: "100%", borderRadius: "5px" }}
      alt={productName.toLowerCase().split(" ").join("-")}
      src={picture}
    />
  );
};

export default ProductViewer;
