import {
  EllipsisHorizontalIcon,
  ListBulletIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../model/vehicles.ts";
import {
  C,
  formatPrice,
  scrollbarCls,
  sum,
  useNullableContext,
} from "../utilities.ts";
import { IconButton, TextButton } from "./components/Buttons.tsx";
import { Logo } from "./components/Logo.tsx";
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

  function remove() {
    removeFromCart(id);
  }

  return <IconButton icon={<TrashIcon />} className="h-9" onClick={remove} />;
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
      <IconButton
        icon={<MinusIcon />}
        className="h-8"
        onClick={decrement}
        disabled={isDecrementDisabled}
      />
      {qty}
      <IconButton icon={<PlusIcon />} className="h-8" onClick={increment} />
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
      <li className="grid place-items-center">
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
    scrollbarCls
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

  useEffect(() => {
    document.title = "Cart | Solar Crown";
  }, []);

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
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-4 p-6">
      <header>
        <nav className="h-full flex justify-between items-center">
          <Link to="/">
            <IconButton
              icon={<Logo />}
              className="h-10 bg-transparent hover:bg-black p-1"
            />
          </Link>
          <Link to="/catalog">
            <IconButton icon={<ListBulletIcon />} className="h-10" />
          </Link>
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
          <TextButton text="Checkout" onClick={showMockNotice} />
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
