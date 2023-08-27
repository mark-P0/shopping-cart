import { Outlet, Route } from "react-router-dom";
import { LandingView } from "./view/LandingView.tsx";

function App() {
  return (
    <div className="select-none">
      <Outlet />
    </div>
  );
}

export const AppTree = (
  <Route path="/" element={<App />}>
    <Route index element={<LandingView />} />
  </Route>
);
