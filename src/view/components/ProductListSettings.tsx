import { FormEvent, RefObject, useRef } from "react";
import { CatalogContext } from "../../controller/contexts/CatalogContext.tsx";
import { VehiclesContext } from "../../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../../model/vehicles.ts";
import {
  C,
  accessNullableRef,
  minmax,
  useNullableContext,
} from "../../utilities.ts";

function PriceInputs() {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const { priceMin, priceMax, changeMinimumPrice, changeMaximumPrice } =
    useNullableContext({ CatalogContext });
  const prices = vehicles.map(({ price }) => price);
  const [lowest, highest] = minmax(...prices);

  const sliderMarkerListId = "markers";

  function changeMin(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.valueAsNumber;
    changeMinimumPrice(value);
  }
  function changeMax(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.valueAsNumber;
    changeMaximumPrice(value);
  }

  return (
    <fieldset className="grid gap-3">
      <legend>Price</legend>
      <section className="flex gap-3 mx-auto">
        <label className="w-1/3">
          <span className="hidden">Min</span>
          <input
            className="w-full text-black"
            type="number"
            name="priceMin"
            value={priceMin}
            readOnly
          />
        </label>
        <span>to</span>
        <label className="w-1/3">
          <span className="hidden">Max</span>
          <input
            className="w-full text-black"
            type="number"
            name="priceMax"
            value={priceMax}
            readOnly
          />
        </label>
      </section>
      <label className="grid grid-cols-[1fr_5fr]">
        Min
        <input
          type="range"
          name="priceMin"
          min={lowest}
          max={highest}
          value={priceMin}
          onInput={changeMin}
          list={sliderMarkerListId}
        />
      </label>
      <label className="grid grid-cols-[1fr_5fr]">
        Max
        <input
          type="range"
          name="priceMax"
          min={lowest}
          max={highest}
          value={priceMax}
          onInput={changeMax}
          list={sliderMarkerListId}
        />
      </label>
      <datalist id={sliderMarkerListId}>
        {prices.map((price, idx) => (
          <option key={idx} value={price}></option>
        ))}
      </datalist>
    </fieldset>
  );
}

function BrandFilters({ formRef }: { formRef: RefObject<HTMLFormElement> }) {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const { setBrands } = useNullableContext({ CatalogContext });

  function filter() {
    const form = accessNullableRef({ formRef });
    const data = [...new FormData(form).entries()];

    const brandsToShow = data
      .filter(
        (entry): entry is ["brand", Vehicle["brand"]] => entry[0] === "brand"
      )
      .map(([, brand]) => brand);
    setBrands(brandsToShow);
  }

  let brands: Array<Vehicle["brand"]>;
  brands = [...new Set(vehicles.map(({ brand }) => brand))];
  brands = brands.sort((a, b) => (a < b ? -1 : 1));

  return (
    <fieldset className="columns-2" onInput={filter}>
      <legend>Brand</legend>
      {brands.map((brand) => (
        <label key={brand} className="flex gap-2 items-center truncate">
          <input type="checkbox" name="brand" value={brand} />
          {brand}
        </label>
      ))}
    </fieldset>
  );
}

export function ProductListSettings() {
  const formRef = useRef<HTMLFormElement>(null);

  const cls = C(
    "h-full overflow-y-auto",
    "scrollbar-thin scrollbar-track-neutral-500 scrollbar-thumb-neutral-600"
  );
  return (
    <aside className="h-full overflow-hidden">
      <form ref={formRef} className={cls}>
        <BrandFilters formRef={formRef} />
        <PriceInputs />
      </form>
    </aside>
  );
}
