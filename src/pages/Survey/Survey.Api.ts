import fetchingWithToast from "@/lib/customFetch";
import type { SurveyFormValues } from "./Survey.schema";
import type { InterestField } from "@/types/api/survey";

export const fetchSurveyData = async (): Promise<SurveyFormValues> => {
  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/survey`
  );

  return response.json();
};

export const submitSurveyData = async (data: SurveyFormValues) => {
  const transformedData = transformSurveyData(data);
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
    throw new Error("Failed to submit");
  }
};

function transformSurveyData(data: SurveyFormValues) {
  const filteredInterestsEtc = Object.keys(data.interestsEtc).reduce(
    (acc,key) => {
      const fieldKey = key as InterestField;
      if (data.interests.includes(fieldKey)) {
        acc[fieldKey] = data.interestsEtc[fieldKey];
      }
      return acc
    },
    {} as Record<InterestField, string | undefined>
  );
  return {
    ...data,
    interestsEtc: filteredInterestsEtc,
  };
}
