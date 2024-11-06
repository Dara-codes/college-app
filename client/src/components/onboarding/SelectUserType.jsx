import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SelectUserType = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateRegistrationData } = useAuth()

  const onSubmit = (data) => {
    updateRegistrationData(data)
    if (data.userType === "student") {
      navigate("/onboarding/student/signup");
    } else {
      navigate("/onboarding/supervisor/signup");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            User type
          </label>
          <div className="relative">
            <select
              {...register("userType", {
                required: "Please select a user type",
              })}
              className={`w-full px-4 py-3 pr-10 rounded-lg bg-white border ${
                errors.userType ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77] appearance-none`}
            >
              <option value="">Choose user</option>
              <option value="student">Student</option>
              <option value="supervisor">Supervisor</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          {errors.userType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userType.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Create account
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

export default SelectUserType;
