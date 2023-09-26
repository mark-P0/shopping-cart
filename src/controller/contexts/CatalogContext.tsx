import { PropsWithChildren, createContext, useState } from "react";
import { Vehicle } from "../../model/vehicles.ts";
import { useNullableContext } from "../../utilities.ts";
import { VehiclesContext } from "./VehiclesContext.tsx";

type CatalogProvision = {
  filtered: Vehicle[];
  setBrands(brands: Vehicle["brand"][]): void;
};
export const CatalogContext = createContext<CatalogProvision | null>(null);

export function CatalogContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const { vehicles } = useNullableContext({ VehiclesContext });
  const [brandsToShow, setBrandsToShow] = useState<Vehicle["brand"][]>([]);

  function setBrands(brands: Vehicle["brand"][]) {
    setBrandsToShow([...brands]);
  }

  let filtered = [...vehicles];
  if (brandsToShow.length > 0)
    filtered = filtered.filter(({ brand }) => brandsToShow.includes(brand));

  return (
    <CatalogContext.Provider value={{ filtered, setBrands }}>
      {children}
    </CatalogContext.Provider>
  );
}
