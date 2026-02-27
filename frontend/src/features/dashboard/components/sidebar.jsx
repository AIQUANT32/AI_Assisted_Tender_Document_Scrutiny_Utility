import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [user,setUser] = useState(null);

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if(isUser){
      const userObj = JSON.parse(isUser) 
      setUser(userObj.username);
    }
  }, []);
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col justify-between px-6 py-8">

      {/* Top Section */}
      <div>
        <nav className="flex flex-col gap-2">
          
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="tenders/create"
            end
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            Create Tender
          </NavLink>

          <NavLink
            to="tenders"
            end
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            View Tenders
          </NavLink>

          <NavLink
            to="my-bids"
            end
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            My Bids
          </NavLink>

          <NavLink
            to="my-tenders-bids"
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            My Tenders
          </NavLink>

        </nav>
      </div>

      {/* Footer Section */}
      <div className="pt-6 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-800">
        {user}
        </div>
        <div className="text-xs text-gray-500">
          Administrator
        </div>
      </div>

    </div>
  );
};

export default Sidebar;