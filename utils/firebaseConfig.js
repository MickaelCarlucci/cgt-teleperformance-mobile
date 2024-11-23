import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase
const firebaseClientConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialisation de Firebase
const firebaseApp = initializeApp(firebaseClientConfig);
const firebaseAuth = getAuth(firebaseApp);

// Exportez l'authentification pour l'utiliser dans l'application
export { firebaseAuth };
