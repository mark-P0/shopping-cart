import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { readProducts } from "../../model/firebase/db.ts";
import { Vehicle } from "../../model/vehicles.ts";
import { Empty } from "../../utilities.ts";

export const VehiclesContext = createContext<Vehicle[]>([]);

export function VehiclesContextProvider(props: PropsWithChildren<Empty>) {
  const { children } = props;
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    (async () => {
      const data = await readProducts();
      setVehicles(data);
    })();
  }, []);

  return (
    <VehiclesContext.Provider value={vehicles}>
      {children}
    </VehiclesContext.Provider>
  );
}
