// import React from "react";
// const StudentResearchLog = () => (
//   <div className="animate-fadein">
//     <h1 className="text-2xl font-bold mb-4">Research Log</h1>
//     <p>Log your research activities and notes.</p>
//   </div>
// );
// export default StudentResearchLog;
// import React, { useState } from "react";

// const dummyLogs = [
//   { entry: "Read 3 papers on deep learning.", date: "2025-06-15" },
//   { entry: "Met with supervisor for project discussion.", date: "2025-06-14" },
// ];

// const StudentResearchLog = () => {
//   const [logs, setLogs] = useState(dummyLogs);
//   const [input, setInput] = useState("");

//   const handleAddLog = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     setLogs([
//       { entry: input, date: new Date().toISOString().slice(0, 10) },
//       ...logs,
//     ]);
//     setInput("");
//   };

//   return (
//     <div className="animate-fadein max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Research Log</h1>
//       <form onSubmit={handleAddLog} className="mb-6 flex gap-2">
//         <input
//           className="flex-1 border rounded px-3 py-2"
//           placeholder="Add new log entry..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           className="bg-[#296C98] text-white px-4 py-2 rounded hover:bg-[#1e4a6e] transition"
//           type="submit"
//         >
//           Add
//         </button>
//       </form>
//       <div className="space-y-4">
//         {logs.map((log, idx) => (
//           <div key={idx} className="bg-white rounded shadow p-4">
//             <div className="text-gray-700">{log.entry}</div>
//             <div className="text-xs text-gray-400 mt-1">{log.date}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentResearchLog;

import React, { useState } from "react";
import { useStudentDashboard } from "./StudentDashboardContext";
import { FaTrash } from "react-icons/fa";

const StudentResearchLog = () => {
  const { data, addLog, deleteLog } = useStudentDashboard();
  const [input, setInput] = useState("");

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addLog(input);
    setInput("");
  };

  return (
    <div className="animate-fadein max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Research Log</h1>
      <form onSubmit={handleAddLog} className="mb-6 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Add new log entry..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-[#296C98] text-white px-4 py-2 rounded hover:bg-[#1e4a6e] transition"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="space-y-4">
        {data.logs.map((log) => (
          <div
            key={log.id}
            className="bg-white rounded shadow p-4 flex justify-between items-center group"
          >
            <div>
              <div className="text-gray-700">{log.entry}</div>
              <div className="text-xs text-gray-400 mt-1">{log.date}</div>
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 transition text-red-500 ml-4"
              onClick={() => deleteLog(log.id)}
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

export default StudentResearchLog;
