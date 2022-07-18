import { collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, CollectionReference } from "firebase/firestore";
import creds from "utils/firebase/config";

const firebaseApp = initializeApp(creds);

const database = getFirestore(firebaseApp);

const db_dev = process.env.REACT_APP_FIREBASE_DB_DEV
  ? process.env.REACT_APP_FIREBASE_DB_DEV
  : "database/firebase";

interface ICollection {
  ref: CollectionReference;
  string: string;
}

interface ICollections {
  addresses: ICollection;
  carts: ICollection;
  orders: ICollection;
  products: ICollection;
  users: ICollection;
}

export const collections: ICollections = {
  addresses: {
    ref: collection(database, `${db_dev}/address`),
    string: `${db_dev}/address`,
  },
  carts: {
    ref: collection(database, `${db_dev}/cart`),
    string: `${db_dev}/cart`,
  },
  orders: {
    ref: collection(database, `${db_dev}/orders`),
    string: `${db_dev}/orders`,
  },
  products: {
    ref: collection(database, `${db_dev}/products`),
    string: `${db_dev}/products`,
  },
  users: {
    ref: collection(database, `${db_dev}/users`),
    string: `${db_dev}/users`,
  },
};
