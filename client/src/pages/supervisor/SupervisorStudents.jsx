import React, { useState } from "react";
import { useSupervisorDashboard } from "./SupervisorDashboardContext";
import { FaUserGraduate, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";

const SupervisorStudents = () => {
  const { data, addStudent, deleteStudent, updateStudentProgress } =
    useSupervisorDashboard();
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleAdd = (e) => {
    e.preventDefault();
    addStudent(newName);
    setNewName("");
    setModalOpen(false);
    toast.success("Student added!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateStudentProgress(selectedStudent.id, Number(progress));
    setEditModal(false);
    toast.success("Progress updated!");
  };

  return (
    <div className="animate-fadein max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supervised Students</h1>
      <button
        className="mb-4 bg-[#296C98] text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={() => setModalOpen(true)}
      >
        <FaPlus /> Add Student
      </button>
      <div className="space-y-4">
        {data.students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded shadow p-4 flex justify-between items-center group"
          >
            <div className="flex items-center gap-3">
              <FaUserGraduate className="text-[#296C98] text-2xl" />
              <div>
                <div className="font-semibold">{student.name}</div>
                <div className="text-xs text-gray-500">
                  Progress: {student.progress}% | Milestones:{" "}
                  {student.milestones} | Feedback: {student.feedback}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setSelectedStudent(student);
                  setProgress(student.progress);
                  setEditModal(true);
                }}
                title="Edit Progress"
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  deleteStudent(student.id);
                  toast.success("Student deleted!");
                }}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Add Student Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Student name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
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
      {/* Edit Progress Modal */}
      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Edit Progress</h2>
        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="number"
            min={0}
            max={100}
            className="w-full border rounded px-3 py-2"
            placeholder="Progress (%)"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#296C98] text-white"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SupervisorStudents;
