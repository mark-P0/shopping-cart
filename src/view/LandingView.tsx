import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TextButton } from "./components/Buttons.tsx";
import { Logo } from "./components/Logo.tsx";

export function LandingView() {
  useEffect(() => {
    document.title = "Solar Crown";
  }, []);

  return (
    <main className="h-screen grid place-items-center bg-neutral-900">
      <figure className="relative">
        <Logo className="animate-[pulse_5s_ease-in-out_infinite] hover:animate-none bg-transparent text-white" />
        <figcaption className="absolute left-1/2 -translate-x-1/2">
          <Link to="/catalog">
            <TextButton
              text="View Catalog"
              className="w-max px-8 py-3 text-sm rounded-full font-light bg-black/25 hover:bg-black"
            />
          </Link>
        </figcaption>
      </figure>
    </main>
  );
}
