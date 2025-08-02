import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import MiniLoader from "../../common/MiniLoader";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const loggedInUser = await loginUser(data.email, data.password);

      console.log("Logged in user:", loggedInUser);

      // Redirect based on user role
      if (
        loggedInUser?.role === "doctoral_student" ||
        loggedInUser?.userType === "student"
      ) {
        navigate("/student-dashboard", { replace: true });
      } else if (
        loggedInUser?.role === "supervisor" ||
        loggedInUser?.userType === "supervisor"
      ) {
        navigate("/supervisor-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true }); // fallback
      }
    } catch (err) {
      console.error("Login failed:", err, err?.response?.data);
      const errorMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "An unexpected error occurred during login";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[#0B4C77] font-inter text-2xl font-semibold mb-8">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Email
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                d="M16.667 3.83334H3.33366C2.41699 3.83334 1.66699 4.58334 1.66699 5.50001V15.5C1.66699 16.4167 2.41699 17.1667 3.33366 17.1667H16.667C17.5837 17.1667 18.3337 16.4167 18.3337 15.5V5.50001C18.3337 4.58334 17.5837 3.83334 16.667 3.83334ZM16.3337 7.37501L10.8837 10.7833C10.342 11.125 9.65866 11.125 9.11699 10.7833L3.66699 7.37501C3.45866 7.24168 3.33366 7.01668 3.33366 6.77501C3.33366 6.21668 3.94199 5.88334 4.41699 6.17501L10.0003 9.66668L15.5837 6.17501C16.0587 5.88334 16.667 6.21668 16.667 6.77501C16.667 7.01668 16.542 7.24168 16.3337 7.37501Z"
                fill="#494949"
              />
            </svg>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Password
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                d="M14.9997 7.16668H14.1663V5.50001C14.1663 3.20001 12.2997 1.33334 9.99967 1.33334C7.69967 1.33334 5.83301 3.20001 5.83301 5.50001V7.16668H4.99967C4.08301 7.16668 3.33301 7.91668 3.33301 8.83334V17.1667C3.33301 18.0833 4.08301 18.8333 4.99967 18.8333H14.9997C15.9163 18.8333 16.6663 18.0833 16.6663 17.1667V8.83334C16.6663 7.91668 15.9163 7.16668 14.9997 7.16668ZM9.99967 14.6667C9.08301 14.6667 8.33301 13.9167 8.33301 13C8.33301 12.0833 9.08301 11.3333 9.99967 11.3333C10.9163 11.3333 11.6663 12.0833 11.6663 13C11.6663 13.9167 10.9163 14.6667 9.99967 14.6667ZM7.49967 7.16668V5.50001C7.49967 4.11668 8.61634 3.00001 9.99967 3.00001C11.383 3.00001 12.4997 4.11668 12.4997 5.50001V7.16668H7.49967Z"
                fill="#494949"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
          <Link
            to="/auth/forgot-password"
            className="block text-right text-red-500 text-sm mt-1 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg font-medium"
        >
          {isLoading ? (
            <MiniLoader loadingText={"Login"} />
          ) : (
            <span>Login</span>
          )}
        </button>

        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-[#0B4C77] hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
