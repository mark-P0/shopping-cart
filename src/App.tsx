import { Outlet, Route } from "react-router-dom";
import { CartContextProvider } from "./controller/contexts/CartContext.tsx";
import { VehiclesContextProvider } from "./controller/contexts/VehiclesContext.tsx";
import { productLoader } from "./controller/loaders/product-loader.ts";
import { CartView } from "./view/CartView.tsx";
import { CatalogView } from "./view/CatalogView.tsx";
import { ErrorView } from "./view/ErrorView.tsx";
import { LandingView } from "./view/LandingView.tsx";
import { ProductView } from "./view/ProductView.tsx";

function App() {
  return (
    <VehiclesContextProvider>
      <CartContextProvider>
        <div className="select-none">
          <Outlet />
        </div>
      </CartContextProvider>
    </VehiclesContextProvider>
  );
}

export const AppTree = (
  <Route path="/" element={<App />} errorElement={<ErrorView />}>
    <Route index element={<LandingView />} />
    <Route path="/catalog" element={<CatalogView />}>
      <Route
        path=":productId"
        element={<ProductView />}
        loader={productLoader}
      />
    </Route>
    <Route path="/cart" element={<CartView />} />
  </Route>
);
