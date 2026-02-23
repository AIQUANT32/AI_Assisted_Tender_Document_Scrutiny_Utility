import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/login";
import Signup from "./features/auth/pages/signup";

import DashboardLayout from "./layout/dashboardlayout";

import Dashboard from "./features/dashboard/pages/dashboard";
import CreateTender from "./features/tender/pages/createtender";
import ViewTender from "./features/tender/pages/viewtender";

import SubmitBid from "./features/bidder/pages/submitBid";
import MyBids from "./features/bidder/pages/myBids";
import MyTenderBids from "./features/tender/pages/myTenders";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Layout + Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>

          {/* /dashboard */}
          <Route index element={<Dashboard />} />

          {/* Tender Routes */}
          <Route path="tenders" element={<ViewTender />} />
          <Route path="tenders/create" element={<CreateTender />} />
          <Route path="tenders/:tenderId/bid" element={<SubmitBid />} />
          <Route path="my-tenders-bids" element={<MyTenderBids />} />
          
          <Route path="my-bids" element={<MyBids />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;