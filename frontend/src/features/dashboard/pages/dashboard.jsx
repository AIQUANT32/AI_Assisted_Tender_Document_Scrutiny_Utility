import { FiPlus, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-title">Active Tenders</div>
          <div className="stats-value">24</div>
          <div className="stats-badge">+12%</div>
        </div>

        <div className="stats-card">
          <div className="stats-title">Total Bidders</div>
          <div className="stats-value">156</div>
          <div className="stats-badge">+8%</div>
        </div>

        <div className="stats-card">
          <div className="stats-title">In Processing</div>
          <div className="stats-value">8</div>
        </div>

        <div className="stats-card">
          <div className="stats-title">Completed</div>
          <div className="stats-value">42</div>
          <div className="stats-badge">+15%</div>
        </div>
      </div>

      <div className="quick-actions">
        <button
          className="action-btn primary icon-above"
          onClick={() => navigate("/tenders/create")}
        >
          <FiPlus size={36} />
          <span>Create New Tender</span>
        </button>

        <button className="action-btn secondary icon-above">
          <FiUserPlus size={36} />
          <span>Add Bidder</span>
        </button>
      </div>

      <div className="tip-box">
        Tip: Use the workflow tracker to monitor tender progress at each stage.
      </div>
    </div>
  );
};

export default Dashboard;
