import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Search, Target, Microscope } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ResearchInterest = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // save to database
      console.log("Saving research data:", data);

      // Show success notification
      toast.success("Profile completed successfully!", {
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

      // Waiting for toast to be visible before redirecting
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save. Please try again.", {
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
      setIsSaving(false);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* <h2 className="text-[#0B4C77] text-2xl font-semibold mb-8">
        Research and Interest
      </h2> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-11">
        {/* Research Method */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Research Method
          </label>
          <div className="relative">
            {/* <Microscope
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
              <g clip-path="url(#clip0_2414_1926)">
                <path
                  d="M17.4499 9.16658C17.0666 5.69158 14.3083 2.93325 10.8333 2.54992V1.66659C10.8333 1.20825 10.4583 0.833252 9.99992 0.833252C9.54158 0.833252 9.16658 1.20825 9.16658 1.66659V2.54992C5.69158 2.93325 2.93325 5.69158 2.54992 9.16658H1.66659C1.20825 9.16658 0.833252 9.54158 0.833252 9.99992C0.833252 10.4583 1.20825 10.8333 1.66659 10.8333H2.54992C2.93325 14.3083 5.69158 17.0666 9.16658 17.4499V18.3333C9.16658 18.7916 9.54158 19.1666 9.99992 19.1666C10.4583 19.1666 10.8333 18.7916 10.8333 18.3333V17.4499C14.3083 17.0666 17.0666 14.3083 17.4499 10.8333H18.3333C18.7916 10.8333 19.1666 10.4583 19.1666 9.99992C19.1666 9.54158 18.7916 9.16658 18.3333 9.16658H17.4499ZM9.99992 15.8333C6.77492 15.8333 4.16658 13.2249 4.16658 9.99992C4.16658 6.77492 6.77492 4.16658 9.99992 4.16658C13.2249 4.16658 15.8333 6.77492 15.8333 9.99992C15.8333 13.2249 13.2249 15.8333 9.99992 15.8333Z"
                  fill="#1C1B1B"
                />
              </g>
              <defs>
                <clipPath id="clip0_2414_1926">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <input
              {...register("researchMethod", {
                required: "Research method is required",
              })}
              type="text"
              placeholder="Qualitative"
              className={inputClasses}
              disabled={isSaving}
            />
          </div>
          {errors.researchMethod && (
            <span className="text-red-500 text-sm mt-1">
              {errors.researchMethod.message}
            </span>
          )}
        </div>

        {/* Interests */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Interests
          </label>
          <div className="relative">
            {/* <Search
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
                d="M9.99175 1.66675C5.39175 1.66675 1.66675 5.40008 1.66675 10.0001C1.66675 14.6001 5.39175 18.3334 9.99175 18.3334C14.6001 18.3334 18.3334 14.6001 18.3334 10.0001C18.3334 5.40008 14.6001 1.66675 9.99175 1.66675ZM10.0001 16.6667C6.31675 16.6667 3.33341 13.6834 3.33341 10.0001C3.33341 6.31675 6.31675 3.33341 10.0001 3.33341C13.6834 3.33341 16.6667 6.31675 16.6667 10.0001C16.6667 13.6834 13.6834 16.6667 10.0001 16.6667ZM12.9167 9.16675C13.6084 9.16675 14.1667 8.60842 14.1667 7.91675C14.1667 7.22508 13.6084 6.66675 12.9167 6.66675C12.2251 6.66675 11.6667 7.22508 11.6667 7.91675C11.6667 8.60842 12.2251 9.16675 12.9167 9.16675ZM7.08342 9.16675C7.77508 9.16675 8.33342 8.60842 8.33342 7.91675C8.33342 7.22508 7.77508 6.66675 7.08342 6.66675C6.39175 6.66675 5.83342 7.22508 5.83342 7.91675C5.83342 8.60842 6.39175 9.16675 7.08342 9.16675ZM10.0001 14.5834C11.6917 14.5834 13.1667 13.6584 13.9584 12.2917C14.1167 12.0167 13.9167 11.6667 13.5917 11.6667H6.40841C6.09175 11.6667 5.88341 12.0167 6.04175 12.2917C6.83342 13.6584 8.30841 14.5834 10.0001 14.5834Z"
                fill="#1C1B1B"
              />
            </svg>
            <input
              {...register("interests", {
                required: "Interests are required",
              })}
              type="text"
              placeholder="a good article"
              className={inputClasses}
              disabled={isSaving}
            />
          </div>
          {errors.interests && (
            <span className="text-red-500 text-sm mt-1">
              {errors.interests.message}
            </span>
          )}
        </div>

        {/* Research Goals */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Research Goals
          </label>
          <div className="relative mb-5">
            {/* <Target
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
              <g clip-path="url(#clip0_2414_1936)">
                <path
                  d="M15.1958 2.44702C13.7191 1.42919 11.9291 0.833252 9.99992 0.833252C4.93731 0.833252 0.833252 4.93731 0.833252 9.99992C0.833252 15.0625 4.93731 19.1666 9.99992 19.1666C15.0625 19.1666 19.1666 15.0625 19.1666 9.99992C19.1666 8.07075 18.5706 6.28078 17.5528 4.80404L16.3498 6.00702C17.0784 7.16323 17.4999 8.53235 17.4999 9.99992C17.4999 14.1421 14.1421 17.4999 9.99992 17.4999C5.85778 17.4999 2.49992 14.1421 2.49992 9.99992C2.49992 5.85778 5.85778 2.49992 9.99992 2.49992C11.4675 2.49992 12.8366 2.92143 13.9928 3.65L15.1958 2.44702Z"
                  fill="#494949"
                />
                <path
                  d="M16.6666 0.833252C17.1268 0.833252 17.4999 1.20635 17.4999 1.66659V2.49992H18.3333C18.7935 2.49992 19.1666 2.87301 19.1666 3.33325C19.1666 3.79349 18.7935 4.16658 18.3333 4.16658H17.0118L11.5423 9.636C11.8583 9.75443 12.0833 10.0592 12.0833 10.4166C12.0833 10.8768 11.7102 11.2499 11.2499 11.2499H9.58325C9.12301 11.2499 8.74992 10.8768 8.74992 10.4166V8.74992C8.74992 8.28968 9.12301 7.91658 9.58325 7.91658C9.94059 7.91658 10.2454 8.1415 10.3638 8.45749L15.8333 2.98807V1.66659C15.8333 1.20635 16.2063 0.833252 16.6666 0.833252Z"
                  fill="#494949"
                />
                <path
                  d="M9.99992 4.16658C11.0045 4.16658 11.9498 4.42053 12.7751 4.86773L11.5226 6.12024C11.0509 5.93498 10.5373 5.83325 9.99992 5.83325C7.69873 5.83325 5.83325 7.69873 5.83325 9.99992C5.83325 12.3011 7.69873 14.1666 9.99992 14.1666C12.3011 14.1666 14.1666 12.3011 14.1666 9.99992C14.1666 9.46253 14.0649 8.94891 13.8796 8.47726L15.1321 7.22476C15.5793 8.05004 15.8333 8.99532 15.8333 9.99992C15.8333 13.2216 13.2216 15.8333 9.99992 15.8333C6.77826 15.8333 4.16658 13.2216 4.16658 9.99992C4.16658 6.77826 6.77826 4.16658 9.99992 4.16658Z"
                  fill="#494949"
                />
              </g>
              <defs>
                <clipPath id="clip0_2414_1936">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <input
              {...register("researchGoals", {
                required: "Research goals are required",
              })}
              type="text"
              placeholder="Qualitative"
              className={inputClasses}
              disabled={isSaving}
            />
          </div>
          {errors.researchGoals && (
            <span className="text-red-500 text-sm mt-1">
              {errors.researchGoals.message}
            </span>
          )}
        </div>
        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
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
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResearchInterest;
