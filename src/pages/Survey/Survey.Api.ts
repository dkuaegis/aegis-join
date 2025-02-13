import type { SurveyFormValues } from "./Survey.schema";



const errorHandler: Record<number, () => void> = {
  401: () => {
    alert("로그인을 진행해주세요.");

  },
  403: () => {
    alert("접근 권한이 없습니다.");
  },
  404: () => {
    alert("페이지가 존재하지 않습니다.");
  }
}

export const fetchSurveyData = async (): Promise<SurveyFormValues> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/survey`, {
    credentials: "include",
  });

  if (!response.ok) {
    const handler = errorHandler[response.status] || (() => { throw new Error("예상치 못한 에러 발생"); });
    handler();
    throw new Error("fetchSurveyData Error");
  }
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
