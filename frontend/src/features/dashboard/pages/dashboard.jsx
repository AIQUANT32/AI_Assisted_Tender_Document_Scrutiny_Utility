import { FiPlus, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500">Active Tenders</div>
            <div className="mt-2 text-3xl font-semibold text-gray-800">24</div>
            <div className="mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 inline-block rounded-full">
              +12%
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500">Total Bidders</div>
            <div className="mt-2 text-3xl font-semibold text-gray-800">156</div>
            <div className="mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 inline-block rounded-full">
              +8%
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500">In Processing</div>
            <div className="mt-2 text-3xl font-semibold text-gray-800">8</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="mt-2 text-3xl font-semibold text-gray-800">42</div>
            <div className="mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 inline-block rounded-full">
              +15%
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <button
            onClick={() => navigate("tenders/create")}
            className="flex flex-col items-center justify-center bg-indigo-600 hover:bg-indigo-700 
                       text-white rounded-2xl p-8 transition shadow-sm"
          >
            <FiPlus size={36} />
            <span className="mt-3 text-sm font-medium">
              Create New Tender
            </span>
          </button>

          <button
          onClick={() => navigate("tenders")}
            className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 
                       text-gray-700 rounded-2xl p-8 transition"
          >
            <FiUserPlus size={36} />
            <span className="mt-3 text-sm font-medium">
              Add Bidder
            </span>
          </button>

        </div>

        {/* Tip Box */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-sm text-gray-600 shadow-sm">
          Tip: Use the workflow tracker to monitor tender progress at each stage.
        </div>

      </div>
    </div>
  );
};

export default Dashboard;