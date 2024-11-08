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

  return (
    <div className="w-full max-w-md mx-auto">
      {/* <h2 className="text-[#0B4C77] text-2xl font-semibold mb-8">
        Personalize your Profile
      </h2> */}

      {/* Avatar */}
      <div className="w-24 h-24 bg-[#0B4C77] rounded-full mx-auto mb-[24px] flex items-center justify-center">
        <svg
          className="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        {/* Thesis Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Thesis Title
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.8333 15.8331H17.5C17.9602 15.8331 18.3333 16.2062 18.3333 16.6664C18.3333 17.1267 17.9602 17.4998 17.5 17.4998H2.08333C1.6231 17.4998 1.25 17.1267 1.25 16.6664C1.25 16.2062 1.6231 15.8331 2.08333 15.8331H4.16667V7.98344C4.16667 7.6844 4.32691 7.40828 4.58655 7.25991L9.58655 4.40277C9.84274 4.25637 10.1573 4.25637 10.4134 4.40277L15.4135 7.25991C15.6731 7.40828 15.8333 7.6844 15.8333 7.98345V15.8331ZM9.16667 15.8331H10.8333V14.9998C10.8333 14.5396 10.4602 14.1665 10 14.1665C9.53976 14.1665 9.16667 14.5396 9.16667 14.9998V15.8331ZM13.3333 8.33318C13.3333 8.79341 12.9602 9.16651 12.5 9.16651H11.6667C11.2064 9.16651 10.8333 8.79341 10.8333 8.33318C10.8333 7.87294 11.2064 7.49984 11.6667 7.49984H12.5C12.9602 7.49984 13.3333 7.87294 13.3333 8.33318ZM8.33333 11.6665C8.79357 11.6665 9.16667 11.2934 9.16667 10.8332C9.16667 10.3729 8.79357 9.99984 8.33333 9.99984H7.5C7.03976 9.99984 6.66667 10.3729 6.66667 10.8332C6.66667 11.2934 7.03976 11.6665 7.5 11.6665H8.33333ZM9.16667 8.33318C9.16667 8.79341 8.79357 9.16651 8.33333 9.16651H7.5C7.03976 9.16651 6.66667 8.79341 6.66667 8.33318C6.66667 7.87294 7.03976 7.49984 7.5 7.49984H8.33333C8.79357 7.49984 9.16667 7.87294 9.16667 8.33318ZM12.5 11.6665C12.9602 11.6665 13.3333 11.2934 13.3333 10.8332C13.3333 10.3729 12.9602 9.99984 12.5 9.99984H11.6667C11.2064 9.99984 10.8333 10.3729 10.8333 10.8332C10.8333 11.2934 11.2064 11.6665 11.6667 11.6665H12.5ZM9.16667 13.3332C9.16667 13.7934 8.79357 14.1665 8.33333 14.1665H7.5C7.03976 14.1665 6.66667 13.7934 6.66667 13.3332C6.66667 12.8729 7.03976 12.4998 7.5 12.4998H8.33333C8.79357 12.4998 9.16667 12.8729 9.16667 13.3332ZM12.5 14.1665C12.9602 14.1665 13.3333 13.7934 13.3333 13.3332C13.3333 12.8729 12.9602 12.4998 12.5 12.4998H11.6667C11.2064 12.4998 10.8333 12.8729 10.8333 13.3332C10.8333 13.7934 11.2064 14.1665 11.6667 14.1665H12.5Z"
                fill="#676666"
              />
            </svg>
            <input
              {...register("thesisTitle", {
                required: "Thesis title is required",
              })}
              type="text"
              placeholder="Enter thesis title"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Description"
            rows={4}
            className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4C77] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt- py-3 bg-[#0B4C77] text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ProfileCustomization;
