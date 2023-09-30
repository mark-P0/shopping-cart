import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link, Outlet } from "react-router-dom";
import { CatalogContextProvider } from "../controller/contexts/CatalogContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { useNullableContext } from "../utilities.ts";
import {
  CartPreview,
  CartPreviewContext,
  CartPreviewProvider,
} from "./components/CartPreview.tsx";
import { ProductList } from "./components/ProductList.tsx";
import { ProductListSettings } from "./components/ProductListSettings.tsx";
import { Spinner } from "./components/Spinner.tsx";

function ExtLink({ text, to }: { text: string; to: string }) {
  return (
    <a
      href={to}
      className="hover:underline underline-offset-4 hover:invert transition"
    >
      {text}
    </a>
  );
}

function CatalogViewContents() {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const { isShown, show } = useNullableContext({ CartPreviewContext });
  const showPreview = show;

  const main =
    vehicles.length === 0 ? (
      <main className="h-full grid place-items-center bg-neutral-900 text-white">
        <Spinner className="w-24 h-24" />
      </main>
    ) : (
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
    );

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-4 p-8 pb-3">
      <header>
        <nav className="h-full flex justify-between">
          <Link to="/">Solar Crown</Link>
          <button className="h-full aspect-square" onClick={showPreview}>
            <ShoppingCartIcon />
          </button>
        </nav>
      </header>
      {main}
      <footer className="text-center uppercase text-xs tracking-widest text-neutral-700">
        Data gathered from{" "}
        <ExtLink
          text="Test Drive Unlimited 2"
          to="https://testdrive.fandom.com/wiki/Test_Drive_Unlimited_2/Vehicles"
        />{" "}
        and <ExtLink text="Forza Wiki" to="https://forza.fandom.com" />
      </footer>
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
