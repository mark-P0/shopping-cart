import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehicleContext.tsx";
import { Vehicle } from "../model/vehicles.ts";
import { C, formatPrice, useNullableContext } from "../utilities.ts";
import { ModalOverlay } from "./components/ModalOverlay.tsx";
import { Spinner } from "./components/Spinner.tsx";

function CartPreview({ onDismissEnd }: { onDismissEnd: () => void }) {
  const { cart } = useNullableContext(CartContext);
  const allProducts = useNullableContext(VehiclesContext);

  const cartProducts = allProducts.filter(({ id }) => cart.has(id));

  return (
    <ModalOverlay onDismissEnd={onDismissEnd}>
      <aside className="h-2/3 w-2/3 bg-neutral-600">
        {JSON.stringify(cartProducts)}
      </aside>
    </ModalOverlay>
  );
}

// TODO Manipulate `CatalogViewContext`
function ProductListSettings() {
  return (
    <aside className="h-full bg-red-500">
      <code>settings</code>
    </aside>
  );
}

function Product({ data }: { data: Vehicle }) {
  const { id, brand, model, image } = data;

  const name = `${brand} ${model}`;
  const price = formatPrice(data.price);
  const classes = {
    img: C(
      "object-cover",
      "h-full aspect-auto",
      "transition duration-1000 ease-out",
      "grayscale hover:grayscale-0 hover:scale-110"
    ),
    label: C(
      "pointer-events-none", // Allow background hover effects
      "absolute top-full -translate-y-full",
      "w-full",
      "py-3 px-4",
      "bg-black/30"
    ),
  };
  return (
    <Link
      className="bg-neutral-700 rounded-xl overflow-hidden text-left"
      to={`/catalog/${id}`}
    >
      <figure className="h-full relative overflow-hidden">
        <img className={classes.img} src={image} alt="" />
        <figcaption className={classes.label}>
          <h3 className="uppercase tracking-wider font-bold">{name}</h3>
          <p className="text-xs tracking-widest font-thin text-neutral-400">
            {price}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}

// TODO Read / React to `CatalogViewContext`
function ProductList() {
  const data = useNullableContext(VehiclesContext);
  if (data.length === 0) {
    return (
      <div className="grid place-items-center">
        <Spinner className="w-24 h-24" />
      </div>
    );
  }

  const productEls = data.map((data) => <Product data={data} />);
  const classes = C(
    "h-full overflow-y-scroll",
    "grid grid-cols-3 auto-rows-[33%]",
    "gap-4 p-4",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600",
    "bg-neutral-800 rounded-xl"
  );
  return <section className={classes}>{...productEls}</section>;
}

// TODO Context for filtered list
function CatalogViewContext() {}

export function CatalogView() {
  const [isCartPreviewShown, setIsCartPreviewShown] = useState(false);

  function showPreview() {
    setIsCartPreviewShown(true);
  }

  function hidePreview() {
    setIsCartPreviewShown(false);
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-3 p-6">
      <header>
        <nav className="flex justify-between">
          <Link to="/">Solar Crown</Link>
          <button onClick={showPreview}>Cart</button>
        </nav>
      </header>
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
      {/* <footer><code>footer</code></footer> */}
      <Outlet />
      {isCartPreviewShown && <CartPreview onDismissEnd={hidePreview} />}
    </div>
  );
}
