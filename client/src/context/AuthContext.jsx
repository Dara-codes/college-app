import { createContext, useContext, useState, useEffect } from "react";

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
    // Get saved registration data from localStorage
    const saved = localStorage.getItem("registrationData");
    return saved ? JSON.parse(saved) : null;
  });

  const [onboardingProgress, setOnboardingProgress] = useState(() => {
    // Get saved progress from localStorage
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
    // Check if user is logged in
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Save registration data to localStorage
    if (registrationData) {
      localStorage.setItem(
        "registrationData",
        JSON.stringify(registrationData)
      );
    }
  }, [registrationData]);

  useEffect(() => {
    // Save onboarding progress to localStorage
    localStorage.setItem(
      "onboardingProgress",
      JSON.stringify(onboardingProgress)
    );
  }, [onboardingProgress]);

  const checkAuthStatus = async () => {
    try {
      // Check token in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        // Verify token with backend
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("registrationData");
    localStorage.removeItem("onboardingProgress");
  };

  const value = {
    user,
    loading,
    registrationData,
    onboardingProgress,
    setRegistrationData,
    updateOnboardingProgress,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
