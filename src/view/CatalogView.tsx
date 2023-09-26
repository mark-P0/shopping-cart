import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  CatalogContext,
  CatalogContextProvider,
} from "../controller/contexts/CatalogContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../model/vehicles.ts";
import {
  C,
  accessNullableRef,
  formatPrice,
  useNullableContext,
} from "../utilities.ts";
import {
  CartPreview,
  CartPreviewContext,
  CartPreviewProvider,
} from "./components/CartPreview.tsx";
import { Spinner } from "./components/Spinner.tsx";

function ProductListSettings() {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const { setBrands } = useNullableContext({ CatalogContext });
  const formRef = useRef<HTMLFormElement>(null);

  type DataEntry =
    | ["brand", Vehicle["brand"]]
    | ["priceMin", Vehicle["price"]]
    | ["priceMax", Vehicle["price"]];
  function filter() {
    const form = accessNullableRef({ formRef });
    const data = [...new FormData(form).entries()] as DataEntry[];

    const brandsToShow = data
      .filter(
        (entry): entry is ["brand", Vehicle["brand"]] => entry[0] === "brand"
      )
      .map(([, value]) => value);
    setBrands(brandsToShow);
  }

  const brands = [...new Set(vehicles.map(({ brand }) => brand))].sort((a, b) =>
    a < b ? -1 : 1
  );

  const cls = C(
    "h-full overflow-y-auto",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600"
  );
  return (
    <aside className="h-full overflow-hidden">
      <form ref={formRef} onInput={filter} className={cls}>
        <fieldset className="columns-2">
          <legend>Brand</legend>
          {brands.map((brand) => (
            <label key={brand} className="flex gap-2 items-center truncate">
              <input type="checkbox" name="brand" value={brand} />
              {brand}
            </label>
          ))}
        </fieldset>
      </form>
    </aside>
  );
}

function Product({ data }: { data: Vehicle }) {
  const { id, brand, model, image } = data;

  const name = `${brand} ${model}`;
  const price = formatPrice("compact", data.price);
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
      className="h-full w-full block bg-neutral-700 rounded-xl overflow-hidden text-left"
      to={`/catalog/${id}`}
    >
      <figure className="h-full w-full relative overflow-hidden">
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

function ProductList() {
  const { filtered: items } = useNullableContext({ CatalogContext });
  if (items.length === 0) {
    return (
      <div className="grid place-items-center">
        <Spinner className="w-24 h-24" />
      </div>
    );
  }

  const classes = C(
    "h-full overflow-y-scroll",
    "grid grid-cols-3 auto-rows-[33%]",
    "gap-4 p-4",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600",
    "bg-neutral-800 rounded-xl"
  );
  return (
    <section className="overflow-hidden h-full">
      <ol className={classes}>
        {items.map((data) => (
          <li key={data.id} className="h-full w-full">
            <Product data={data} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function CatalogViewContents() {
  const { isShown, show: showPreview } = useNullableContext({
    CartPreviewContext,
  });

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-4 p-8">
      <header>
        <nav className="h-full flex justify-between">
          <Link to="/">Solar Crown</Link>
          <button className="h-full aspect-square" onClick={showPreview}>
            <ShoppingCartIcon />
          </button>
        </nav>
      </header>
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
      {/* <footer><code>footer</code></footer> */}
      <Outlet />
      {isShown && <CartPreview />}
    </div>
  );
}

export function CatalogView() {
  return (
    <CartPreviewProvider>
      <CatalogContextProvider>
        <CatalogViewContents />
      </CatalogContextProvider>
    </CartPreviewProvider>
  );
}
