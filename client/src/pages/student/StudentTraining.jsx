// import React, { useState } from "react";
// import { useStudentDashboard } from "./StudentDashboardContext";
// import Modal from "react-modal";
// import {
//   FaFilePdf,
//   FaVideo,
//   FaCheckCircle,
//   FaQuestionCircle,
// } from "react-icons/fa";

// const iconForType = {
//   pdf: <FaFilePdf className="text-red-500" />,
//   video: <FaVideo className="text-blue-500" />,
//   quiz: <FaQuestionCircle className="text-yellow-500" />,
// };

// const StudentTraining = () => {
//   const { data, updateTrainingProgress } = useStudentDashboard();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedModule, setSelectedModule] = useState(null);

//   const openModule = (mod) => {
//     setSelectedModule(mod);
//     setModalOpen(true);
//   };

//   const toggleComplete = (mod) => {
//     updateTrainingProgress(mod.id, mod.progress === 100 ? 0 : 100);
//   };

//   return (
//     <div className="animate-fadein max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Training Modules</h1>
//       <div className="space-y-6">
//         {data.training.map((mod) => (
//           <div
//             key={mod.id}
//             className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div>
//               <div className="font-semibold">{mod.title}</div>
//               <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
//                 <div
//                   className="h-3 rounded-full bg-[#296C98] transition-all duration-500"
//                   style={{ width: `${mod.progress}%` }}
//                 />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className={`px-4 py-2 rounded text-white transition ${
//                   mod.progress === 100
//                     ? "bg-green-500 hover:bg-yellow-500"
//                     : "bg-[#296C98] hover:bg-green-500"
//                 }`}
//                 onClick={() => toggleComplete(mod)}
//               >
//                 {mod.progress === 100 ? "Unmark Complete" : "Mark Complete"}
//               </button>
//               <button
//                 className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//                 onClick={() => openModule(mod)}
//               >
//                 View Materials
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Modal
//         isOpen={modalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
//         overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
//         ariaHideApp={false}
//       >
//         {selectedModule && (
//           <>
//             <h2 className="text-xl font-bold mb-4">{selectedModule.title}</h2>
//             <div>
//               <h3 className="font-semibold mb-2">Materials</h3>
//               <ul className="space-y-2">
//                 {selectedModule.materials.map((mat) => (
//                   <li key={mat.id} className="flex items-center gap-2">
//                     {iconForType[mat.type] || null}
//                     <a
//                       href={mat.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="underline text-blue-600"
//                     >
//                       {mat.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="px-4 py-2 rounded bg-gray-200"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default StudentTraining;

import React, { useState } from "react";
import { TrainingProvider, useTraining } from "../../context/TrainingContext";
import { useStudentDashboard } from "./StudentDashboardContext";
import Modal from "react-modal";
import {
  FaFilePdf,
  FaVideo,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";

const iconForType = {
  pdf: <FaFilePdf className="text-red-500" />,
  video: <FaVideo className="text-blue-500" />,
  quiz: <FaQuestionCircle className="text-yellow-500" />,
};

const StudentTraining = () => {
  const { modules, markComplete, unmarkComplete, isCompleted } = useTraining();
  const { data } = useStudentDashboard();
  const studentId = data?.studentId || 1; // Replace with real student ID from auth/context
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const openModule = (mod) => {
    setSelectedModule(mod);
    setModalOpen(true);
  };

  const toggleComplete = (mod) => {
    if (isCompleted(studentId, mod.id)) {
      unmarkComplete(studentId, mod.id);
    } else {
      markComplete(studentId, mod.id);
    }
  };

  return (
    <TrainingProvider>
      <div className="animate-fadein max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Training Modules</h1>
        <div className="space-y-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <div className="font-semibold">{mod.title}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded text-white transition ${
                    isCompleted(studentId, mod.id)
                      ? "bg-green-500 hover:bg-yellow-500"
                      : "bg-[#296C98] hover:bg-green-500"
                  }`}
                  onClick={() => toggleComplete(mod)}
                >
                  {isCompleted(studentId, mod.id)
                    ? "Unmark Complete"
                    : "Mark Complete"}
                </button>
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => openModule(mod)}
                >
                  View Materials
                </button>
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
          overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
          ariaHideApp={false}
        >
          {selectedModule && (
            <>
              <h2 className="text-xl font-bold mb-4">{selectedModule.title}</h2>
              <div>
                <h3 className="font-semibold mb-2">Materials</h3>
                <ul className="space-y-2">
                  {selectedModule.materials.map((mat) => (
                    <li key={mat.id} className="flex items-center gap-2">
                      {iconForType[mat.type] || null}
                      <a
                        href={mat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600"
                      >
                        {mat.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </TrainingProvider>
  );
};

export default StudentTraining;
