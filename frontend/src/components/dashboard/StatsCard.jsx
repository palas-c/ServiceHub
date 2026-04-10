function StatsCard({ title, value, hint, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center justify-between">
        <p className="text-gray-500">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      {hint && <p className="text-sm text-gray-500 mt-2">{hint}</p>}
    </div>
  );
}

export default StatsCard;
