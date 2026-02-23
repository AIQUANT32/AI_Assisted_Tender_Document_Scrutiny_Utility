import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      
      <button
        onClick={() => navigate("/tenders/create")}
        className="flex-1 bg-indigo-600 hover:bg-indigo-700 
                   text-white font-medium text-sm 
                   px-6 py-3 rounded-xl 
                   transition shadow-sm"
      >
        Create New Tender
      </button>

      <button
        onClick={() => navigate("/bidders/create")}
        className="flex-1 bg-gray-100 hover:bg-gray-200 
                   text-gray-700 font-medium text-sm 
                   px-6 py-3 rounded-xl 
                   transition"
      >
        Add Bidder
      </button>

    </div>
  );
};

export default QuickActions;