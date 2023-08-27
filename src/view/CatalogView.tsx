import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../model/vehicles.ts";
import { C, formatPrice } from "../utilities.ts";
import BrandingImg from "./assets/branding.png";
import { Spinner } from "./components/Spinner.tsx";

function NavBar() {
  return (
    <nav className="flex justify-between">
      <div>
        <Link to="/">
          {/* <img className="h-16" src={BrandingImg} alt="" /> */}
          Solar Crown
        </Link>
      </div>
      {/* <div className="place-self-center"> */}
      {/* <Link to="/catalog">Catalog</Link> */}
      {/* </div> */}
      <div className="flex gap-3">
        {/* <button>Dark</button> */}
        <Link to="cart">Cart</Link>
      </div>
    </nav>
  );
}

/**
 * TODO
 * - Dark overlay
 * - Takes in an element to be viewed
 */
function Popup() {}

/**
 * TODO
 * - Manipulate with `CatalogViewContext`
 */
function ProductListSettings() {
  return (
    <aside className="h-full bg-red-500">
      <code>settings</code>
    </aside>
  );
}

/**
 * TODO
 * - Effects on-hover for each product
 */
function Product({ data }: { data: Vehicle }) {
  const { id, brand, model, image } = data;
  const name = `${brand} ${model}`;
  const price = formatPrice(data.price);

  return (
    <Link
      className="bg-neutral-700 rounded-xl overflow-hidden text-left"
      to={id}
    >
      <figure className="h-full relative overflow-hidden">
        <img
          className="object-cover h-full aspect-auto transition duration-1000 ease-out hover:scale-110 grayscale hover:grayscale-0"
          src={image}
          alt=""
        />
        <figcaption className="absolute top-full -translate-y-full w-full py-3 px-4 bg-black/30 pointer-events-none">
          <h3 className="uppercase tracking-wider font-bold">{name}</h3>
          <p className="text-xs tracking-widest font-thin text-neutral-400">
            {price}
          </p>
        </figcaption>
      </figure>
    </Link>
  );

  return (
    <article className="grid grid-rows-[4fr_1fr] bg-neutral-700">
      <figure className="overflow-hidden flex items-center">
        <img className="aspect-auto" src={image} alt="" />
      </figure>
      <section className="bg-neutral-800/50 p-3 px-4">
        <h3 className="uppercase tracking-wider font-bold">{name}</h3>
        <p className="text-sm tracking-wide font-thin">{price}</p>
      </section>
    </article>
  );
}

/**
 * TODO
 * - Read / React to `CatalogViewContext`
 */
function ProductList() {
  const productsData = useContext(VehiclesContext);
  if (productsData.length === 0) {
    return (
      <div className="grid place-items-center">
        <Spinner className="w-24 h-24" />
      </div>
    );
  }

  const products = productsData.map((data) => <Product data={data} />);
  const classes = C(
    "h-full overflow-y-scroll",
    "grid grid-cols-3 auto-rows-[calc(100%/3)]",
    "gap-4 p-4",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600",
    "bg-neutral-800 rounded-xl"
  );
  return <section className={classes}>{...products}</section>;
}

function CatalogViewContext() {}

export function CatalogView() {
  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-3 p-6">
      <header className="bg--blue-500">
        <NavBar />
      </header>
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
      {/* <footer className="bg--yellow-500">
        <code>footer</code>
      </footer> */}
      <Outlet />
    </div>
  );
}
