import React, { createContext, useContext, useState } from "react";

const initialModules = [
  {
    id: 1,
    title: "Research Methodologies",
    materials: [
      { id: 1, type: "video", title: "Intro to Research", url: "#" },
      { id: 2, type: "pdf", title: "Research Methods Guide", url: "#" },
    ],
  },
  {
    id: 2,
    title: "Academic Writing",
    materials: [
      { id: 1, type: "pdf", title: "Writing Your Thesis", url: "#" },
      { id: 2, type: "quiz", title: "Plagiarism Quiz", url: "#" },
    ],
  },
];

const initialCompletions = [
  // { studentId: 1, moduleId: 1, completed: true }
];

const TrainingContext = createContext();

export const useTraining = () => useContext(TrainingContext);

export const TrainingProvider = ({ children }) => {
  const [modules, setModules] = useState(initialModules);
  const [completions, setCompletions] = useState(initialCompletions);

  // Supervisor actions
  const addModule = (title, materials) => {
    setModules((prev) => [...prev, { id: Date.now(), title, materials }]);
  };

  const deleteModule = (id) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
    setCompletions((prev) => prev.filter((c) => c.moduleId !== id));
  };

  // Student actions
  const markComplete = (studentId, moduleId) => {
    setCompletions((prev) => [
      ...prev,
      { studentId, moduleId, completed: true },
    ]);
  };

  const unmarkComplete = (studentId, moduleId) => {
    setCompletions((prev) =>
      prev.filter(
        (c) => !(c.studentId === studentId && c.moduleId === moduleId)
      )
    );
  };

  // Query
  const isCompleted = (studentId, moduleId) =>
    completions.some(
      (c) => c.studentId === studentId && c.moduleId === moduleId && c.completed
    );

  // For supervisor: get all completions for a module
  const getModuleCompletions = (moduleId) =>
    completions.filter((c) => c.moduleId === moduleId && c.completed);

  return (
    <TrainingContext.Provider
      value={{
        modules,
        addModule,
        deleteModule,
        markComplete,
        unmarkComplete,
        isCompleted,
        getModuleCompletions,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};
