import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";
import { CatalogContextProvider } from "../controller/contexts/CatalogContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { useNullableContext } from "../utilities.ts";
import { IconButton } from "./components/Buttons.tsx";
import {
  CartPreview,
  CartPreviewContext,
  CartPreviewProvider,
} from "./components/CartPreview.tsx";
import { Logo } from "./components/Logo.tsx";
import { ProductList } from "./components/ProductList.tsx";
import { ProductListSettings } from "./components/ProductListSettings.tsx";

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
        <figure className="w-24 aspect-square bg-neutral-700 rounded-full animate-ping"></figure>
      </main>
    ) : (
      <main className="h-full overflow-hidden grid grid-cols-[1fr_4fr] gap-3">
        <ProductListSettings />
        <ProductList />
      </main>
    );

  const links = [
    <ExtLink
      text="Test Drive Unlimited 2"
      to="https://testdrive.fandom.com/wiki/Test_Drive_Unlimited_2/Vehicles"
    />,
    <ExtLink text="Forza Wiki" to="https://forza.fandom.com" />,
  ];

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white gap-4 p-6 pb-3">
      <header>
        <nav className="h-full flex justify-between items-center">
          <Link to="/">
            <IconButton
              icon={<Logo />}
              className="h-10 bg-transparent hover:bg-black p-1"
            />
          </Link>
          <IconButton
            icon={<ShoppingCartIcon />}
            className="h-10"
            onClick={showPreview}
          />
        </nav>
      </header>
      {main}
      {vehicles.length > 0 && (
        <footer className="text-center uppercase text-xs tracking-widest text-neutral-700">
          Data gathered from {links[0]} and {links[1]}
        </footer>
      )}
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
