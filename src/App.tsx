import { Link, Outlet, Route } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-between">
      <div>
        <Link to="/">Solar Crown</Link>
      </div>
      {/* <div className="place-self-center"> */}
      {/* <Link to="/catalog">Catalog</Link> */}
      {/* </div> */}
      <div className="place-self-end flex gap-3">
        <button>Dark</button>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

function LandingView() {
  return (
    <>
      <p>Hello, world!</p>
      <Link
        className="uppercase tracking-widest text-sm bg-slate-800 text-white px-3 py-2"
        to="/catalog"
      >
        Browse
      </Link>
    </>
  );
}

function CatalogView() {
  return <p>Catalog</p>;
}

function App() {
  return (
    <div className="grid gap-3 p-4">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer></footer> */}
    </div>
  );
}

export const AppTree = (
  <Route path="/" element={<App />}>
    <Route index element={<LandingView />} />
    <Route path="/catalog" element={<CatalogView />} />
  </Route>
);
