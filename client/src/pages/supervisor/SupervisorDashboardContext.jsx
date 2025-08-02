import React, { createContext, useContext, useState } from "react";

const initialData = {
  students: [
    { id: 1, name: "Alice Johnson", progress: 80, milestones: 4, feedback: 2 },
    { id: 2, name: "Bob Smith", progress: 50, milestones: 3, feedback: 1 },
  ],
  reviews: [
    { id: 1, studentId: 1, text: "Excellent progress!", date: "2025-06-10" },
    {
      id: 2,
      studentId: 2,
      text: "Needs to focus on writing.",
      date: "2025-06-09",
    },
  ],
  reports: [
    { id: 1, title: "Monthly Progress", date: "2025-06-01", type: "Monthly" },
  ],
  training: [
    { id: 1, title: "Mentorship Skills", progress: 100 },
    { id: 2, title: "Research Ethics", progress: 60 },
  ],
};

const SupervisorDashboardContext = createContext();

export const useSupervisorDashboard = () =>
  useContext(SupervisorDashboardContext);

export const SupervisorDashboardProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  // STUDENTS
  const addStudent = async (name) => {
    const newStudent = {
      id: Date.now(),
      name,
      progress: 0,
      milestones: 0,
      feedback: 0,
    };
    setData((prev) => ({
      ...prev,
      students: [...prev.students, newStudent],
    }));
  };

  const deleteStudent = async (id) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
      reviews: prev.reviews.filter((r) => r.studentId !== id),
    }));
  };

  const updateStudentProgress = async (id, progress) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === id ? { ...s, progress } : s
      ),
    }));
  };

  // REVIEWS
  const addReview = async (studentId, text) => {
    const newReview = {
      id: Date.now(),
      studentId,
      text,
      date: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => {
      const students = prev.students.map((s) =>
        s.id === studentId ? { ...s, feedback: (s.feedback || 0) + 1 } : s
      );
      return {
        ...prev,
        reviews: [newReview, ...prev.reviews],
        students,
      };
    });
  };

  const deleteReview = async (reviewId) => {
    setData((prev) => {
      const review = prev.reviews.find((r) => r.id === reviewId);
      let students = prev.students;
      if (review) {
        students = prev.students.map((s) =>
          s.id === review.studentId
            ? { ...s, feedback: Math.max(0, (s.feedback || 1) - 1) }
            : s
        );
      }
      return {
        ...prev,
        reviews: prev.reviews.filter((r) => r.id !== reviewId),
        students,
      };
    });
  };

  // REPORTS
  const addReport = async (title, type) => {
    const newReport = {
      id: Date.now(),
      title,
      date: new Date().toISOString().slice(0, 10),
      type,
    };
    setData((prev) => ({
      ...prev,
      reports: [newReport, ...prev.reports],
    }));
  };

  const deleteReport = async (id) => {
    setData((prev) => ({
      ...prev,
      reports: prev.reports.filter((r) => r.id !== id),
    }));
  };

  // TRAINING
  const updateTrainingProgress = async (id, progress) => {
    setData((prev) => ({
      ...prev,
      training: prev.training.map((t) =>
        t.id === id ? { ...t, progress } : t
      ),
    }));
  };

  const toggleTrainingCompletion = async (id) => {
    setData((prev) => ({
      ...prev,
      training: prev.training.map((t) =>
        t.id === id ? { ...t, progress: t.progress === 100 ? 0 : 100 } : t
      ),
    }));
  };

  return (
    <SupervisorDashboardContext.Provider
      value={{
        data,
        addStudent,
        deleteStudent,
        updateStudentProgress,
        addReview,
        deleteReview,
        addReport,
        deleteReport,
        updateTrainingProgress,
        toggleTrainingCompletion,
      }}
    >
      {children}
    </SupervisorDashboardContext.Provider>
  );
};
