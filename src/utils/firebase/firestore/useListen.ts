import { useState, useEffect } from "react";
import { onSnapshot, CollectionReference } from "firebase/firestore";

export interface IListenProps {
  collectionRef: CollectionReference;
}

/**
 * @param collectionRef - firebase CollectionReference, object can be used for adding documents, getting document references, and querying for documents (using query).
 * @returns { docs, isLoading } Array of items in the type of generic provided and a loading state for rendering loading UI
 */

export const useListen = <T>({ collectionRef }: IListenProps) => {
  const [docs, setDocs] = useState<(T & { id: string })[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          setIsLoading(false);
        });
      }
    };

    if (isLoading) fetch();
  }, [collectionRef, isLoading]);

  return { docs, isLoading };
};
