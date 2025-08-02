import React, { createContext, useContext, useState } from "react";

// Dummy initial data
const initialData = {
  milestones: [
    { id: 1, title: "Proposal Submission", status: "completed", progress: 100 },
    { id: 2, title: "Literature Review", status: "completed", progress: 100 },
    { id: 3, title: "Ethics Approval", status: "in progress", progress: 60 },
    { id: 4, title: "Data Collection", status: "pending", progress: 0 },
  ],
  feedback: [
    {
      id: 1,
      text: "Great supervision and timely feedback!",
      date: "2025-06-10",
    },
    {
      id: 2,
      text: "Would appreciate more frequent check-ins.",
      date: "2025-05-28",
    },
  ],
  logs: [
    { id: 1, entry: "Read 3 papers on deep learning.", date: "2025-06-15" },
    {
      id: 2,
      entry: "Met with supervisor for project discussion.",
      date: "2025-06-14",
    },
  ],
  training: [
    { id: 1, title: "Research Methodologies", progress: 100 },
    { id: 2, title: "Academic Writing", progress: 60 },
    { id: 3, title: "Ethics & Compliance", progress: 30 },
    { id: 4, title: "Time Management", progress: 0 },
  ],
};

const StudentDashboardContext = createContext();

export const useStudentDashboard = () => useContext(StudentDashboardContext);

export const StudentDashboardProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  // Simulate API call with setTimeout
  const addFeedback = async (text) => {
    const newFeedback = {
      id: Date.now(),
      text,
      date: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => ({
      ...prev,
      feedback: [newFeedback, ...prev.feedback],
    }));
  };

  const deleteFeedback = async (id) => {
    setData((prev) => ({
      ...prev,
      feedback: prev.feedback.filter((f) => f.id !== id),
    }));
  };

  const addLog = async (entry) => {
    const newLog = {
      id: Date.now(),
      entry,
      date: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => ({
      ...prev,
      logs: [newLog, ...prev.logs],
    }));
  };

  const deleteLog = async (id) => {
    setData((prev) => ({
      ...prev,
      logs: prev.logs.filter((l) => l.id !== id),
    }));
  };

  const updateMilestoneProgress = async (id, progress, status) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, progress, status } : m
      ),
    }));
  };

  const deleteMilestone = async (id) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  };

  const addMilestone = async (title) => {
    const newMilestone = {
      id: Date.now(),
      title,
      status: "pending",
      progress: 0,
    };
    setData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }));
  };

  // Training actions
  const updateTrainingProgress = async (id, progress) => {
    setData((prev) => ({
      ...prev,
      training: prev.training.map((t) =>
        t.id === id ? { ...t, progress } : t
      ),
    }));
  };

  return (
    <StudentDashboardContext.Provider
      value={{
        data,
        addFeedback,
        deleteFeedback,
        addLog,
        deleteLog,
        updateMilestoneProgress,
        deleteMilestone,
        addMilestone,
        updateTrainingProgress,
      }}
    >
      {children}
    </StudentDashboardContext.Provider>
  );
};
