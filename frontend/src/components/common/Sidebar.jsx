function Sidebar({ title, items = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 h-fit">
      <h2 className="font-bold text-lg mb-6">{title}</h2>

      <ul className="space-y-4 text-gray-600">
        {items.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
              item.active ? "text-teal-600 font-semibold" : ""
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;