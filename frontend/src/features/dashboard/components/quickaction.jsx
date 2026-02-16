import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <button onClick={() => navigate("/tenders/create")} className="action-btn primary">
        <div>Create New Tender</div>
      </button>

      <button onClick={() => navigate("/bidders/create")} className="action-btn secondary">
        <div>Add Bidder</div>
      </button>
    </div>
  );
};

export default QuickActions;
