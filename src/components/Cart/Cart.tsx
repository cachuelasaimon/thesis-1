import React from "react";
import { collection } from "firebase/firestore";
import { database, collections, useListen } from "utils";
import { IItem, IProduct } from "types";
import CartItem from "./CartItem";

interface ICartProps {
  cartId: string;
}

const Cart: React.FC<ICartProps> = ({ cartId }) => {
  const { docs: itemList } = useListen({
    collectionRef: collection(
      database,
      `${collections.carts.string}/${cartId}/items`
    ),
  });
  const items: IItem[] = itemList || null;

  const { docs: productList } = useListen({
    collectionRef: collections.products.ref,
  });
  const products: IProduct[] = productList || null;

  console.log(
    "cart item logs",
    items.map((item) => ({
      ...products.find((product) => product.id === item.productId),
      ...item,
    }))
  );
  return (
    <>
      {items &&
        products &&
        items
          .map((item) => ({
            ...products.find((product) => product.id === item.productId),
            ...item,
          }))
          .map(({ picture, quantity, name, id }) => (
            <CartItem
              picture={picture}
              quantity={quantity}
              name={name}
              key={id}
            />
          ))}
    </>
  );
};

export default Cart;
