function ServiceCard({ service, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={service.image}
        alt={service.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
        {service.description && <p className="text-sm text-gray-500 mt-1">{service.description}</p>}
        <button
          className="mt-4 bg-[#0f4c4c] text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          onClick={() => onView && onView(service)}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
