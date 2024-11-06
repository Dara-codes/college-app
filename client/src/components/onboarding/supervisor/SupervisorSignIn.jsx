import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
// import { User, Building, BookOpen, Calendar, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

const SupervisorSignIn = () => {
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
    "w-full pl-10 pr-10 py-3 text-gray-400 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77] appearance-none bg-white";
  const labelClasses = "block text-gray-700 text-sm font-medium mb-1.5";

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Academic Title */}
        <div>
          <label className={labelClasses}>Academic Title</label>
          <div className="relative">
            {/* <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <g clip-path="url(#clip0_2391_1512)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.1667 9.99967C19.1667 15.0623 15.0626 19.1663 10 19.1663C4.93743 19.1663 0.833374 15.0623 0.833374 9.99967C0.833374 4.93706 4.93743 0.833008 10 0.833008C15.0626 0.833008 19.1667 4.93706 19.1667 9.99967ZM9.99748 17.9163C7.58585 17.9163 3.17602 16.3058 4.36692 14.1663C5.41473 12.2839 7.53411 10.4163 9.99748 10.4163C12.4608 10.4163 14.5802 12.2839 15.6281 14.1663C16.8378 16.3396 12.4091 17.9163 9.99748 17.9163ZM10 9.99967C11.841 9.99967 13.3334 8.50729 13.3334 6.66634C13.3334 4.82539 11.841 3.33301 10 3.33301C8.15909 3.33301 6.66671 4.82539 6.66671 6.66634C6.66671 8.50729 8.15909 9.99967 10 9.99967Z"
                  fill="#676666"
                />
              </g>
              <defs>
                <clipPath id="clip0_2391_1512">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <select
              {...register("academicTitle", {
                required: "Academic title is required",
              })}
              className={inputClasses}
            >
              <option value="Mr">Select Academic title</option>
              <option value="Mr">Mr</option>
              <option value="Dr">Doctor</option>
              <option value="Prof">Professor</option>
            </select>
            {/* <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            /> */}
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
            {/* <Building
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.8333 15.8331H17.5C17.9602 15.8331 18.3333 16.2062 18.3333 16.6664C18.3333 17.1267 17.9602 17.4998 17.5 17.4998H2.08333C1.6231 17.4998 1.25 17.1267 1.25 16.6664C1.25 16.2062 1.6231 15.8331 2.08333 15.8331H4.16667V7.98344C4.16667 7.6844 4.32691 7.40828 4.58655 7.25991L9.58655 4.40277C9.84274 4.25637 10.1573 4.25637 10.4134 4.40277L15.4135 7.25991C15.6731 7.40828 15.8333 7.6844 15.8333 7.98345V15.8331ZM9.16667 15.8331H10.8333V14.9998C10.8333 14.5396 10.4602 14.1665 10 14.1665C9.53976 14.1665 9.16667 14.5396 9.16667 14.9998V15.8331ZM13.3333 8.33318C13.3333 8.79341 12.9602 9.16651 12.5 9.16651H11.6667C11.2064 9.16651 10.8333 8.79341 10.8333 8.33318C10.8333 7.87294 11.2064 7.49984 11.6667 7.49984H12.5C12.9602 7.49984 13.3333 7.87294 13.3333 8.33318ZM8.33333 11.6665C8.79357 11.6665 9.16667 11.2934 9.16667 10.8332C9.16667 10.3729 8.79357 9.99984 8.33333 9.99984H7.5C7.03976 9.99984 6.66667 10.3729 6.66667 10.8332C6.66667 11.2934 7.03976 11.6665 7.5 11.6665H8.33333ZM9.16667 8.33318C9.16667 8.79341 8.79357 9.16651 8.33333 9.16651H7.5C7.03976 9.16651 6.66667 8.79341 6.66667 8.33318C6.66667 7.87294 7.03976 7.49984 7.5 7.49984H8.33333C8.79357 7.49984 9.16667 7.87294 9.16667 8.33318ZM12.5 11.6665C12.9602 11.6665 13.3333 11.2934 13.3333 10.8332C13.3333 10.3729 12.9602 9.99984 12.5 9.99984H11.6667C11.2064 9.99984 10.8333 10.3729 10.8333 10.8332C10.8333 11.2934 11.2064 11.6665 11.6667 11.6665H12.5ZM9.16667 13.3332C9.16667 13.7934 8.79357 14.1665 8.33333 14.1665H7.5C7.03976 14.1665 6.66667 13.7934 6.66667 13.3332C6.66667 12.8729 7.03976 12.4998 7.5 12.4998H8.33333C8.79357 12.4998 9.16667 12.8729 9.16667 13.3332ZM12.5 14.1665C12.9602 14.1665 13.3333 13.7934 13.3333 13.3332C13.3333 12.8729 12.9602 12.4998 12.5 12.4998H11.6667C11.2064 12.4998 10.8333 12.8729 10.8333 13.3332C10.8333 13.7934 11.2064 14.1665 11.6667 14.1665H12.5Z"
                fill="#676666"
              />
            </svg>
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
            {/* <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            /> */}
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
            {/* <BookOpen
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <path
                d="M4.16669 10.9834V13.3251C4.16669 13.9334 4.50002 14.5001 5.03336 14.7917L9.20003 17.0667C9.70003 17.3417 10.3 17.3417 10.8 17.0667L14.9667 14.7917C15.5 14.5001 15.8334 13.9334 15.8334 13.3251V10.9834L10.8 13.7334C10.3 14.0084 9.70003 14.0084 9.20003 13.7334L4.16669 10.9834ZM9.20003 2.9334L2.17502 6.76673C1.60002 7.0834 1.60002 7.91673 2.17502 8.2334L9.20003 12.0667C9.70003 12.3417 10.3 12.3417 10.8 12.0667L17.5 8.4084V13.3334C17.5 13.7917 17.875 14.1667 18.3334 14.1667C18.7917 14.1667 19.1667 13.7917 19.1667 13.3334V7.99173C19.1667 7.6834 19 7.4084 18.7334 7.2584L10.8 2.9334C10.3 2.66673 9.70003 2.66673 9.20003 2.9334Z"
                fill="#494949"
              />
            </svg>
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
            {/* <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            /> */}
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
            {/* <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2 "
            >
              <path
                d="M16.6666 2.49967H15.8333V1.66634C15.8333 1.20801 15.4583 0.833008 15 0.833008C14.5416 0.833008 14.1666 1.20801 14.1666 1.66634V2.49967H5.83329V1.66634C5.83329 1.20801 5.45829 0.833008 4.99996 0.833008C4.54163 0.833008 4.16663 1.20801 4.16663 1.66634V2.49967H3.33329C2.41663 2.49967 1.66663 3.24967 1.66663 4.16634V17.4997C1.66663 18.4163 2.41663 19.1663 3.33329 19.1663H16.6666C17.5833 19.1663 18.3333 18.4163 18.3333 17.4997V4.16634C18.3333 3.24967 17.5833 2.49967 16.6666 2.49967ZM15.8333 17.4997H4.16663C3.70829 17.4997 3.33329 17.1247 3.33329 16.6663V6.66634H16.6666V16.6663C16.6666 17.1247 16.2916 17.4997 15.8333 17.4997Z"
                fill="#1C1B1B"
              />
            </svg>
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
            {/* <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            /> */}
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
          className="w-full pt-[20px] py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

export default SupervisorSignIn;
