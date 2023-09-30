import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link, Outlet } from "react-router-dom";
import { CatalogContextProvider } from "../controller/contexts/CatalogContext.tsx";
import { useNullableContext } from "../utilities.ts";
import {
  CartPreview,
  CartPreviewContext,
  CartPreviewProvider,
} from "./components/CartPreview.tsx";
import { ProductList } from "./components/ProductList.tsx";
import { ProductListSettings } from "./components/ProductListSettings.tsx";

function CatalogViewContents() {
  const { isShown, show: showPreview } = useNullableContext({
    CartPreviewContext,
  });

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-4 p-8">
      <header>
        <nav className="h-full flex justify-between">
          <Link to="/">Solar Crown</Link>
          <button className="h-full aspect-square" onClick={showPreview}>
            <ShoppingCartIcon />
          </button>
        </nav>
      </header>
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
      {/* <footer><code>footer</code></footer> */}
      <Outlet />
      {isShown && <CartPreview />}
    </div>
  );
}

export function CatalogView() {
  return (
    <CartPreviewProvider>
      <CatalogContextProvider>
        <CatalogViewContents />
      </CatalogContextProvider>
    </CartPreviewProvider>
  );
}
