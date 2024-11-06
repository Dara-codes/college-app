import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SelectUserType = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                d="M9.99949 12.0834C11.6103 12.0834 12.9162 10.7776 12.9162 9.16675C12.9162 7.55592 11.6103 6.25008 9.99949 6.25008C8.38866 6.25008 7.08282 7.55592 7.08282 9.16675C7.08282 10.7776 8.38866 12.0834 9.99949 12.0834Z"
                fill="#494949"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3328 18.3291C14.1832 18.279 14.9539 17.7981 15.3709 17.0475L18.6116 11.2142C19.0311 10.4591 19.0311 9.54103 18.6116 8.78597L15.3709 2.95264C14.93 2.15898 14.0934 1.66675 13.1855 1.66675H6.81349C5.90558 1.66675 5.06902 2.15898 4.6281 2.95264L1.38736 8.78597C0.967885 9.54103 0.967885 10.4591 1.38736 11.2142L4.6281 17.0475C5.03155 17.7737 5.76623 18.2476 6.58374 18.3229V18.3334H13.3328V18.3291ZM6.81349 3.33341C6.51086 3.33341 6.232 3.49749 6.08503 3.76205L2.84429 9.59538C2.70446 9.84706 2.70446 10.1531 2.84429 10.4048L5.36455 14.9412C6.4433 14.3235 8.43264 13.3243 9.99949 13.3334C11.5712 13.3426 13.5684 14.3712 14.6132 14.9795L17.1547 10.4048C17.2945 10.1531 17.2945 9.84706 17.1547 9.59538L13.9139 3.76205C13.767 3.49749 13.4881 3.33341 13.1855 3.33341H6.81349Z"
                fill="#494949"
              />
            </svg>
            <select
              {...register("userType", {
                required: "Please select a user type",
              })}
              className={`w-full pl-10 py-3 pr-10 rounded-lg bg-white border ${
                errors.userType ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-[#0B4C77] appearance-none`}
            >
              <option value="">Choose user</option>
              <option value="student">Student</option>
              <option value="supervisor">Supervisor</option>
            </select>
            {/* <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path
                d="M4.66663 6.66699L7.99996 10.0003L11.3333 6.66699H4.66663Z"
                fill="#1C1B1B"
              />
            </svg>
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
