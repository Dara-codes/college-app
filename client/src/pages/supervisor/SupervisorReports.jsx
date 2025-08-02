import React, { useState } from "react";
import { useSupervisorDashboard } from "./SupervisorDashboardContext";
import { FaFileAlt, FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";

const SupervisorReports = () => {
  const { data, addReport, deleteReport } = useSupervisorDashboard();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewReport, setViewReport] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Monthly");

  const handleAdd = (e) => {
    e.preventDefault();
    addReport(title, type);
    toast.success("Report generated!");
    setModalOpen(false);
    setTitle("");
    setType("Monthly");
  };

  return (
    <div className="animate-fadein max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <button
        className="mb-4 bg-[#296C98] text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={() => setModalOpen(true)}
      >
        <FaPlus /> Generate Report
      </button>
      <div className="space-y-4">
        {data.reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <FaFileAlt className="text-[#F6AD37] text-xl" />
              <div>
                <div className="font-semibold">{report.title}</div>
                <div className="text-xs text-gray-500">{report.date}</div>
                <div className="text-xs text-gray-400">
                  {report.type || "Monthly"}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setViewReport(report)}
                title="View"
              >
                View
              </button>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => toast.success("Download started!")}
                title="Download"
              >
                <FaDownload />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  deleteReport(report.id);
                  toast.success("Report deleted!");
                }}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Generate Report Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Generate Report</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Report title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            className="w-full border rounded px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Monthly">Monthly</option>
            <option value="Student">Student</option>
            <option value="Custom">Custom</option>
          </select>
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
              Generate
            </button>
          </div>
        </form>
      </Modal>
      {/* View Report Modal */}
      <Modal
        isOpen={!!viewReport}
        onRequestClose={() => setViewReport(null)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
        ariaHideApp={false}
      >
        {viewReport && (
          <>
            <h2 className="text-xl font-bold mb-2">{viewReport.title}</h2>
            <div className="mb-2 text-gray-500">{viewReport.date}</div>
            <div className="mb-4 text-gray-400">
              {viewReport.type || "Monthly"}
            </div>
            <div>
              <p>
                This is a detailed report for <b>{viewReport.title}</b>. You can
                include charts, tables, and analytics here.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setViewReport(null)}
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

export default SupervisorReports;
