// import React from "react";
// const SupervisorReviews = () => (
//   <div className="animate-fadein">
//     <h1 className="text-2xl font-bold mb-4">Reviews & Feedback</h1>
//     <p>Review student progress and provide feedback.</p>
//   </div>
// );
// export default SupervisorReviews;

// import React, { useState } from "react";
// import { useSupervisorDashboard } from "./SupervisorDashboardContext";
// import { FaTrash } from "react-icons/fa";
// import toast from "react-hot-toast";
// import Modal from "react-modal";

// const SupervisorReviews = () => {
//   const { data, addReview, deleteReview } = useSupervisorDashboard();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [student, setStudent] = useState("");
//   const [text, setText] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await addReview(student, text);
//     setModalOpen(false);
//     setStudent("");
//     setText("");
//     toast.success("Review added!");
//   };

//   const handleDelete = async (id) => {
//     await deleteReview(id);
//     toast.success("Review deleted!");
//   };

//   return (
//     <div className="animate-fadein max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Reviews & Feedback</h1>
//       <button
//         className="mb-4 bg-[#296C98] text-white px-4 py-2 rounded"
//         onClick={() => setModalOpen(true)}
//       >
//         Add Review
//       </button>
//       <div className="space-y-4">
//         {data.reviews.map((r) => (
//           <div
//             key={r.id}
//             className="bg-white rounded shadow p-4 flex justify-between items-center group"
//           >
//             <div>
//               <div className="font-semibold">{r.student}</div>
//               <div className="text-gray-700">{r.text}</div>
//               <div className="text-xs text-gray-400 mt-1">{r.date}</div>
//             </div>
//             <button
//               className="opacity-0 group-hover:opacity-100 transition text-red-500 ml-4"
//               onClick={() => handleDelete(r.id)}
//               title="Delete"
//             >
//               <FaTrash />
//             </button>
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
//         <h2 className="text-xl font-bold mb-4">Add Review</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full border rounded px-3 py-2"
//             placeholder="Student name"
//             value={student}
//             onChange={(e) => setStudent(e.target.value)}
//             required
//           />
//           <textarea
//             className="w-full border rounded px-3 py-2"
//             placeholder="Review text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               className="px-4 py-2 rounded bg-gray-200"
//               onClick={() => setModalOpen(false)}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded bg-[#296C98] text-white"
//             >
//               Add
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default SupervisorReviews;

import React, { useState } from "react";
import { useSupervisorDashboard } from "./SupervisorDashboardContext";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";

const SupervisorReviews = () => {
  const { data, addReview, deleteReview } = useSupervisorDashboard();
  const [modalOpen, setModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(data.students[0]?.id || "");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview(Number(studentId), text);
    setModalOpen(false);
    setStudentId(data.students[0]?.id || "");
    setText("");
    toast.success("Review added!");
  };

  const handleDelete = async (id) => {
    await deleteReview(id);
    toast.success("Review deleted!");
  };

  return (
    <div className="animate-fadein max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reviews & Feedback</h1>
      <button
        className="mb-4 bg-[#296C98] text-white px-4 py-2 rounded"
        onClick={() => setModalOpen(true)}
      >
        Add Review
      </button>
      <div className="space-y-4">
        {data.reviews.map((r) => {
          const student = data.students.find((s) => s.id === r.studentId);
          return (
            <div
              key={r.id}
              className="bg-white rounded shadow p-4 flex justify-between items-center group"
            >
              <div>
                <div className="font-semibold">
                  {student?.name || "Unknown"}
                </div>
                <div className="text-gray-700">{r.text}</div>
                <div className="text-xs text-gray-400 mt-1">{r.date}</div>
              </div>
              <button
                className="opacity-0 group-hover:opacity-100 transition text-red-500 ml-4"
                onClick={() => handleDelete(r.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            className="w-full border rounded px-3 py-2"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            {data.students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Review text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
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
    </div>
  );
};

export default SupervisorReviews;
