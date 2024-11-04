import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Calendar, Target } from "lucide-react";

const SetMilestone = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/onboarding/student/research");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-[#0B4C77] text-2xl font-semibold mb-4">Milestone</h2>
      <p className="text-gray-600 mb-8">
        Finish your Thesis faster with our help
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Set a Milestone */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Set a Milestone
          </label>
          <div className="relative">
            <Target
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("milestone", {
                required: "Milestone is required",
              })}
              type="text"
              placeholder="Set a Milestone"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
          {errors.milestone && (
            <span className="text-red-500 text-sm mt-1">
              {errors.milestone.message}
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
