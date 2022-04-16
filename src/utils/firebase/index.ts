import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import creds from "./config";

export const firebaseApp = initializeApp(creds);

export const database = getFirestore(firebaseApp);

// ? firestore collections
export * from "./collections/index";

// ? firestore functions
export * from "./setDoc";
