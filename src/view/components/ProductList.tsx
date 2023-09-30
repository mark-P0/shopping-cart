import { Link } from "react-router-dom";

import { CatalogContext } from "../../controller/contexts/CatalogContext.tsx";
import { Vehicle } from "../../model/vehicles.ts";
import { C, formatPrice, useNullableContext } from "../../utilities.ts";
import { Spinner } from "./Spinner.tsx";

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

export function ProductList() {
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
