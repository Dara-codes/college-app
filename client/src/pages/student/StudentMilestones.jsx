// import React from "react";
// const StudentMilestones = () => (
//   <div className="animate-fadein">
//     <h1 className="text-2xl font-bold mb-4">Milestones</h1>
//     <p>Track and manage your research milestones here.</p>
//   </div>
// );
// export default StudentMilestones;

// import React, { useState } from "react";

// const dummyMilestones = [
//   { title: "Proposal Submission", status: "completed", progress: 100 },
//   { title: "Literature Review", status: "completed", progress: 100 },
//   { title: "Ethics Approval", status: "in progress", progress: 60 },
//   { title: "Data Collection", status: "pending", progress: 0 },
//   { title: "Thesis Writing", status: "pending", progress: 0 },
//   { title: "Final Submission", status: "pending", progress: 0 },
// ];

// const statusColors = {
//   completed: "bg-green-500",
//   "in progress": "bg-blue-500",
//   pending: "bg-gray-300",
// };

// const StudentMilestones = () => {
//   const [milestones, setMilestones] = useState(dummyMilestones);

//   return (
//     <div className="animate-fadein">
//       <h1 className="text-2xl font-bold mb-6">Milestones</h1>
//       <div className="space-y-6">
//         {milestones.map((m, idx) => (
//           <div key={idx} className="bg-white rounded-xl shadow p-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="font-semibold">{m.title}</span>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs text-white ${
//                   statusColors[m.status]
//                 }`}
//               >
//                 {m.status}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3">
//               <div
//                 className={`h-3 rounded-full transition-all duration-500 ${
//                   statusColors[m.status]
//                 }`}
//                 style={{ width: `${m.progress}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentMilestones;

import React, { useState } from "react";
import { useStudentDashboard } from "./StudentDashboardContext";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

const statusColors = {
  completed: "bg-green-500",
  "in progress": "bg-blue-500",
  pending: "bg-gray-300",
};

const StudentMilestones = () => {
  const { data, updateMilestoneProgress, deleteMilestone, addMilestone } =
    useStudentDashboard();
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addMilestone(newTitle);
    setNewTitle("");
  };

  return (
    <div className="animate-fadein max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Milestones</h1>
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="New milestone title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          className="bg-[#296C98] text-white px-4 py-2 rounded hover:bg-[#1e4a6e] transition"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="space-y-6">
        {data.milestones.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 group"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{m.title}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${
                    statusColors[m.status]
                  }`}
                >
                  {m.status}
                </span>
                <button
                  className="text-green-600 hover:text-green-800"
                  title="Mark as completed"
                  onClick={() =>
                    updateMilestoneProgress(m.id, 100, "completed")
                  }
                  disabled={m.status === "completed"}
                >
                  <FaCheck />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                  onClick={() => deleteMilestone(m.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  statusColors[m.status]
                }`}
                style={{ width: `${m.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMilestones;
