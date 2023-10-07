import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { ComponentProps, FormEvent, RefObject, useRef } from "react";
import { CatalogContext } from "../../controller/contexts/CatalogContext.tsx";
import { VehiclesContext } from "../../controller/contexts/VehiclesContext.tsx";
import { Vehicle } from "../../model/vehicles.ts";
import {
  C,
  accessNullableRef,
  minmax,
  raise,
  scrollbarCls,
  useNullableContext,
} from "../../utilities.ts";
import { IconButton } from "./Buttons.tsx";

function FieldSet(props: { legend: string } & ComponentProps<"fieldset">) {
  const { legend, ...attrs } = props;
  const { className, children } = attrs;
  return (
    <fieldset {...attrs} className="grid gap-2">
      <legend className="float-left uppercase font-bold text-sm tracking-widest">
        {legend}
      </legend>
      <div className={className}>{children}</div>
    </fieldset>
  );
}

function SortOrder() {
  const { sortOptions, sortKey, setSorting, setOrder, sortOrder } =
    useNullableContext({
      CatalogContext,
    });

  function changeSortOrder() {
    if (sortOrder === "asc") setOrder("desc");
    if (sortOrder === "desc") setOrder("asc");
  }

  const icon =
    sortOrder === "asc" ? (
      <BarsArrowDownIcon />
    ) : sortOrder === "desc" ? (
      <BarsArrowUpIcon />
    ) : (
      raise(`Unknown sort order ${sortOrder}`)
    );

  return (
    <FieldSet
      legend={"Sort"}
      className="flex justify-between text-xs uppercase font-thin tracking-widest pl-1"
    >
      <section className="grid gap-2">
        {sortOptions.map((option) => (
          <label
            key={option}
            className="flex gap-2 items-center hover:brightness-200 transition"
          >
            <input
              type="radio"
              className="bg-black text-white border-neutral-600"
              name="sorting"
              checked={sortKey === option}
              onChange={() => setSorting(option)}
            />
            {option}
          </label>
        ))}
      </section>
      <IconButton icon={icon} className="h-10" onClick={changeSortOrder} />
    </FieldSet>
  );
}

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

  const inputBoxCls = C(
    "w-full px-2 py-1",
    "text-sm tracking-wide bg-black text-white border-neutral-600",
    "hover:brightness-200 transition"
  );
  const inputBoxMin = (
    <input
      type="number"
      className={inputBoxCls}
      name="priceMin"
      value={Number.isNaN(priceMin) ? lowest : priceMin}
      onInput={changeMin}
    />
  );
  const inputBoxMax = (
    <input
      type="number"
      className={inputBoxCls}
      name="priceMax"
      value={Number.isNaN(priceMax) ? highest : priceMax}
      onInput={changeMax}
    />
  );
  const inputSliderMin = (
    <input
      type="range"
      className="hover:brightness-200 transition"
      name="priceMin"
      min={lowest}
      max={highest}
      value={Number.isNaN(priceMin) ? lowest : priceMin}
      onInput={changeMin}
      list={sliderMarkerListId}
    />
  );
  const inputSliderMax = (
    <input
      type="range"
      className="hover:brightness-200 transition"
      name="priceMax"
      min={lowest}
      max={highest}
      value={Number.isNaN(priceMax) ? highest : priceMax}
      onInput={changeMax}
      list={sliderMarkerListId}
    />
  );

  return (
    <FieldSet
      legend={"Price"}
      className="grid gap-2 text-xs uppercase tracking-widest pl-1"
    >
      <section className="flex items-center gap-3 mx-auto">
        <label className="flex-1">
          <span className="hidden">Min</span>
          {inputBoxMin}
        </label>
        <span>to</span>
        <label className="flex-1">
          <span className="hidden">Max</span>
          {inputBoxMax}
        </label>
      </section>
      <label className="grid grid-cols-[1fr_5fr] items-center ">
        Min
        {inputSliderMin}
      </label>
      <label className="grid grid-cols-[1fr_5fr] items-center ">
        Max
        {inputSliderMax}
      </label>
      <datalist id={sliderMarkerListId}>
        {prices.map((price, idx) => (
          <option key={idx} value={price}></option>
        ))}
      </datalist>
    </FieldSet>
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

  const cls = C(
    "flex gap-2 items-center mb-2",
    "text-xs uppercase font-thin tracking-widest",
    "hover:brightness-200 transition"
  );
  return (
    <FieldSet
      legend={"Brand"}
      className="columns-[2_1rem] pl-1"
      onInput={filter}
    >
      {brands.map((brand) => (
        <label key={brand} className={cls}>
          <input
            type="checkbox"
            className="bg-black text-white border-neutral-600"
            name="brand"
            value={brand}
          />
          <span className="truncate">{brand}</span>
        </label>
      ))}
    </FieldSet>
  );
}

export function ProductListSettings() {
  const formRef = useRef<HTMLFormElement>(null);

  const cls = C(
    "h-full overflow-y-auto overflow-x-hidden",
    "grid auto-rows-min gap-5 pr-3",
    scrollbarCls
  );
  return (
    <aside className="h-full overflow-hidden">
      <form ref={formRef} className={cls}>
        <SortOrder />
        <hr className="border-neutral-600" />
        <BrandFilters formRef={formRef} />
        <hr className="border-neutral-600" />
        <PriceInputs />
      </form>
    </aside>
  );
}
