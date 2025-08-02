// import { createContext, useContext, useState, useEffect } from "react";
// import axios from '../utils/axiosConfig'
// import { USER_TOKEN_KEY } from "../utils/constants";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [registrationData, setRegistrationData] = useState(() => {
//     // Get saved registration data from localStorage
//     const saved = localStorage.getItem("registrationData");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const [onboardingProgress, setOnboardingProgress] = useState(() => {
//     // Get saved progress from localStorage
//     const saved = localStorage.getItem("onboardingProgress");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           step: 0,
//           studentSignIn: false,
//           profile: false,
//           milestone: false,
//           research: false,
//           supervisorSignIn: false,
//           supervisorAdditional: false,
//         };
//   });

//   useEffect(() => {
//     // Check if user is logged in
//     checkAuthStatus();
//   }, []);

//   useEffect(() => {
//     // Save registration data to localStorage
//     if (registrationData) {
//       localStorage.setItem(
//         "registrationData",
//         JSON.stringify(registrationData)
//       );
//     }
//   }, [registrationData]);

//   useEffect(() => {
//     // Save onboarding progress to localStorage
//     localStorage.setItem(
//       "onboardingProgress",
//       JSON.stringify(onboardingProgress)
//     );
//   }, [onboardingProgress]);

//   const checkAuthStatus = async () => {
//     try {
//       // Check token in localStorage
//       const token = localStorage.getItem("token");
//       if (token) {
//         // Verify token with backend
//         // const userData = await verifyToken(token);
//         // setUser(userData);
//       }
//     } catch (error) {
//       console.error("Auth check failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOnboardingProgress = (step, data) => {
//     setOnboardingProgress((prev) => ({
//       ...prev,
//       step,
//       ...data,
//     }));
//   };

//   const loginUser = async (email, password) => {
//     try {
//       const response = await axios.post("/auth/login", { email, password });
//       const { token, user } = response.data;
//       localStorage.setItem(USER_TOKEN_KEY, token);
//       setUser(user);
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw error;
//     }
//   };

//   const registerDoctoralStudent = async (researchInterest) => {
//     try {
//       const userToRegister = {
//         ...registrationData,
//         researchInterest
//       }
//       setRegistrationData(userToRegister)
//       await axios.post("/auth/register/student", registrationData);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       throw error;
//     }
//   };

//   const registerSupervisor = async (additionalInfo) => {
//     try {
//       const userToRegister = {
//         ...registrationData,
//         ...additionalInfo
//       }
//       setRegistrationData(userToRegister)
//       await axios.post("/auth/register/supervisor", registrationData);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       throw error;
//     }
//   };

//   const initiateForgotPassword = async (userEmail) => {
//     try {
//       await axios.post("/auth/forgotpassword", { email: userEmail });
//     } catch (error) {
//       console.error("An error occurred while triggering reset password:", error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem(USER_TOKEN_KEY);
//     localStorage.removeItem("registrationData");
//     localStorage.removeItem("onboardingProgress");
//   };

//   const resetRegistrationData = () => {
//     setRegistrationData({})
//     localStorage.removeItem("registrationData");
//   }

//   const updateRegistrationData = (data) => {
//     const userToRegister = {
//       ...registrationData,
//       ...data
//     }
//     setRegistrationData(userToRegister)
//     console.log('registration data ', userToRegister)
//   }

//   const value = {
//     user,
//     loading,
//     registrationData,
//     onboardingProgress,
//     setRegistrationData,
//     updateOnboardingProgress,
//     logout,
//     loginUser,
//     registerDoctoralStudent,
//     updateRegistrationData,
//     initiateForgotPassword,
//     registerSupervisor,
//     resetRegistrationData
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { USER_TOKEN_KEY } from "../utils/constants";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrationData, setRegistrationData] = useState(() => {
    const saved = localStorage.getItem("registrationData");
    return saved ? JSON.parse(saved) : null;
  });

  const [onboardingProgress, setOnboardingProgress] = useState(() => {
    const saved = localStorage.getItem("onboardingProgress");
    return saved
      ? JSON.parse(saved)
      : {
          step: 0,
          studentSignIn: false,
          profile: false,
          milestone: false,
          research: false,
          supervisorSignIn: false,
          supervisorAdditional: false,
        };
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (registrationData) {
      localStorage.setItem(
        "registrationData",
        JSON.stringify(registrationData)
      );
    }
  }, [registrationData]);

  useEffect(() => {
    localStorage.setItem(
      "onboardingProgress",
      JSON.stringify(onboardingProgress)
    );
  }, [onboardingProgress]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Optionally verify token with backend
        // const userData = await verifyToken(token);
        // setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOnboardingProgress = (step, data) => {
    setOnboardingProgress((prev) => ({
      ...prev,
      step,
      ...data,
    }));
  };

  // UPDATED: Return user after login
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem(USER_TOKEN_KEY, token);
      setUser(user);
      return user; // <-- Return user for redirect logic
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const registerDoctoralStudent = async (researchInterest) => {
    try {
      const userToRegister = {
        ...registrationData,
        researchInterest,
      };
      setRegistrationData(userToRegister);
      await axios.post("/auth/register/student", registrationData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const registerSupervisor = async (additionalInfo) => {
    try {
      const userToRegister = {
        ...registrationData,
        ...additionalInfo,
      };
      setRegistrationData(userToRegister);
      await axios.post("/auth/register/supervisor", registrationData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const initiateForgotPassword = async (userEmail) => {
    try {
      await axios.post("/auth/forgotpassword", { email: userEmail });
    } catch (error) {
      console.error(
        "An error occurred while triggering reset password:",
        error
      );
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem("registrationData");
    localStorage.removeItem("onboardingProgress");
  };

  const resetRegistrationData = () => {
    setRegistrationData({});
    localStorage.removeItem("registrationData");
  };

  const updateRegistrationData = (data) => {
    const userToRegister = {
      ...registrationData,
      ...data,
    };
    setRegistrationData(userToRegister);
    console.log("registration data ", userToRegister);
  };

  const value = {
    user,
    loading,
    registrationData,
    onboardingProgress,
    setRegistrationData,
    updateOnboardingProgress,
    logout,
    loginUser,
    registerDoctoralStudent,
    updateRegistrationData,
    initiateForgotPassword,
    registerSupervisor,
    resetRegistrationData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
