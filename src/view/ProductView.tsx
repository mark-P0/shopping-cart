import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehicleContext.tsx";
import { LoadedProductData } from "../controller/loaders/product-loader.ts";
import { Vehicle } from "../model/vehicles.ts";
import { C, State, formatPrice, useNullableContext } from "../utilities.ts";
import {
  ModalOverlay,
  ModalOverlayContext,
} from "./components/ModalOverlay.tsx";
import { Spinner } from "./components/Spinner.tsx";

type QuantityCounterProps = {
  state: State<number>;
  minimumCt: number;
};
function QuantityCounter({ state, minimumCt }: QuantityCounterProps) {
  const [ct, setCt] = state;
  const [isDecrementDisabled, setIsDecrementDisabled] = useState<boolean>(true);

  function decrement() {
    const newCt = ct - 1;
    if (newCt === minimumCt) setIsDecrementDisabled(true);
    setCt(newCt);
  }
  function increment() {
    setCt(ct + 1);
    setIsDecrementDisabled(false);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        disabled={isDecrementDisabled}
        className="bg-black disabled:opacity-25 rounded-full h-8 w-8 font-bold"
        onClick={decrement}
      >
        -
      </button>
      <span className="h-7 w-7 grid place-items-center">{ct}</span>
      <button
        className="bg-black rounded-full h-8 w-8 font-bold"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}

type AddToCartButtonProps = {
  product: Vehicle;
  quantity: number;
};
function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
  const { addToCart } = useNullableContext(CartContext);
  const { close: hideOverlay } = useNullableContext(ModalOverlayContext);

  function addToCartAndHideOverlay() {
    addToCart(product, quantity);
    hideOverlay();
  }

  return (
    <button
      className="bg-black px-3 py-2 uppercase font-bold tracking-wider"
      onClick={addToCartAndHideOverlay}
    >
      Add to Cart
    </button>
  );
}

type ProductToCartControlsProps = {
  product: Vehicle;
  minimumQty: number;
};
function ProductToCartControls({
  product,
  minimumQty,
}: ProductToCartControlsProps) {
  const [ct, setCt] = useState<number>(minimumQty);

  return (
    <footer className="flex justify-end gap-6">
      <AddToCartButton product={product} quantity={ct} />
      <QuantityCounter state={[ct, setCt]} minimumCt={minimumQty} />
    </footer>
  );
}

export function ProductView() {
  const productId = useLoaderData() as LoadedProductData;
  const vehicles = useNullableContext(VehiclesContext);
  const data = vehicles.find(({ id }) => id === productId);
  if (data === undefined) {
    return (
      <ModalOverlay>
        <Spinner className="w-16 h-16" />
      </ModalOverlay>
    );
  }

  const { brand, model, description, image } = data;
  const price = formatPrice(data.price);

  const descClasses = C(
    "overflow-hidden overflow-y-auto",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600",
    "py-2 px-3",
    "bg-neutral-800"
  );
  return (
    <ModalOverlay onDismissEnd={() => history.back()}>
      <article className="overflow-hidden w-3/5 h-3/5 grid grid-cols-[3fr_2fr] bg-neutral-700 rounded-xl">
        <figure className="grid place-items-center">
          <img src={image} alt="" />
        </figure>
        <section className="overflow-hidden grid grid-rows-[auto_1fr_auto] gap-4 pr-4 py-6 pb-5">
          <header className="flex justify-between">
            <div>
              <h1 className="uppercase tracking-wider font-bold text-2xl">
                {model}
              </h1>
              <p className="uppercase text-xs tracking-widest text-neutral-400">
                {brand}
              </p>
            </div>
            <div>
              <p className="tracking-widest text-sm font-thin bg-neutral-800 px-2 py-1">
                {price}
              </p>
            </div>
          </header>
          <p className={descClasses}>{description}</p>
          <ProductToCartControls product={data} minimumQty={1} />
        </section>
      </article>
    </ModalOverlay>
  );
}
