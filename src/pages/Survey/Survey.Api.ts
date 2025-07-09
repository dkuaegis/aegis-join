import fetchingWithToast from "@/lib/customFetch";
import type { SurveyFormValues } from "./Survey.schema";

export const fetchSurveyData = async (): Promise<SurveyFormValues> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/survey`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("설문조사를 가져오는데 실패했습니다.");
  }

  return response.json();
};

export const submitSurveyData = async (data: SurveyFormValues) => {
  const transformedData = data;
  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/survey`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    }
  );

  if (!response.ok) {
    throw new Error("설문조사 제출에 실패했습니다.");
  }
};
