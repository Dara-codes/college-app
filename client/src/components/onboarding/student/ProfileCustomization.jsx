import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

const ProfileCustomization = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/onboarding/student/milestone");
  };

  const handleSkip = () => {
    navigate("/onboarding/student/milestone");
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        {/* Avatar Circle */}
        <div className="w-24 h-24 bg-[#0B4C77] rounded-full flex items-center justify-center mb-4">
          <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <h2 className="text-[#0B4C77] text-2xl font-semibold">
          Personalize your Profile
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thesis Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Thesis Title
          </label>
          <div className="relative">
            <BookOpen
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("thesisTitle", {
                required: "Thesis title is required",
              })}
              type="text"
              placeholder="Enter your thesis title"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
          {errors.thesisTitle && (
            <span className="text-red-500 text-sm mt-1">
              {errors.thesisTitle.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1.5">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Description"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Next
        </button>
      </form>

      {/* Welcome Text and Skip */}
      <div className="mt-6 text-center space-y-4">
        <h3 className="text-xl font-medium text-gray-700">
          Thank you for Joining and welcome to (Project Design)
        </h3>
        <button
          onClick={handleSkip}
          className="text-[#0B4C77] text-sm hover:underline"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default ProfileCustomization;
