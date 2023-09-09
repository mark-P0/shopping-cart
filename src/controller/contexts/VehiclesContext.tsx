import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { readProducts } from "../../model/firebase/db.ts";
import { Vehicle } from "../../model/vehicles.ts";

type VehiclesProvision = {
  vehicles: Vehicle[];
};
export const VehiclesContext = createContext<VehiclesProvision | null>(null);

export function VehiclesContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    (async () => {
      const data = await readProducts();
      setVehicles(data);
    })();
  }, []);

  return (
    <VehiclesContext.Provider value={{ vehicles }}>
      {children}
    </VehiclesContext.Provider>
  );
}
