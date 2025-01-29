// src/pages/UnauthorizedPage.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => navigate(user ? "/" : "/auth/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {user ? "Go to Home" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
