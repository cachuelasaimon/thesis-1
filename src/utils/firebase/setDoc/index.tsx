import {
  addDoc,
  setDoc,
  onSnapshot,
  getDoc,
  // query,
  // where,
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export interface ISetDocProps {
  docRef: any;
  data: any;
}

export interface IAddDocProps {
  docRef: any;
  data: any;
}

export interface IListenProps {
  collectionRef: any;
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

export const Set: (params: ISetDocProps) => any = async ({ docRef, data }) => {
  await setDoc(docRef, data);
};

export const Add: (params: IAddDocProps) => any = async ({ docRef, data }) => {
  try {
    await addDoc(docRef, data);
  } catch (err) {
    throw err;
  }
};

export const useListen: (params: IListenProps) => any = ({ collectionRef }) => {
  const [docs, setDocs] = useState<any[] | null>([]);
  useEffect(() => {
    if (!collectionRef) {
      return;
    } else {
      onSnapshot(collectionRef, (snapshot: any) => {
        // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        setDocs(snapshot.docs.map((doc: any) => doc.data()));
        console.log(
          "data: ",
          snapshot.docs.map((doc: any) => doc.data())
        );
      });
    }
  }, [collectionRef]);

  return { docs };
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
