import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">TenderFlow</div>

        <div className="sidebar-nav">
          <NavLink
            to="/dashboard"
            end 
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tenders/create"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            Create Tender
          </NavLink>

          <NavLink
            to="/tenders"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            View Tenders
          </NavLink>

          <NavLink
            to="/bidders/create"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            Add Bidder
          </NavLink>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-name">John Anderson</div>
        <div className="user-role">Administrator</div>
      </div>
    </div>
  );
};

export default Sidebar;
