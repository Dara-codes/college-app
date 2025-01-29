import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { toast } from "react-hot-toast";

const ResetSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show success toast when component mounts
    toast.success("Password reset successful!");
  }, []);

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#0B4C77] flex items-center justify-center">
            <Shield className="text-white" size={24} />
          </div>
        </div>

        {/* Title and Message */}
        <h2 className="text-[#0B4C77] text-2xl font-semibold text-center mb-2">
          Password reset successful
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Password reset successful. Click the button below to go back to login
        </p>

        {/* Back to Login Button */}
        <button
          onClick={handleBackToLogin}
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;
