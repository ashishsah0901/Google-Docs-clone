import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXD9jwEFnwGDilD2nPQtKn5aBZAsmfmXo",
  authDomain: "netflix-clone-4e146.firebaseapp.com",
  projectId: "netflix-clone-4e146",
  storageBucket: "netflix-clone-4e146.appspot.com",
  messagingSenderId: "791969300645",
  appId: "1:791969300645:web:e511bd4f291dba492c8d4c",
};

const app = !getApps().lenght ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
