import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { TextButton } from "./components/Buttons.tsx";

export function ErrorView() {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    document.title = "...? | Solar Crown";
  }, []);

  /** https://stackoverflow.com/a/76126878 */
  let msg = "An error has occurred.";
  if (isRouteErrorResponse(error)) {
    msg = error.error?.message ?? error.statusText;
  } else if (error instanceof Error) {
    msg = error.message;
  } else if (typeof error === "string") {
    msg = error;
  }

  return (
    <main className="h-screen grid place-items-center bg-neutral-900 text-white">
      <div className="grid justify-items-center text-center gap-6">
        <figure>
          <ExclamationTriangleIcon className="mx-auto w-48 aspect-square text-neutral-500" />
          <figcaption>
            <div className="uppercase tracking-widest text-sm font-thin text-neutral-400">
              You might be in the wrong place
            </div>
            <div className="text-neutral-600 text-sm">
              <code>{msg}</code>
            </div>
          </figcaption>
        </figure>
        <Link to="/catalog">
          <TextButton text="Back to Catalog" />
        </Link>
      </div>
    </main>
  );
}
