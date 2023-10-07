import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "../controller/contexts/CartContext.tsx";
import { CatalogContextProvider } from "../controller/contexts/CatalogContext.tsx";
import { VehiclesContext } from "../controller/contexts/VehiclesContext.tsx";
import { C, useNullableContext } from "../utilities.ts";
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

function BadgedElement({
  element,
  isBadgeShown,
  badgeContent = null,
}: {
  element: ReactNode;
  isBadgeShown: boolean;
  badgeContent?: ReactNode;
}) {
  const cls = C(
    "z-10 absolute top-0 right-0 translate-x-1/3 -translate-y-1/3",
    "w-6 aspect-square overflow-hidden grid place-items-center p-1 rounded-full",
    "bg-neutral-600/75 text-xs text-center"
  );
  const badge = <span className={cls}>{badgeContent}</span>;
  return (
    <div className="relative">
      {isBadgeShown && badge}
      {element}
    </div>
  );
}

function CatalogViewContents() {
  const { vehicles } = useNullableContext({ VehiclesContext });
  const { cart } = useNullableContext({ CartContext });
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
  const cartButton = (
    <IconButton
      icon={<ShoppingCartIcon />}
      className="h-10"
      onClick={showPreview}
    />
  );

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
          <BadgedElement
            element={cartButton}
            isBadgeShown={cart.size > 0}
            badgeContent={cart.size}
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
  useEffect(() => {
    document.title = "Catalog | Solar Crown";
  }, []);

  return (
    <CartPreviewProvider>
      <CatalogContextProvider>
        <CatalogViewContents />
      </CatalogContextProvider>
    </CartPreviewProvider>
  );
}
