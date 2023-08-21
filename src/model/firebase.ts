/**
 * https://firebase.google.com/docs/firestore/quickstart
 */

import { FirebaseOptions, initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { VehicleProduct } from "./data.ts";

/**
 * `config` safe to expose
 */
function initializeFirestore(config: FirebaseOptions) {
  const app = initializeApp(config); // Initialize Firebase
  const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
  return [app, db] as const;
}
const [, db] = initializeFirestore({
  apiKey: "AIzaSyDhcLg8-qo72kxIDe_irmnMkoa-qvSNouA", // cspell:disable-line
  authDomain: "shopping-cart-5f766.firebaseapp.com",
  projectId: "shopping-cart-5f766",
  storageBucket: "shopping-cart-5f766.appspot.com",
  messagingSenderId: "846668528412",
  appId: "1:846668528412:web:3183f0b69b18eedd2f98d9",
});

const Collections = {
  Products: collection(db, "products"),
} as const;
type CollectionRef = (typeof Collections)[keyof typeof Collections];

async function create(collectionRef: CollectionRef, documentObject: object) {
  try {
    return await addDoc(collectionRef, documentObject);
  } catch (e) {
    throw new Error(`Error adding document: ${e}`);
  }
}

async function read(collectionRef: CollectionRef) {
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs;
}

export async function addProduct(product: VehicleProduct) {
  return await create(Collections.Products, product);
}

export async function readProducts(): Promise<VehicleProduct[]> {
  const products = await read(Collections.Products);
  return products.map((productRef) => productRef.data() as VehicleProduct);
}
