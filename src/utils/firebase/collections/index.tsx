import {
  collection,
  doc,
  getFirestore,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
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

interface ICompanyInfo {
  ref: DocumentReference;
  string: string;
}

interface ICollections {
  companyInfo: ICompanyInfo;
  addresses: ICollection;
  carts: ICollection;
  orders: ICollection;
  products: ICollection;
  users: ICollection;
}

export const collections: ICollections = {
  companyInfo: {
    ref: doc(database, `${db_dev}`),
    string: "test",
  },
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
