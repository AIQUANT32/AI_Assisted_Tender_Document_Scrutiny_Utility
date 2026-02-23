const StatsCard = ({ title, value, badge }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-start">
      
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-800">
          {value}
        </h2>
      </div>

      {badge && (
        <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {badge}
        </div>
      )}

    </div>
  );
};

export default StatsCard;