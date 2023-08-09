import { Route, Routes, BrowserRouter } from "react-router-dom";

/**
 * import Layouts
 */
import MainLayout from "../containers/Layouts/MainLayout";
import HomeLayout from "../containers/Layouts/HomeLayout";
// import UserLayout from "../containers/Layouts/UserLayout";
/**
 * import views
 */
import Home from "../containers/Views/Home";
import Dashboard from "../containers/Views/Dashboard";
import Simulation from "../containers/Views/Simulation"
const Router = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="" element={<HomeLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulation" element={<Simulation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
