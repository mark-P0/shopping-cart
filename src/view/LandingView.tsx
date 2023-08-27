import { Link } from "react-router-dom";

// TODO Image logo?
// TODO Pulsating logo?
export function LandingView() {
  return (
    <main className="h-screen grid bg-neutral-900 text-white ">
      <div className="relative place-self-center px-4 py-3 font-thin text-5xl tracking-wider bg-neutral-50/10">
        Solar Crown
        <Link
          className="absolute top-full left-1/2 -translate-x-1/2 w-max mt-2 px-5 py-3 rounded-full text-sm tracking-widest uppercase bg-black"
          to="/catalog"
        >
          View Catalog
        </Link>
      </div>
    </main>
  );
}
