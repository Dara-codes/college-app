import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CheckEmail = ({ userEmail }) => {
  // Get email from state/context that was entered in forgot password page
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-100">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#0B4C77] flex items-center justify-center">
            <Mail className="text-white" size={24} />
          </div>
        </div>

        {/* Title and Instructions */}
        <h2 className="text-[#0B4C77] text-2xl font-semibold text-center mb-2">
          Check your email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We've sent a password reset link to
          <br />
          <span className="text-gray-900">{userEmail}</span>
        </p>

        {/* Open Email App Button */}
        <button
          onClick={() => window.open(`mailto:${userEmail}`)}
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mb-4"
        >
          Open the email app
        </button>

        {/* Resend Link */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Didn't receive mail? Click to{" "}
          <button className="text-[#0B4C77] font-medium hover:underline" onClick={() => navigate("/auth/forgot-password")} >
            resend
          </button>
        </p>

        {/* Back to Sign In */}
        <div className="text-center">
          <Link
            to="/auth/login"
            className="text-[#0B4C77] hover:underline inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
