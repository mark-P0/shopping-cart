import { Outlet, Route } from "react-router-dom";
import { VehiclesContextProvider } from "./controller/contexts/VehiclesContext.tsx";
import { productLoader } from "./controller/loaders/product-loader.ts";
import { CartView } from "./view/CartView.tsx";
import { CatalogView } from "./view/CatalogView.tsx";
import { LandingView } from "./view/LandingView.tsx";
import { ProductView } from "./view/ProductView.tsx";

function App() {
  return (
    <VehiclesContextProvider>
      <div className="select-none overflow--hidden">
        <Outlet />
      </div>
    </VehiclesContextProvider>
  );
}

export const AppTree = (
  <Route path="/" element={<App />}>
    <Route index element={<LandingView />} />
    <Route path="catalog" element={<CatalogView />}>
      <Route
        path=":productId"
        element={<ProductView />}
        loader={productLoader}
      />
      {/* <Route path="cart" element={<CartView />} /> */}
    </Route>
  </Route>
);
