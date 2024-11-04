import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic
  };

  return (
    <div className="w-full">
      <h2 className="text-[#0B4C77] text-2xl font-semibold mb-8">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
          Login
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
