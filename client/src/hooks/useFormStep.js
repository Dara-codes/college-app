import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useForm } from "../context/FormContext";

export const useFormStep = (step, nextPath) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateOnboardingProgress } = useAuth();
  const { updateFormData } = useForm();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Save form data
      updateFormData(step, data);

      // Update progress
      updateOnboardingProgress(step, { [step]: true });

      // Navigate to next step
      if (nextPath) {
        navigate(nextPath);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSubmit };
};
