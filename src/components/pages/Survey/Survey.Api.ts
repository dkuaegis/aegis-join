import { SurveyFormValues } from "./Survey.schema";

export const fetchSurveyData = async (): Promise<SurveyFormValues> => {
    const response = await fetch(`/api/survey`);
    
    if(!response.ok) {
      throw new Error("데이터를 가져오는데 실패");
    }
    return response.json();
  };

export const submitSurveyData = async (data: SurveyFormValues) => {
    const response = await fetch(`/api/survey`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        throw new Error("Failed to submit");
    }

    return response.json();
}