import { PropsWithChildren, createContext } from "react";
import { Vehicle } from "../../model/vehicles.ts";
import { useNullableContext } from "../../utilities.ts";
import { VehiclesContext } from "./VehiclesContext.tsx";

type CatalogProvision = {
  vehicles: Vehicle[];
};
export const CatalogContext = createContext<CatalogProvision | null>(null);

export function CatalogContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const { vehicles } = useNullableContext({ VehiclesContext });

  return (
    <CatalogContext.Provider value={{ vehicles }}>
      {children}
    </CatalogContext.Provider>
  );
}
