import { useNavigate } from "react-router-dom";
import Button from "./Button";


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Tender Management Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage all tender processes
        </p>
      </div>

      <div className="flex items-center" onClick={handleLogout}>
        <Button />
      </div>

    </div>
  );
};

export default Header;