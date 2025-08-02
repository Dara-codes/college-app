// import React from "react";
// const StudentFeedback = () => (
//   <div className="animate-fadein">
//     <h1 className="text-2xl font-bold mb-4">Feedback</h1>
//     <p>View and submit feedback about your supervision experience.</p>
//   </div>
// );
// export default StudentFeedback;

// import React, { useState } from "react";

// const dummyFeedback = [
//   { text: "Great supervision and timely feedback!", date: "2025-06-10" },
//   { text: "Would appreciate more frequent check-ins.", date: "2025-05-28" },
// ];

// const StudentFeedback = () => {
//   const [feedbackList, setFeedbackList] = useState(dummyFeedback);
//   const [input, setInput] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     setFeedbackList([
//       { text: input, date: new Date().toISOString().slice(0, 10) },
//       ...feedbackList,
//     ]);
//     setInput("");
//   };

//   return (
//     <div className="animate-fadein max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Feedback</h1>
//       <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
//         <input
//           className="flex-1 border rounded px-3 py-2"
//           placeholder="Leave anonymous feedback..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           className="bg-[#296C98] text-white px-4 py-2 rounded hover:bg-[#1e4a6e] transition"
//           type="submit"
//         >
//           Submit
//         </button>
//       </form>
//       <div className="space-y-4">
//         {feedbackList.map((f, idx) => (
//           <div key={idx} className="bg-white rounded shadow p-4">
//             <div className="text-gray-700">{f.text}</div>
//             <div className="text-xs text-gray-400 mt-1">{f.date}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentFeedback;

import React, { useState } from "react";
import { useStudentDashboard } from "./StudentDashboardContext";
import { FaTrash } from "react-icons/fa";

const StudentFeedback = () => {
  const { data, addFeedback, deleteFeedback } = useStudentDashboard();
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addFeedback(input);
    setInput("");
  };

  return (
    <div className="animate-fadein max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Leave anonymous feedback..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-[#296C98] text-white px-4 py-2 rounded hover:bg-[#1e4a6e] transition"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="space-y-4">
        {data.feedback.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded shadow p-4 flex justify-between items-center group"
          >
            <div>
              <div className="text-gray-700">{f.text}</div>
              <div className="text-xs text-gray-400 mt-1">{f.date}</div>
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 transition text-red-500 ml-4"
              onClick={() => deleteFeedback(f.id)}
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentFeedback;
