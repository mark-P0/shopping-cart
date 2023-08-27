import { Outlet, Route } from "react-router-dom";
import { VehiclesContextProvider } from "./controller/contexts/VehicleContext.tsx";
import { CatalogView } from "./view/CatalogView.tsx";
import { LandingView } from "./view/LandingView.tsx";

function App() {
  return (
    <VehiclesContextProvider>
      <div className="select-none">
        <Outlet />
      </div>
    </VehiclesContextProvider>
  );
}

export const AppTree = (
  <Route path="/" element={<App />}>
    <Route index element={<LandingView />} />
    <Route path="/catalog" element={<CatalogView />} />
  </Route>
);
