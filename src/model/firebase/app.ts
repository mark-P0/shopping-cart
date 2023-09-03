import { FirebaseOptions, initializeApp } from "firebase/app";

/** Safe to expose */
const config: FirebaseOptions = {
  apiKey: "AIzaSyDhcLg8-qo72kxIDe_irmnMkoa-qvSNouA", // cspell:disable-line
  authDomain: "shopping-cart-5f766.firebaseapp.com",
  projectId: "shopping-cart-5f766",
  storageBucket: "shopping-cart-5f766.appspot.com",
  messagingSenderId: "846668528412",
  appId: "1:846668528412:web:3183f0b69b18eedd2f98d9",
};

/** Initialize Firebase */
export const app = initializeApp(config);
