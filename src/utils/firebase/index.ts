import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseCredentials from "./config";

export const firebaseApp = initializeApp(firebaseCredentials);

export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// ? firestore collections
export * from "./collections/index";

// ? firestore functions
export * from "./setDoc";

// ? authentication functions
export * from "./authentication";
