import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren, createContext, useState } from "react";
import { CartContext } from "../../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../../model/vehicles.ts";
import { formatPrice, useNullableContext } from "../../utilities.ts";
import { ModalOverlay } from "./ModalOverlay.tsx";

type CartPreviewProvision = {
  isShown: boolean;
  show: () => void;
  hide: () => void;
};
export const CartPreviewContext = createContext<CartPreviewProvision | null>(
  null
);

function ItemPreview({ id, qty }: { id: Vehicle["id"]; qty: number }) {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const data = vehicles.find(({ id: vehicleId }) => vehicleId === id);
  if (data === undefined) {
    throw new Error(`Unexpected vehicle ID ${id}`);
  }

  const { image, model, brand } = data;
  const price = formatPrice(data.price * qty);

  return (
    <section className="grid grid-cols-[3fr_4fr_2fr] items-center bg-neutral-700 rounded-xl py-3 pr-5 pl-2 gap-3">
      <img src={image} alt="" />
      <div>
        <p className="uppercase tracking-widest text-sm font-bold leading-none line-clamp-2 ">
          {model}
        </p>
        <p className="uppercase tracking-widest text-xs text-neutral-400">
          {brand}
        </p>
      </div>
      <div className="text-end">
        <p className="text-xs tracking-widest text-neutral-400">x{qty}</p>
        <p className="text-xs tracking-widest">{price}</p>
      </div>
    </section>
  );
}

export function CartPreview() {
  const { cart } = useNullableContext({ CartContext });
  const { hide } = useNullableContext({ CartPreviewContext });

  const cartProducts = [...cart.entries()].reverse();
  const isCartEmpty = cartProducts.length === 0;
  const previewCt = 5;
  const previewExcessCt = cartProducts.length - previewCt;
  const hasExcess = previewExcessCt > 0;

  const body = isCartEmpty ? (
    <figure className="grid place-items-center text-neutral-500">
      <EllipsisHorizontalIcon className="h-24 aspect-square" />
      <figcaption className="text-lg">There is nothing here yet</figcaption>
    </figure>
  ) : (
    <ol className="grid auto-rows-min gap-3">
      {cartProducts.slice(0, 5).map(([id, qty]) => (
        <li>
          <ItemPreview id={id} qty={qty} />
        </li>
      ))}
      {hasExcess && (
        <li className="text-center text-neutral-400 text-sm">
          ...and {previewExcessCt} more
        </li>
      )}
    </ol>
  );

  return (
    <ModalOverlay modalOrigin="right" afterTransition={() => hide()}>
      <aside className="h-full w-1/3 grid grid-rows-[auto_1fr_auto] bg-neutral-800 p-8 gap-6">
        <header>
          {!isCartEmpty && (
            <h1 className="uppercase tracking-widest font-bold text-2xl text-neutral-500">
              Recent Selections
            </h1>
          )}
        </header>
        <div className="grid place-items-center">{body}</div>
        <footer className="grid place-items-end">
          {!isCartEmpty && (
            <button
              disabled={isCartEmpty}
              onClick={() => console.log("test")}
              className="bg-black px-3 py-2 uppercase font-bold tracking-wider disabled:opacity-25"
            >
              {!hasExcess ? "Manage" : "View All"}
            </button>
          )}
        </footer>
      </aside>
    </ModalOverlay>
  );
}

export function CartPreviewProvider(props: PropsWithChildren) {
  const { children } = props;
  const [isShown, setIsShown] = useState(false);

  function show() {
    setIsShown(true);
  }
  function hide() {
    setIsShown(false);
  }

  return (
    <CartPreviewContext.Provider value={{ isShown, show, hide }}>
      {children}
    </CartPreviewContext.Provider>
  );
}
