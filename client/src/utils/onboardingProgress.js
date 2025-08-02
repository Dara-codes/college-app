// src/utils/onboardingProgress.js
// export const ONBOARDING_STEPS = {
//   STUDENT: {
//     steps: [
//       { path: "/register/student", label: "Sign Up" },
//       { path: "/register/student/profile", label: "Profile" },
//       { path: "/register/student/milestone", label: "Milestone" },
//       { path: "/register/student/research", label: "Research Interest" },
//     ],
//   },
//   SUPERVISOR: {
//     steps: [
//       { path: "/register/supervisor", label: "Sign Up" },
//       { path: "/register/supervisor/additional", label: "Additional Info" },
//     ],
//   },
// };

// export const getCurrentStepIndex = (pathname, userType) => {
//   const steps = ONBOARDING_STEPS[userType]?.steps || [];
//   return steps.findIndex((step) => pathname.includes(step.path));
// };

import axios from "axios";

const apiBaseUri =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9000/api/v1";

const axiosDefaultInstance = axios.create({
  baseURL: apiBaseUri,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

axiosDefaultInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosDefaultInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosDefaultInstance;
