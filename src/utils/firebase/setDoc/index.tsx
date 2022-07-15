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

export interface ISetDocProps<T> {
  docRef: any;
  data: T;
}

export interface IAddDocProps<T> {
  docRef: any;
  data: T;
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

export const Set: <T>(params: ISetDocProps<T>) => any = async ({
  docRef,
  data,
}) => {
  try {
    console.log(data);
    await setDoc(docRef, data);
  } catch (err) {
    throw err;
  }
};

export const Add: <T>(params: IAddDocProps<T>) => any = async ({
  docRef,
  data,
}) => {
  try {
    await addDoc(docRef, data);
  } catch (err) {
    throw err;
  }
};

export const useListen: (params: IListenProps) => any = ({ collectionRef }) => {
  const [docs, setDocs] = useState<any[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      if (!collectionRef) {
        return;
      } else {
        onSnapshot(collectionRef, (snapshot: any) => {
          // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          setDocs(
            snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data(),
              doc,
            }))
          );
          // console.log(
          //   "data: ",
          //   snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          // );
          setLoading(false);
        });
      }
    };

    if (loading) fetch();
  }, [collectionRef, loading]);

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
