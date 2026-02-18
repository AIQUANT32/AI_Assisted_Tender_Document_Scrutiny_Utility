import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/login";
import Signup from "./features/auth/pages/signup";
import Dashboard from "./features/dashboard/pages/dashboard";
import DashboardLayout from "./layout/dashboardlayout";
import CreateTender from "./features/tender/pages/createtender";
import ViewTender from "./features/tender/pages/viewtender";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/tenders/create"
          element={
            <DashboardLayout>
              <CreateTender />
            </DashboardLayout>
          }
        />

        <Route
          path="/tenders"
          element={
            <DashboardLayout>
              <ViewTender />
            </DashboardLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
