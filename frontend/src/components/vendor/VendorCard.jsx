import Button from "../common/Button";
import { FaStar } from "react-icons/fa";

function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-6 items-center hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      <img
        src={vendor.image}
        alt={vendor.name}
        className="w-full md:w-28 h-40 md:h-28 rounded-xl object-cover"
      />

      <div className="flex-1 text-center md:text-left">

        <h3 className="text-xl font-semibold mb-1">
          {vendor.name}
        </h3>

        <div className="flex justify-center md:justify-start items-center gap-1 text-yellow-500 mb-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-gray-500 ml-2 text-sm">
            ({vendor.rating})
          </span>
        </div>

        <p className="text-gray-500">
          Starting at ₹{vendor.price}
        </p>
      </div>

      <Button className="w-full md:w-auto">
        View Profile
      </Button>

    </div>
  );
}

export default VendorCard;