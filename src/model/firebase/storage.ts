import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./app.js";

/** Initialize Cloud Storage and get a reference to the service */
const storage = getStorage(app);

/**
 * https://stackoverflow.com/a/53584010
 */
async function createBlobFromServedFile(path: string) {
  const url = new URL(path, import.meta.url);
  const res = await fetch(url);
  return await res.blob();
}

type UploadableObjects = Parameters<typeof uploadBytes>[1];
async function upload(path: string, file: UploadableObjects) {
  const fileRef = ref(storage, path);
  return await uploadBytes(fileRef, file);
}

async function getDownloadLink(path: string) {
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
}
