import { TrashIcon } from "@heroicons/react/20/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../model/vehicles.ts";
import { C, formatPrice, useNullableContext } from "../utilities.ts";

const rowCls = C(
  ...["grid place-items-center gap-4", "grid-cols-[1fr_4fr_2fr_2fr_2fr_1fr]"],
  "bg-neutral-700 rounded-xl py-3 px-5"
);

function CartListHeader() {
  const cls = C(
    rowCls,
    "bg-neutral-800/90 text-neutral-300",
    "uppercase font-thin tracking-widest text-sm"
  );

  return (
    <ol className={cls}>
      <li>Product</li>
      <li></li>
      <li>Price</li>
      <li>Quantity</li>
      <li>Subtotal</li>
      <li>Actions</li>
    </ol>
  );
}

function DeleteButton({ id }: { id: Vehicle["id"] }) {
  const { removeFromCart } = useNullableContext({ CartContext });

  return (
    <button className="h-full aspect-square" onClick={() => removeFromCart(id)}>
      <TrashIcon />
    </button>
  );
}

function CartItem({ id, qty }: { id: Vehicle["id"]; qty: number }) {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const { setQty } = useNullableContext({ CartContext });
  const [isDecrementDisabled, setIsDecrementDisabled] = useState(qty === 1);

  const data = vehicles.find(({ id: vehicleId }) => vehicleId === id);
  if (data === undefined) {
    throw new Error(`Data for ID ${id} not found!`);
  }

  function decrement() {
    if (qty - 1 === 1) setIsDecrementDisabled(true);
    setQty(id, qty - 1);
  }
  function increment() {
    setIsDecrementDisabled(false);
    setQty(id, qty + 1);
  }

  const { image, model, brand } = data;
  const price = formatPrice(data.price);
  const subtotal = formatPrice(data.price * qty);

  return (
    <ol className={rowCls}>
      <li>
        <img src={image} alt="" />
      </li>
      <li className="justify-self-start">
        <div className="uppercase tracking-widest text-sm font-bold">
          {model}
        </div>
        <div className="uppercase tracking-widest text-xs text-neutral-400">
          {brand}
        </div>
      </li>
      <li className="uppercase tracking-widest text-sm">{price}</li>
      <li>
        <form className="flex items-center gap-3">
          <button
            type="button"
            disabled={isDecrementDisabled}
            className="bg-black rounded-full h-8 w-8 font-bold disabled:opacity-25"
            onClick={decrement}
          >
            -
          </button>
          <span className="text-sm">{qty}</span>
          <button
            type="button"
            className="bg-black rounded-full h-8 w-8 font-bold"
            onClick={increment}
          >
            +
          </button>
        </form>
      </li>
      <li className="uppercase tracking-widest text-sm">{subtotal}</li>
      <li className="h-5 aspect-square">
        <DeleteButton id={id} />
      </li>
    </ol>
  );
}

function CartList() {
  const { cart } = useNullableContext({ CartContext });
  const cartEntries = [...cart.entries()].reverse();

  const cls = C(
    "overflow-y-auto h-full w-full grid auto-rows-min gap-3 px-3",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600"
  );
  return (
    <ol className={cls}>
      <li className="sticky top-0">
        <CartListHeader />
      </li>
      {cartEntries.map(([id, qty]) => (
        <li>
          <CartItem id={id} qty={qty} />
        </li>
      ))}
    </ol>
  );
}

function CartEmptyNotice() {
  return (
    <figure className="grid place-items-center text-neutral-500">
      <EllipsisHorizontalIcon className="h-24 aspect-square" />
      <figcaption className="text-lg">There is nothing here yet</figcaption>
    </figure>
  );
}

export function CartView() {
  const { cart } = useNullableContext({ CartContext });

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-4 p-8">
      <header>
        <nav className="h-full flex justify-between">
          <Link to="/">Solar Crown</Link>
          <Link to="/catalog">Catalog</Link>
        </nav>
      </header>
      <main className="overflow-hidden h-full grid place-items-center">
        {cart.size === 0 ? <CartEmptyNotice /> : <CartList />}
      </main>
      {cart.size > 0 && (
        <footer className="flex justify-end">
          <button className="bg-black px-3 py-2 uppercase tracking-widest font-bold">
            Checkout
          </button>
        </footer>
      )}
    </div>
  );
}
