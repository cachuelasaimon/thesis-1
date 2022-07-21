import {
  addDoc,
  setDoc,
  // onSnapshot,
  getDoc,
  // query,
  // where,
  WhereFilterOp,
  DocumentReference,
  DocumentSnapshot,
  doc,
  CollectionReference,
  collection,
} from "firebase/firestore";
import { database } from "utils";
import { NewItem } from "types";
// import { useEffect, useState } from "react";

export interface ISetDocProps<T> {
  docRef: string | DocumentReference;
  data: T;
}

export interface IAddDocProps<T> {
  collectionRef: string | CollectionReference;
  data: NewItem<T>;
}

export interface IGetOneDocumentProps {
  docRef: DocumentReference | string;
}

export interface ICollectionWithQueryProps {
  collectionRef: string | CollectionReference;
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
    await setDoc(
      typeof docRef === "string" ? doc(database, docRef) : docRef,
      data as any
    );
  } catch (err) {
    throw err;
  }
};

export const Add: <T>(params: IAddDocProps<T>) => any = async ({
  collectionRef,
  data,
}) => {
  try {
    await addDoc(
      typeof collectionRef === "string"
        ? collection(database, collectionRef)
        : collectionRef,
      {
        ...data,
        createdAt: new Date(),
      }
    );
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

export const Get = async <T,>({ docRef }: IGetOneDocumentProps) => {
  try {
    const snap: DocumentSnapshot = await getDoc(
      typeof docRef === "string" ? doc(database, docRef) : docRef
    );

    console.log("get doc resutl", snap.data());
    return snap.data() as T;
  } catch (err) {
    throw err;
  }
};

export default Set;
