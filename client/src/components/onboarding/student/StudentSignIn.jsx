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
      {/* <h2 className="text-[#0B4C77] text-[27px] leading-custom-line-height font-semibold mb-4">
        Sign up
      </h2> */}
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">
        <div className="">
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            User type
          </label>
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
              className="absolute left-3 top-1/2 -translate-y-1/2 "
            >
              <g clip-path="url(#clip0_2414_1712)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.1668 9.99992C19.1668 15.0625 15.0628 19.1666 10.0002 19.1666C4.93755 19.1666 0.833496 15.0625 0.833496 9.99992C0.833496 4.93731 4.93755 0.833252 10.0002 0.833252C15.0628 0.833252 19.1668 4.93731 19.1668 9.99992ZM9.9976 17.9166C7.58597 17.9166 3.17614 16.3061 4.36704 14.1666C5.41485 12.2842 7.53423 10.4166 9.9976 10.4166C12.461 10.4166 14.5804 12.2842 15.6282 14.1666C16.8379 16.3398 12.4092 17.9166 9.9976 17.9166ZM10.0002 9.99992C11.8411 9.99992 13.3335 8.50753 13.3335 6.66658C13.3335 4.82564 11.8411 3.33325 10.0002 3.33325C8.15921 3.33325 6.66683 4.82564 6.66683 6.66658C6.66683 8.50753 8.15921 9.99992 10.0002 9.99992Z"
                  fill="#676666"
                />
              </g>
              <defs>
                <clipPath id="clip0_2414_1712">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
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

        {/* Supervisor Code */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Supervisor's invite code{" "}
            <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            {/* <LinkIcon
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
                d="M14.1665 5.83325H11.6665C11.2082 5.83325 10.8332 6.20825 10.8332 6.66659C10.8332 7.12492 11.2082 7.49992 11.6665 7.49992H14.1665C15.5415 7.49992 16.6665 8.62492 16.6665 9.99992C16.6665 11.3749 15.5415 12.4999 14.1665 12.4999H11.6665C11.2082 12.4999 10.8332 12.8749 10.8332 13.3333C10.8332 13.7916 11.2082 14.1666 11.6665 14.1666H14.1665C16.4665 14.1666 18.3332 12.2999 18.3332 9.99992C18.3332 7.69992 16.4665 5.83325 14.1665 5.83325ZM6.6665 9.99992C6.6665 10.4583 7.0415 10.8333 7.49984 10.8333H12.4998C12.9582 10.8333 13.3332 10.4583 13.3332 9.99992C13.3332 9.54159 12.9582 9.16659 12.4998 9.16659H7.49984C7.0415 9.16659 6.6665 9.54159 6.6665 9.99992ZM8.33317 12.4999H5.83317C4.45817 12.4999 3.33317 11.3749 3.33317 9.99992C3.33317 8.62492 4.45817 7.49992 5.83317 7.49992H8.33317C8.7915 7.49992 9.1665 7.12492 9.1665 6.66659C9.1665 6.20825 8.7915 5.83325 8.33317 5.83325H5.83317C3.53317 5.83325 1.6665 7.69992 1.6665 9.99992C1.6665 12.2999 3.53317 14.1666 5.83317 14.1666H8.33317C8.7915 14.1666 9.1665 13.7916 9.1665 13.3333C9.1665 12.8749 8.7915 12.4999 8.33317 12.4999Z"
                fill="#494949"
              />
            </svg>
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
