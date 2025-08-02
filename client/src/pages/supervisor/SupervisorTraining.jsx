// import React from "react";
// import { useSupervisorDashboard } from "./SupervisorDashboardContext";

// const SupervisorTraining = () => {
//   const { data, toggleTrainingCompletion } = useSupervisorDashboard();

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
//             <button
//               className={`px-4 py-2 rounded text-white transition ${
//                 mod.progress === 100
//                   ? "bg-green-500 hover:bg-yellow-500"
//                   : "bg-[#296C98] hover:bg-green-500"
//               }`}
//               onClick={() => toggleTrainingCompletion(mod.id)}
//             >
//               {mod.progress === 100 ? "Unmark Complete" : "Mark Complete"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SupervisorTraining;

import React, { useState } from "react";
import { useTraining } from "../../context/TrainingContext";
import { useSupervisorDashboard } from "./SupervisorDashboardContext";
import Modal from "react-modal";
import { FaTrash, FaPlus, FaUsers } from "react-icons/fa";

const SupervisorTraining = () => {
  const { modules, addModule, deleteModule, getModuleCompletions } =
    useTraining();
  const { data } = useSupervisorDashboard(); // for student list
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [materials, setMaterials] = useState([
    { id: 1, type: "pdf", title: "", url: "" },
  ]);
  const [viewCompletions, setViewCompletions] = useState(null);

  const handleAddMaterial = () => {
    setMaterials([
      ...materials,
      { id: Date.now(), type: "pdf", title: "", url: "" },
    ]);
  };

  const handleMaterialChange = (idx, field, value) => {
    setMaterials(
      materials.map((mat, i) => (i === idx ? { ...mat, [field]: value } : mat))
    );
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    addModule(title, materials);
    setTitle("");
    setMaterials([{ id: 1, type: "pdf", title: "", url: "" }]);
    setModalOpen(false);
  };

  return (
    <div className="animate-fadein max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Training Modules</h1>
      <button
        className="mb-4 bg-[#296C98] text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={() => setModalOpen(true)}
      >
        <FaPlus /> Add Module
      </button>
      <div className="space-y-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div className="font-semibold">{mod.title}</div>
              <div className="text-xs text-gray-500">
                Materials: {mod.materials.length}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-2 rounded bg-blue-100 text-blue-700 flex items-center gap-1"
                onClick={() => setViewCompletions(mod)}
              >
                <FaUsers /> Completions
              </button>
              <button
                className="px-3 py-2 rounded bg-red-100 text-red-700"
                onClick={() => deleteModule(mod.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Add Module Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Add Training Module</h2>
        <form onSubmit={handleAddModule} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Module title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div>
            <div className="font-semibold mb-2">Materials</div>
            {materials.map((mat, idx) => (
              <div key={mat.id} className="flex gap-2 mb-2">
                <select
                  value={mat.type}
                  onChange={(e) =>
                    handleMaterialChange(idx, "type", e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="quiz">Quiz</option>
                </select>
                <input
                  className="border rounded px-2 py-1 flex-1"
                  placeholder="Title"
                  value={mat.title}
                  onChange={(e) =>
                    handleMaterialChange(idx, "title", e.target.value)
                  }
                  required
                />
                <input
                  className="border rounded px-2 py-1 flex-1"
                  placeholder="URL"
                  value={mat.url}
                  onChange={(e) =>
                    handleMaterialChange(idx, "url", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={handleAddMaterial}
            >
              + Add Material
            </button>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#296C98] text-white"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
      {/* View Completions Modal */}
      <Modal
        isOpen={!!viewCompletions}
        onRequestClose={() => setViewCompletions(null)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        {viewCompletions && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Completed: {viewCompletions.title}
            </h2>
            <ul>
              {getModuleCompletions(viewCompletions.id).length === 0 && (
                <li className="text-gray-500">
                  No student has completed this module yet.
                </li>
              )}
              {getModuleCompletions(viewCompletions.id).map((c, idx) => {
                const student = data.students.find((s) => s.id === c.studentId);
                return (
                  <li key={idx} className="mb-2">
                    {student ? student.name : "Unknown Student"}
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setViewCompletions(null)}
              >
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SupervisorTraining;
