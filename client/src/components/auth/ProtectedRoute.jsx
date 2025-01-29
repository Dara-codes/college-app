// // src/components/auth/ProtectedRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import LoadingSpinner from "../common/LoadingSpinner";

// const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
//   const location = useLocation();
//   const { user, loading, registrationData, onboardingProgress } = useAuth();

//   // Show loading spinner while checking auth status
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   // Not authenticated - redirect to login
//   if (!user) {
//     // Save attempted url to redirect back after login
//     return <Navigate to="/auth/login" state={{ from: location }} replace />;
//   }

//   // Check if user type is allowed (if specified)
//   if (
//     allowedUserTypes.length > 0 &&
//     !allowedUserTypes.includes(user.userType)
//   ) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Check if onboarding is complete
//   const isOnboardingComplete =
//     user.userType === "student"
//       ? onboardingProgress.research // Last step for students
//       : onboardingProgress.supervisorAdditional; // Last step for supervisors

//   // If onboarding is not complete, redirect to appropriate step
//   if (!isOnboardingComplete) {
//     // Determine the correct onboarding step to redirect to
//     let redirectPath = "/onboarding/select-type";

//     if (user.userType === "student") {
//       if (!onboardingProgress.studentSignIn) {
//         redirectPath = "/onboarding/student";
//       } else if (!onboardingProgress.profile) {
//         redirectPath = "/onboarding/student/profile";
//       } else if (!onboardingProgress.milestone) {
//         redirectPath = "/onboarding/student/milestone";
//       } else if (!onboardingProgress.research) {
//         redirectPath = "/onboarding/student/research";
//       }
//     } else if (user.userType === "supervisor") {
//       if (!onboardingProgress.supervisorSignIn) {
//         redirectPath = "/onboarding/supervisor";
//       } else if (!onboardingProgress.supervisorAdditional) {
//         redirectPath = "/onboarding/supervisor/additional";
//       }
//     }

//     return <Navigate to={redirectPath} replace />;
//   }

//   // All checks passed - render the protected content
//   return children;
// };

// export default ProtectedRoute;
