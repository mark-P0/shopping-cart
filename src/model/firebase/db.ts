import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { Vehicle } from "../vehicles.js";
import { app } from "./app.js";

/** Initialize Cloud Firestore and get a reference to the service */
const db = getFirestore(app);

const collectionPaths = ["products"] as const;
type CollectionPath = (typeof collectionPaths)[number];

async function create(collectionPath: CollectionPath, document: object) {
  try {
    return await addDoc(collection(db, collectionPath), document);
  } catch (e) {
    throw new Error(`Error adding document: ${e}`);
  }
}
export { create }; // DELETEME - "Fake" usage to allow build

async function createWithId(
  collectionPath: CollectionPath,
  id: string,
  document: object
) {
  try {
    await setDoc(doc(db, collectionPath, id), document);
  } catch (e) {
    throw new Error(`Error adding document: ${e}`);
  }
}

async function read(collectionPath: CollectionPath) {
  const querySnapshot = await getDocs(collection(db, collectionPath));
  return querySnapshot.docs;
}

export async function addProduct(product: Vehicle) {
  const { id } = product;
  return await createWithId("products", id, product);
}

export async function readProducts(): Promise<Vehicle[]> {
  const products = await read("products");
  return products.map((productRef) => productRef.data() as Vehicle);
}
