import {
  addDoc,
  setDoc,
  // onSnapshot,
  getDoc,
  // query,
  // where,
  WhereFilterOp,
} from "firebase/firestore";
// import { useEffect, useState } from "react";

export interface ISetDocProps<T> {
  docRef: any;
  data: T;
}

export interface IAddDocProps<T> {
  collectionRef: any;
  data: T;
}

export interface IGetOneDocumentProps {
  docRef: any;
}

export interface ICollectionWithQueryProps {
  collectionRef: any;
  queryParams: {
    key: string;
    operator: WhereFilterOp;
    searchValue: any;
  };
}

export const Set: <T>(params: ISetDocProps<T>) => any = async ({
  docRef,
  data,
}) => {
  try {
    console.log("set doc logs", data);
    await setDoc(docRef, data);
  } catch (err) {
    throw err;
  }
};

export const Add: <T>(params: IAddDocProps<T>) => any = async ({
  collectionRef,
  data,
}) => {
  try {
    await addDoc(collectionRef, data);
  } catch (err) {
    throw err;
  }
};

export const getCollectionWithQuery: (
  params: ICollectionWithQueryProps
) => any = async ({ collectionRef, queryParams }) => {
  try {
    // const { key, operator, searchValue } = queryParams;
    // const q = query(collectionRef, where(key, operator, searchValue));
  } catch (err) {
    throw err;
  }
};

export const GetOne: (params: IGetOneDocumentProps) => any = async ({
  docRef,
}) => {
  try {
    const doc: any = await getDoc(docRef);
    return doc;
  } catch (err) {
    throw err;
  }
};

export default Set;
