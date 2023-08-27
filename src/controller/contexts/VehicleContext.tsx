import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { TEMPORARY_HARDCODED_DATA, Vehicle } from "../../model/vehicles.ts";
import { Empty, sleep } from "../../utilities.ts";

export const VehiclesContext = createContext<Vehicle[]>([]);

function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    (async () => {
      // TODO Connect with API
      await sleep(1);
      setVehicles([...TEMPORARY_HARDCODED_DATA]);
    })();
  }, []);

  return vehicles;
}

export function VehiclesContextProvider(props: PropsWithChildren<Empty>) {
  const { children } = props;
  const vehicles = useVehicles();

  return (
    <VehiclesContext.Provider value={vehicles}>
      {children}
    </VehiclesContext.Provider>
  );
}
