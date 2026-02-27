import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LazyFallback from "./lazyFallBack";

const Login = lazy(() => import("./features/auth/pages/login"));
const Signup = lazy(() => import("./features/auth/pages/signup"));

const DashboardLayout = lazy(() => import("./features/dashboard/components/dashboardlayout"));

const Dashboard = lazy(() => import("./features/dashboard/pages/dashboard"));
const CreateTender = lazy(() => import("./features/tender/pages/createtender"));
const ViewTender = lazy(() => import("./features/tender/pages/viewtender"));

const SubmitBid = lazy(() => import("./features/bidder/pages/submitBid"));
const MyBids = lazy(() => import("./features/bidder/pages/myBids"));
const MyTenderBids = lazy(() => import("./features/tender/pages/myTenders"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback = {<LazyFallback/>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
