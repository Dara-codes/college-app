import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const GeneralRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updateRegistrationData, resetRegistrationData } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => {
    // Only navigate if there are no errors
    if (Object.keys(errors).length === 0) {
      resetRegistrationData()
      updateRegistrationData(data)
      navigate("/onboarding/select-type");
    }
  };

  return (
    <div className="w-full mx-auto max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            First Name
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
                d="M10.0003 9.66667C11.8413 9.66667 13.3337 8.17428 13.3337 6.33333C13.3337 4.49238 11.8413 3 10.0003 3C8.15938 3 6.66699 4.49238 6.66699 6.33333C6.66699 8.17428 8.15938 9.66667 10.0003 9.66667Z"
                fill="#494949"
              />
              <path
                d="M4.4217 15.5C3.0412 17.7251 7.61094 18.8333 10.0003 18.8333C12.3897 18.8333 16.9594 17.7251 15.5789 15.5C14.5408 13.8267 12.441 12.1667 10.0003 12.1667C7.55968 12.1667 5.45985 13.8267 4.4217 15.5Z"
                fill="#494949"
              />
            </svg>
            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              type="text"
              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77]`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Last Name
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
                d="M10.0003 9.66667C11.8413 9.66667 13.3337 8.17428 13.3337 6.33333C13.3337 4.49238 11.8413 3 10.0003 3C8.15938 3 6.66699 4.49238 6.66699 6.33333C6.66699 8.17428 8.15938 9.66667 10.0003 9.66667Z"
                fill="#494949"
              />
              <path
                d="M4.4217 15.5C3.0412 17.7251 7.61094 18.8333 10.0003 18.8333C12.3897 18.8333 16.9594 17.7251 15.5789 15.5C14.5408 13.8267 12.441 12.1667 10.0003 12.1667C7.55968 12.1667 5.45985 13.8267 4.4217 15.5Z"
                fill="#494949"
              />
            </svg>
            <input
              {...register("lastName", {
                required: "Last name is required",
              })}
              type="text"
              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77]`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            {/* <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white border  ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77]`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            {/* <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77]`}
              placeholder="Create password"
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            {/* <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
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
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-3 rounded-lg bg-white border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77]`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium mt25"
        >
          Next
        </button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-[#0B4C77] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default GeneralRegister;
