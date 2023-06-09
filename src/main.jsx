import React from "react";
import { AuthContext } from "./authContext";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role, location) {
  const navigate = useNavigate();
  switch (role) {
    case "admin": {
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      );
      break;
    }
    default: {
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
    }
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);
  const location = useLocation();
  console.log("user state", state);
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {!state.isAuthenticated
              ? renderRoutes("none", location)
              : renderRoutes(state.role, location)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
