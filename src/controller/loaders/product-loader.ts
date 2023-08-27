/**
 * Separate file for loaders to maintain Fast Refresh feature
 */

import { LoaderFunctionArgs } from "react-router-dom";

export function productLoader({ params }: LoaderFunctionArgs) {
  const { productId } = params;
  if (productId === undefined) {
    throw new Error(`Unknown product ID ${productId} to be loaded`);
  }

  return productId;
}
export type LoadedProductData = ReturnType<typeof productLoader>;
