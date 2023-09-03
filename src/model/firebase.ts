/**
 * - https://firebase.google.com/docs/firestore/quickstart
 * - https://firebase.google.com/docs/storage/web/start
 */

import { FirebaseOptions, initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { TEMPORARY_HARDCODED_DATA } from "./vehicles.ts";
// import { VehicleProduct } from "./data.ts";

/**
 * `config` safe to expose
 */
const config: FirebaseOptions = {
  apiKey: "AIzaSyDhcLg8-qo72kxIDe_irmnMkoa-qvSNouA", // cspell:disable-line
  authDomain: "shopping-cart-5f766.firebaseapp.com",
  projectId: "shopping-cart-5f766",
  storageBucket: "shopping-cart-5f766.appspot.com",
  messagingSenderId: "846668528412",
  appId: "1:846668528412:web:3183f0b69b18eedd2f98d9",
};

const app = initializeApp(config); // Initialize Firebase
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
const storage = getStorage(app); // Initialize Cloud Storage and get a reference to the service
// console.log({ app, db, storage });

/**
 * https://stackoverflow.com/a/53584010
 */
async function createBlob(id: string) {
  const filename = `${id}.png`;
  const url = new URL(`./images/${filename}`, import.meta.url);
  const res = await fetch(url);
  return await res.blob();
}

async function createFile(id: string) {
  const filename = `${id}.png`;
  const data = await createBlob(id);
  return new File([data], filename, { type: "image/jpeg" });
}

// for (const { id } of TEMPORARY_HARDCODED_DATA) {
//   const file = await createBlob(id);
//   const imgRef = ref(storage, `images/${id}.png`);
//   await uploadBytes(imgRef, file);
//   console.log(`images/${id}.png`);
// }

// const links = await Promise.all(
//   TEMPORARY_HARDCODED_DATA.map(({ id }) =>
//     getDownloadURL(ref(storage, `images/${id}.png`))
//   )
// );
// console.log(links);
