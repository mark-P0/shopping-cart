import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../model/vehicles.ts";
import { C, formatPrice, sum, useNullableContext } from "../utilities.ts";
import { ModalOverlay } from "./components/ModalOverlay.tsx";

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
      <li></li>
      <li></li>
      <li>Price</li>
      <li>Quantity</li>
      <li>Subtotal</li>
      <li></li>
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

function Counter({ id, qty }: { id: Vehicle["id"]; qty: number }) {
  const { setQty } = useNullableContext({ CartContext });
  const [isDecrementDisabled, setIsDecrementDisabled] = useState(qty === 1);

  function decrement() {
    if (qty - 1 === 1) setIsDecrementDisabled(true);
    setQty(id, qty - 1);
  }
  function increment() {
    setIsDecrementDisabled(false);
    setQty(id, qty + 1);
  }

  return (
    <form className="flex items-center gap-3">
      <button
        type="button"
        disabled={isDecrementDisabled}
        className="h-8 w-8 p-2 bg-black rounded-full disabled:opacity-25"
        onClick={decrement}
      >
        <MinusIcon />
      </button>
      {qty}
      <button
        type="button"
        className="h-8 w-8 p-2 bg-black rounded-full"
        onClick={increment}
      >
        <PlusIcon />
      </button>
    </form>
  );
}

function CartItem({ id, qty }: { id: Vehicle["id"]; qty: number }) {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const data = vehicles.find(({ id: vehicleId }) => vehicleId === id);
  if (data === undefined) {
    throw new Error(`Data for ID ${id} not found!`);
  }

  const { image, model, brand } = data;
  const price = formatPrice("compact", data.price);
  const subtotal = formatPrice("compact", data.price * qty);

  return (
    <ol className={rowCls}>
      <li>
        <img src={image} alt="" />
      </li>
      <li className="justify-self-start">
        <div className="uppercase tracking-widest text-sm font-bold leading-tight line-clamp-2">
          {model}
        </div>
        <div className="uppercase tracking-widest text-xs text-neutral-400">
          {brand}
        </div>
      </li>
      <li className="uppercase tracking-widest text-sm">{price}</li>
      <li className="text-sm">
        <Counter id={id} qty={qty} />
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
        <li key={id}>
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
  const { vehicles } = useNullableContext({ VehiclesContext });
  const [isMockNoticeShown, setIsMockNoticeShown] = useState(false);

  function showMockNotice() {
    setIsMockNoticeShown(true);
  }
  function hideMockNotice() {
    setIsMockNoticeShown(false);
  }

  const cartItems = vehicles.filter(({ id }) => cart.has(id));
  const totalPrice = sum(
    ...cartItems.map(({ id, price }) => price * (cart.get(id) ?? 0))
  );
  const totalPriceStr = formatPrice("standard", totalPrice);
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
        <footer className="flex justify-end items-center gap-6">
          <div className="uppercase tracking-widest text-sm font-thin">
            Total:
            <span className="ml-3 text-xl font-bold">{totalPriceStr}</span>
          </div>
          <button
            className="bg-black px-3 py-2 uppercase tracking-widest font-bold"
            onClick={showMockNotice}
          >
            Checkout
          </button>
        </footer>
      )}
      {cart.size > 0 && isMockNoticeShown && (
        <ModalOverlay modalOrigin="center" afterTransition={hideMockNotice}>
          <article className="w-3/5 bg-neutral-700 rounded-xl p-4">
            <h2 className="text-2xl font-bold">Thank you for your interest!</h2>
            <p>
              This is only a mock demonstration of a simple e-commerce
              application. Only the cart features are functional.
            </p>
          </article>
        </ModalOverlay>
      )}
    </div>
  );
}
