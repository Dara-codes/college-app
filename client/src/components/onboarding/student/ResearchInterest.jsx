// // components/onboarding/student/ResearchInterest.jsx
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { Search, Target, Microscope } from "lucide-react";

// const ResearchInterest = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       // Here you would typically save to your database
//       console.log("Saving research data:", data);

//       // After successful save, redirect to login
//       navigate("/auth/login");
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const inputClasses =
//     "w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]";

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <h2 className="text-[#0B4C77] text-2xl font-semibold mb-8">
//         Research and Interest
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Research Method */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Research Method
//           </label>
//           <div className="relative">
//             <Microscope
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               {...register("researchMethod", {
//                 required: "Research method is required",
//               })}
//               type="text"
//               placeholder="Qualitative"
//               className={inputClasses}
//             />
//           </div>
//           {errors.researchMethod && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.researchMethod.message}
//             </span>
//           )}
//         </div>

//         {/* Interests */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Interests
//           </label>
//           <div className="relative">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               {...register("interests", {
//                 required: "Interests are required",
//               })}
//               type="text"
//               placeholder="a good article"
//               className={inputClasses}
//             />
//           </div>
//           {errors.interests && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.interests.message}
//             </span>
//           )}
//         </div>

//         {/* Research Goals */}
//         <div>
//           <label className="block text-gray-700 text-sm font-medium mb-2">
//             Research Goals
//           </label>
//           <div className="relative">
//             <Target
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               {...register("researchGoals", {
//                 required: "Research goals are required",
//               })}
//               type="text"
//               placeholder="Qualitative"
//               className={inputClasses}
//             />
//           </div>
//           {errors.researchGoals && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.researchGoals.message}
//             </span>
//           )}
//         </div>

//         {/* Save Button */}
//         <button
//           type="submit"
//           className="w-full py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResearchInterest;

// components/onboarding/student/ResearchInterest.jsx
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

      // Here you would save to your database
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

      // Wait for toast to be visible before redirecting
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
      <h2 className="text-[#0B4C77] text-2xl font-semibold mb-8">
        Research and Interest
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Research Method */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Research Method
          </label>
          <div className="relative">
            <Microscope
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
          <div className="relative">
            <Target
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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
