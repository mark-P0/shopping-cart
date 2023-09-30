import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { LoadedProductData } from "../controller/loaders/product-loader.ts";
import { Vehicle } from "../model/vehicles.ts";
import {
  C,
  formatPrice,
  scrollbarCls,
  useNullableContext,
} from "../utilities.ts";
import { IconButton, TextButton } from "./components/Buttons.tsx";
import {
  ModalOverlay,
  ModalOverlayContext,
} from "./components/ModalOverlay.tsx";

type ProductToCartControlsProps = {
  product: Vehicle;
  minimumQty: number;
};
function ProductToCartControls({
  product,
  minimumQty,
}: ProductToCartControlsProps) {
  const { addToCart } = useNullableContext({ CartContext });
  const { close: hideOverlay } = useNullableContext({ ModalOverlayContext });
  const [qty, setQty] = useState(minimumQty);
  const [isDecrementDisabled, setIsDecrementDisabled] = useState(true);

  function addToCartAndHideOverlay() {
    addToCart(product, qty);
    hideOverlay();
  }

  function decrement() {
    const newQty = qty - 1;
    if (newQty === minimumQty) setIsDecrementDisabled(true);
    setQty(newQty);
  }
  function increment() {
    setQty(qty + 1);
    setIsDecrementDisabled(false);
  }

  return (
    <footer className="flex justify-end gap-6">
      <TextButton text="Add to Cart" onClick={addToCartAndHideOverlay} />
      <div className="flex items-center gap-1">
        <IconButton
          icon={<MinusIcon />}
          className="h-8"
          onClick={decrement}
          disabled={isDecrementDisabled}
        />
        <span className="h-7 w-7 grid place-items-center">{qty}</span>
        <IconButton icon={<PlusIcon />} className="h-8" onClick={increment} />
      </div>
    </footer>
  );
}

export function ProductView() {
  const productId = useLoaderData() as LoadedProductData;
  const { vehicles } = useNullableContext({ VehiclesContext });
  const data = vehicles.find(({ id }) => id === productId);

  useEffect(() => {
    if (data === undefined) {
      document.title = "... | Solar Crown";
      return;
    }

    const { brand, model } = data;
    document.title = `${brand} ${model} | Solar Crown`;
  }, [data]);

  if (data === undefined) {
    return null;
  }

  const { brand, model, description, image } = data;
  const price = formatPrice("compact", data.price);

  const descClasses = C(
    "overflow-hidden overflow-y-auto",
    scrollbarCls,
    "py-2 px-3",
    "bg-neutral-800"
  );
  return (
    <ModalOverlay modalOrigin="center" afterTransition={() => history.back()}>
      <article className="overflow-hidden w-3/5 h-3/5 grid grid-cols-[3fr_2fr] bg-neutral-700 rounded-xl">
        <figure className="grid place-items-center">
          <img src={image} alt="" />
        </figure>
        <section className="overflow-hidden grid grid-rows-[auto_1fr_auto] gap-4 pr-4 py-6 pb-5">
          <header className="flex justify-between">
            <div className="grid gap-1">
              <h1 className="uppercase tracking-wider font-bold text-2xl leading-none">
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
