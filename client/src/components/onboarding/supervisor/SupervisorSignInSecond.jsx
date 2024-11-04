import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { User, Building, BookOpen, Calendar, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

const SupervisorSignInSecond = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success notification
      toast.success("Account created successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#0B4C77",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
        icon: "🎉",
      });

      // Wait for toast to be visible before redirecting
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77] appearance-none bg-white";
  const labelClasses = "block text-gray-700 text-sm font-medium mb-1.5";

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-[#0B4C77] text-2xl font-semibold mb-6">
        Sign up (Project Design)
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Academic Title */}
        <div>
          <label className={labelClasses}>Academic Title</label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("academicTitle", {
                required: "Academic title is required",
              })}
              className={inputClasses}
            >
              <option value="">Select academic title</option>
              <option value="Mr">Mr</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          {errors.academicTitle && (
            <span className="text-red-500 text-sm mt-1">
              {errors.academicTitle.message}
            </span>
          )}
        </div>

        {/* University/Institution */}
        <div>
          <label className={labelClasses}>University/Institution name</label>
          <div className="relative">
            <Building
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("institution", {
                required: "Institution is required",
              })}
              className={inputClasses}
            >
              <option value="">Select institution</option>
              <option value="uni1">University One</option>
              <option value="uni2">University Two</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          {errors.institution && (
            <span className="text-red-500 text-sm mt-1">
              {errors.institution.message}
            </span>
          )}
        </div>

        {/* Department/Field */}
        <div>
          <label className={labelClasses}>Department/Field of study</label>
          <div className="relative">
            <BookOpen
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className={inputClasses}
            >
              <option value="">Select department</option>
              <option value="cs">Computer Science</option>
              <option value="eng">Engineering</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          {errors.department && (
            <span className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </span>
          )}
        </div>

        {/* Years of Experience */}
        <div>
          <label className={labelClasses}>Years of Experience</label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("experience", {
                required: "Years of experience is required",
              })}
              className={inputClasses}
            >
              <option value="">Select years</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5+">5+ years</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          {errors.experience && (
            <span className="text-red-500 text-sm mt-1">
              {errors.experience.message}
            </span>
          )}
        </div>

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create account"
          )}
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
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

export default SupervisorSignInSecond;
