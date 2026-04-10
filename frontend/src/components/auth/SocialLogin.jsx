import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

function SocialLogin() {
  return (
    <div className="mt-6">

      {/* DIVIDER */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="text-sm text-gray-500">OR</p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* GOOGLE */}
      <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 mb-3 hover:bg-gray-100 transition">
        <FcGoogle size={20} />
        Continue with Google
      </button>

      {/* FACEBOOK */}
      <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 mb-3 hover:bg-gray-100 transition">
        <FaFacebookF className="text-blue-600" />
        Continue with Facebook
      </button>

      {/* APPLE */}
      <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-100 transition">
        <FaApple />
        Continue with Apple
      </button>

    </div>
  );
}

export default SocialLogin;