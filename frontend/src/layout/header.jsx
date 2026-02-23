const Header = () => {
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

      <div className="flex items-center gap-4">
        
        <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600">
          <span className="text-lg">🔔</span>
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600">
          <span className="text-lg">⚙️</span>
        </button>

      </div>

    </div>
  );
};

export default Header;