import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { C, sleep } from "../utilities.ts";
import { Spinner } from "./components/Spinner.tsx";

function NavBar() {
  return (
    <nav>
      <Link to="/">Solar Crown</Link>
    </nav>
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

// TODO Effects on-hover for each product
function Product() {
  return (
    <div className="bg-green-500">
      <code>product</code>
    </div>
  );
}

// TODO Read / React to `CatalogViewContext`
function ProductList() {
  type ProductEl = ReturnType<typeof Product>;
  const [productEls, setProductEls] = useState<ProductEl[]>([]);
  useEffect(() => {
    (async () => {
      await sleep(1);
      setProductEls(Array.from({ length: 30 }, () => <Product />));
    })();
  }, []);

  if (productEls.length === 0) {
    return (
      <section className="grid place-items-center">
        <Spinner className="w-24 h-24" />
      </section>
    );
  }

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
  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-3 p-6">
      <header>
        <NavBar />
      </header>
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
      {/* <footer><code>footer</code></footer> */}
      <Outlet />
    </div>
  );
}
