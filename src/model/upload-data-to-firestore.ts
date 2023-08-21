import data from "./data.ts";
import { addProduct, readProducts } from "./firebase.ts";

for (const product of data) {
  const res = await addProduct(product);
  console.log(res);
}
console.log("Done adding products");

const products = await readProducts();
console.log(products);
