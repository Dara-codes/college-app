// src/utils/onboardingProgress.js
export const ONBOARDING_STEPS = {
  STUDENT: {
    steps: [
      { path: "/register/student", label: "Sign Up" },
      { path: "/register/student/profile", label: "Profile" },
      { path: "/register/student/milestone", label: "Milestone" },
      { path: "/register/student/research", label: "Research Interest" },
    ],
  },
  SUPERVISOR: {
    steps: [
      { path: "/register/supervisor", label: "Sign Up" },
      { path: "/register/supervisor/additional", label: "Additional Info" },
    ],
  },
};

export const getCurrentStepIndex = (pathname, userType) => {
  const steps = ONBOARDING_STEPS[userType]?.steps || [];
  return steps.findIndex((step) => pathname.includes(step.path));
};
