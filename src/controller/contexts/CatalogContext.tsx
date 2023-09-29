import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Vehicle } from "../../model/vehicles.ts";
import { minmax, useNullableContext } from "../../utilities.ts";
import { VehiclesContext } from "./VehiclesContext.tsx";

type CatalogProvision = {
  filtered: Vehicle[];
  priceMin: Vehicle["price"];
  priceMax: Vehicle["price"];
  setBrands(brands: Vehicle["brand"][]): void;
  changeMinimumPrice(price: Vehicle["price"]): void;
  changeMaximumPrice(price: Vehicle["price"]): void;
};
export const CatalogContext = createContext<CatalogProvision | null>(null);

export function CatalogContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const { vehicles } = useNullableContext({ VehiclesContext });

  const [brandsToShow, setBrandsToShow] = useState<Vehicle["brand"][]>([]);
  const [priceMin, setPriceMin] = useState(Number.MAX_SAFE_INTEGER);
  const [priceMax, setPriceMax] = useState(Number.MIN_SAFE_INTEGER);

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

  let filtered = [...vehicles];
  if (brandsToShow.length > 0)
    filtered = filtered.filter(({ brand }) => brandsToShow.includes(brand));
  filtered = filtered.filter(
    ({ price }) => priceMin <= price && price <= priceMax
  );

  return (
    <CatalogContext.Provider
      value={{
        filtered,
        priceMin,
        priceMax,
        setBrands,
        changeMinimumPrice,
        changeMaximumPrice,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}
