import type { SurveyFormValues } from "./Survey.schema";
import fetchingWithToast from "@/lib/customFetch";

export const fetchSurveyData = async (): Promise<SurveyFormValues> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/survey`, {
    credentials: "include",
  });

  return response.json();
};

export const submitSurveyData = async (data: SurveyFormValues) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/survey`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit");
  }

  return response.json();
};
