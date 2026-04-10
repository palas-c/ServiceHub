function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex gap-4 items-center">
      
      {/* IMAGE */}
      <div className="w-20 h-20 rounded-lg skeleton"></div>

      {/* TEXT */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded skeleton"></div>
        <div className="h-3 w-24 rounded skeleton"></div>
        <div className="h-3 w-20 rounded skeleton"></div>
      </div>

      {/* BUTTON */}
      <div className="h-10 w-20 rounded-lg skeleton"></div>

    </div>
  );
}

export default SkeletonCard;