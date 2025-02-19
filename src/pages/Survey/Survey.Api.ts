import fetchingWithToast from "@/lib/customFetch";
import type { SurveyFormValues } from "./Survey.schema";

export const fetchSurveyData = async (): Promise<SurveyFormValues> => {
  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/survey`,
    {}
  );

  return response.json();
};

export const submitSurveyData = async (data: SurveyFormValues) => {
  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/survey`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit");
  }

  return response.json();
};
