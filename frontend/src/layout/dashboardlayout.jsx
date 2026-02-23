import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* Scrollable Middle Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;