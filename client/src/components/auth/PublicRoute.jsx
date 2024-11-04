// // src/components/auth/PublicRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import LoadingSpinner from "../common/LoadingSpinner";

// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   // If user is authenticated, redirect to appropriate dashboard
//   if (user) {
//     const dashboardPath =
//       user.userType === "student"
//         ? "/student/dashboard"
//         : "/supervisor/dashboard";

//     return <Navigate to={dashboardPath} state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PublicRoute;
