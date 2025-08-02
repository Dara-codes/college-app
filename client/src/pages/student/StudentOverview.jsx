// import React from "react";
// const StudentOverview = () => (
//   <div className="animate-fadein">
//     <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
//     <p>Welcome! Here’s a summary of your progress and upcoming milestones.</p>
//   </div>
// );
// export default StudentOverview;

// import React, { useEffect, useState } from "react";
// import { FaTasks, FaCheckCircle, FaComments } from "react-icons/fa";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";

// const dummyStats = {
//   milestonesCompleted: 4,
//   totalMilestones: 6,
//   feedbackCount: 3,
//   logsCount: 12,
// };

// const dummyActivities = [
//   {
//     type: "Milestone",
//     text: "Submitted Literature Review",
//     date: "2025-06-15",
//   },
//   { type: "Log", text: "Logged research activity", date: "2025-06-14" },
//   {
//     type: "Feedback",
//     text: "Received supervisor feedback",
//     date: "2025-06-13",
//   },
// ];

// const StudentOverview = () => {
//   const [stats, setStats] = useState(dummyStats);
//   const [activities, setActivities] = useState(dummyActivities);

//   const chartData = {
//     labels: ["Completed", "Remaining"],
//     datasets: [
//       {
//         data: [
//           stats.milestonesCompleted,
//           stats.totalMilestones - stats.milestonesCompleted,
//         ],
//         backgroundColor: ["#36A2EB", "#E5E7EB"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   return (
//     <div className="grid gap-8">
//       {/* Statistic Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-fadein">
//           <FaTasks className="text-3xl text-[#296C98]" />
//           <div>
//             <div className="text-2xl font-bold">{stats.totalMilestones}</div>
//             <div className="text-gray-500">Total Milestones</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-fadein">
//           <FaCheckCircle className="text-3xl text-green-500" />
//           <div>
//             <div className="text-2xl font-bold">
//               {stats.milestonesCompleted}
//             </div>
//             <div className="text-gray-500">Completed</div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-fadein">
//           <FaComments className="text-3xl text-[#F6AD37]" />
//           <div>
//             <div className="text-2xl font-bold">{stats.feedbackCount}</div>
//             <div className="text-gray-500">Feedback</div>
//           </div>
//         </div>
//       </div>

//       {/* Milestone Progress Chart */}
//       <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-8 animate-fadein">
//         <div className="w-40 h-40">
//           <Doughnut data={chartData} />
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Milestone Progress</h2>
//           <p>
//             {stats.milestonesCompleted} of {stats.totalMilestones} milestones
//             completed
//           </p>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-xl shadow p-6 animate-fadein">
//         <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
//         <ul className="divide-y">
//           {activities.map((act, idx) => (
//             <li key={idx} className="py-2 flex justify-between items-center">
//               <span>
//                 <span className="font-medium">{act.type}:</span> {act.text}
//               </span>
//               <span className="text-gray-400 text-sm">{act.date}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default StudentOverview;

import React from "react";
import { useStudentDashboard } from "./StudentDashboardContext";
import { FaTasks, FaCheckCircle, FaComments } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const StudentOverview = () => {
  const { data } = useStudentDashboard();
  const completed = data.milestones.filter(
    (m) => m.status === "completed"
  ).length;
  const total = data.milestones.length;

  const chartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, total - completed],
        backgroundColor: ["#36A2EB", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="grid gap-8">
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-fadein">
          <FaTasks className="text-3xl text-[#296C98]" />
          <div>
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-gray-500">Total Milestones</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-fadein">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <div className="text-2xl font-bold">{completed}</div>
            <div className="text-gray-500">Completed</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-fadein">
          <FaComments className="text-3xl text-[#F6AD37]" />
          <div>
            <div className="text-2xl font-bold">{data.feedback.length}</div>
            <div className="text-gray-500">Feedback</div>
          </div>
        </div>
      </div>

      {/* Milestone Progress Chart */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-8 animate-fadein">
        <div className="w-40 h-40">
          <Doughnut data={chartData} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Milestone Progress</h2>
          <p>
            {completed} of {total} milestones completed
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6 animate-fadein">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="divide-y">
          {data.logs.slice(0, 3).map((act, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center">
              <span>
                <span className="font-medium">Log:</span> {act.entry}
              </span>
              <span className="text-gray-400 text-sm">{act.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentOverview;
