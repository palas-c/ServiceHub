function BookingList({ bookings = [], onAction, actionLabel = "View" }) {
  if (!bookings.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-gray-500">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Bookings</h2>
      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id || `${booking.name}-${booking.time}`}
            className="flex items-center justify-between border rounded-xl px-4 py-3"
          >
            <div>
              <p className="font-medium text-gray-800">{booking.name}</p>
              <p className="text-sm text-gray-500">{booking.time}</p>
            </div>
            <button
              className="bg-[#0f4c4c] text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              onClick={() => onAction && onAction(booking)}
            >
              {actionLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;
