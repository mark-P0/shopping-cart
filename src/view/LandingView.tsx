import { Link } from "react-router-dom";
import { C } from "../utilities.ts";

// TODO Image logo?
// TODO Pulsating logo?
export function LandingView() {
  const centerOffsetClasses = C(
    "absolute top-full left-1/2 -translate-x-1/2",
    "mt-2 px-5 py-3 rounded-full",
    "bg-black",
    "text-sm tracking-widest uppercase"
  );
  return (
    <main className="h-screen grid bg-neutral-900 text-white ">
      <div className="relative place-self-center px-4 py-3 font-thin text-5xl tracking-wider bg-neutral-50/10">
        Solar Crown
        <Link className={centerOffsetClasses} to="/catalog">
          View Catalog
        </Link>
      </div>
    </main>
  );
}
