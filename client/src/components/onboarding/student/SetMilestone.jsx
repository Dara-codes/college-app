import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Calendar, Target } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const SetMilestone = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updateRegistrationData } = useAuth()

  const onSubmit = (data) => {
    console.log(data);
    const userMilestones = {
      milestones: Array.isArray(data) ? data : [data]
    }
    updateRegistrationData(userMilestones)
    navigate("/onboarding/student/research");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* <h2 className="text-[#0B4C77] text-[27px] leading-custom-line-height font-semibold mb-4">
        Milestone
      </h2>
      <p className="font-inter text-custom-size font-medium leading-custom-line-height mb-[24px]">
        Finish your Thesis faster with our help
      </p> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Set a Milestone */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Set a Milestone
          </label>
          <div className="relative">
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
              <g clip-path="url(#clip0_2414_2236)">
                <path
                  d="M15.1959 2.44702C13.7192 1.42919 11.9292 0.833252 10 0.833252C4.93743 0.833252 0.833374 4.93731 0.833374 9.99992C0.833374 15.0625 4.93743 19.1666 10 19.1666C15.0626 19.1666 19.1667 15.0625 19.1667 9.99992C19.1667 8.07075 18.5708 6.28078 17.5529 4.80404L16.35 6.00702C17.0785 7.16323 17.5 8.53235 17.5 9.99992C17.5 14.1421 14.1422 17.4999 10 17.4999C5.8579 17.4999 2.50004 14.1421 2.50004 9.99992C2.50004 5.85778 5.8579 2.49992 10 2.49992C11.4676 2.49992 12.8367 2.92143 13.9929 3.65L15.1959 2.44702Z"
                  fill="#676666"
                />
                <path
                  d="M16.6667 0.833252C17.1269 0.833252 17.5 1.20635 17.5 1.66659V2.49992H18.3334C18.7936 2.49992 19.1667 2.87301 19.1667 3.33325C19.1667 3.79349 18.7936 4.16658 18.3334 4.16658H17.0119L11.5425 9.636C11.8585 9.75443 12.0834 10.0592 12.0834 10.4166C12.0834 10.8768 11.7103 11.2499 11.25 11.2499H9.58337C9.12314 11.2499 8.75004 10.8768 8.75004 10.4166V8.74992C8.75004 8.28968 9.12314 7.91658 9.58337 7.91658C9.94071 7.91658 10.2455 8.1415 10.364 8.45749L15.8334 2.98807V1.66659C15.8334 1.20635 16.2065 0.833252 16.6667 0.833252Z"
                  fill="#676666"
                />
                <path
                  d="M10 4.16658C11.0046 4.16658 11.9499 4.42053 12.7752 4.86773L11.5227 6.12024C11.051 5.93498 10.5374 5.83325 10 5.83325C7.69885 5.83325 5.83337 7.69873 5.83337 9.99992C5.83337 12.3011 7.69885 14.1666 10 14.1666C12.3012 14.1666 14.1667 12.3011 14.1667 9.99992C14.1667 9.46253 14.065 8.94891 13.8797 8.47726L15.1322 7.22476C15.5794 8.05004 15.8334 8.99532 15.8334 9.99992C15.8334 13.2216 13.2217 15.8333 10 15.8333C6.77838 15.8333 4.16671 13.2216 4.16671 9.99992C4.16671 6.77826 6.77838 4.16658 10 4.16658Z"
                  fill="#676666"
                />
              </g>
              <defs>
                <clipPath id="clip0_2414_2236">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <input
              {...register("title", {
                required: "Milestone is required",
              })}
              type="text"
              placeholder="Set a Milestone"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Start/Date
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("startDate", {
                required: "Start date is required",
              })}
              type="date"
              placeholder="DD/MM/YYYY"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
          {errors.startDate && (
            <span className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </span>
          )}
        </div>

        {/* Deadline Date */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Deadline/Date
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("deadlineDate", {
                required: "Deadline date is required",
              })}
              type="date"
              placeholder="DD/MM/YYYY"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
          {errors.deadlineDate && (
            <span className="text-red-500 text-sm mt-1">
              {errors.deadlineDate.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SetMilestone;
