import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Vehicle } from "../../model/vehicles.ts";
import { minmax, raise, useNullableContext } from "../../utilities.ts";
import { VehiclesContext } from "./VehiclesContext.tsx";

type CatalogProvision = {
  filtered: Vehicle[];
  priceMin: Vehicle["price"];
  priceMax: Vehicle["price"];
  sortOptions: (keyof Vehicle)[];
  sortKey: keyof Vehicle;
  sortOrder: SortOrder;
  setBrands(brands: Vehicle["brand"][]): void;
  changeMinimumPrice(price: Vehicle["price"]): void;
  changeMaximumPrice(price: Vehicle["price"]): void;
  setSorting(sorting: keyof Vehicle): void;
  setOrder(order: SortOrder): void;
};
export const CatalogContext = createContext<CatalogProvision | null>(null);

const sortOptions: Array<keyof Vehicle> = ["brand", "model", "price"];
type SortOrder = "asc" | "desc";

export function CatalogContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const { vehicles } = useNullableContext({ VehiclesContext });

  const [brandsToShow, setBrandsToShow] = useState<Vehicle["brand"][]>([]);
  const [priceMin, setPriceMin] = useState(Number.MAX_SAFE_INTEGER);
  const [priceMax, setPriceMax] = useState(Number.MIN_SAFE_INTEGER);
  const [sortKey, setSortKey] = useState<keyof Vehicle>("brand");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const [lowest, highest] = minmax(...vehicles.map(({ price }) => price));
    setPriceMin(lowest);
    setPriceMax(highest);
  }, [vehicles]);

  function setBrands(brands: Vehicle["brand"][]) {
    setBrandsToShow([...brands]);
  }
  function changeMinimumPrice(price: Vehicle["price"]) {
    setPriceMin(price);
    if (priceMax < price) setPriceMax(price);
  }
  function changeMaximumPrice(price: Vehicle["price"]) {
    setPriceMax(price);
    if (price < priceMin) setPriceMin(price);
  }
  function setSorting(sorting: keyof Vehicle) {
    setSortKey(sorting);
  }
  function setOrder(order: SortOrder) {
    setSortOrder(order);
  }

  let filtered = [...vehicles];
  if (brandsToShow.length > 0)
    filtered = filtered.filter(({ brand }) => brandsToShow.includes(brand));
  filtered = filtered.filter(
    ({ price }) => priceMin <= price && price <= priceMax
  );

  filtered = filtered.sort((a, b) =>
    sortOrder === "asc"
      ? a[sortKey] < b[sortKey]
        ? -1
        : 1
      : sortOrder === "desc"
      ? a[sortKey] < b[sortKey]
        ? 1
        : -1
      : raise(`Unknown order ${sortOrder}`)
  );

  return (
    <CatalogContext.Provider
      value={{
        filtered,
        priceMin,
        priceMax,
        sortOptions,
        sortKey,
        sortOrder,
        setBrands,
        changeMinimumPrice,
        changeMaximumPrice,
        setSorting,
        setOrder,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}
