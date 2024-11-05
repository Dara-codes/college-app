import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Building,
  BookOpen,
  Link as LinkIcon,
  ChevronDown,
} from "lucide-react";

const StudentSignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const universities = [
    "University of Lagos",
    "University of Ibadan",
    "Covenant University",
  ];

  const departments = ["Computer Science", "Engineering", "Mathematics"];

  const onSubmit = (data) => {
    console.log(data);
    navigate("/onboarding/student/profile");
  };

  const handleSkip = () => {
    navigate("/onboarding/student/profile");
  };

  const selectClasses =
    "w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77] appearance-none bg-white";

  return (
    <div className="w-full mx-auto max-w-md">
      <h2 className="text-[#0B4C77] text-[27px] leading-custom-line-height font-semibold mb-4">
        Sign up
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">
        <div className="">
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            User type
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value="Student"
              readOnly
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-50"
            />
          </div>
        </div>

        {/* University/Institution */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            University/Institution name
          </label>
          <div className="relative">
            <Building
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("university", {
                required: "Please select your institution",
              })}
              className={selectClasses}
            >
              <option value="">Select your institution</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          {errors.university && (
            <span className="text-red-500 text-sm mt-1">
              {errors.university.message}
            </span>
          )}
        </div>

        {/* Department/Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Department/Field of study
          </label>
          <div className="relative">
            <BookOpen
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              {...register("department", {
                required: "Please select your department",
              })}
              className={selectClasses}
            >
              <option value="">Select your department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
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

        {/* Supervisor Code */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Supervisor's invite code{" "}
            <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <LinkIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("supervisorCode")}
              type="text"
              placeholder="Enter invite code"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Create account
        </button>
      </form>

      {/* Skip Option */}
      <button
        onClick={handleSkip}
        className="mt-4 w-full text-[#0B4C77] text-sm hover:underline"
      >
        Skip
      </button>

      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-[#0B4C77] hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default StudentSignIn;
