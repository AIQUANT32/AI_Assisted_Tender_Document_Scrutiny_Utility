const StatsCard = ({ title, value, badge }) => {
  return (
    <div className="stats-card">
      <div>
        <p className="stats-title">{title}</p>
        <h2 className="stats-value">{value}</h2>
      </div>

      {badge && <div className="stats-badge">{badge}</div>}
    </div>
  );
};

export default StatsCard;
