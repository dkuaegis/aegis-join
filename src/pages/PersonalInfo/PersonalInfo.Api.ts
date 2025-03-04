import fetchingWithToast from "@/lib/customFetch";
import type { PersonalInfoFormValues } from "./PersonalInfo.schema";

export const fetchPersonalInfoData =
  async (): Promise<PersonalInfoFormValues> => {
    const response = await fetchingWithToast(
      `${import.meta.env.VITE_API_URL}/members`
    );

    if (!response.ok) {
      throw new Error("인적사항을 가져오는데 실패했습니다.");
    }
    return response.json();
  };

export const submitPersonalInfoData = async (data: PersonalInfoFormValues) => {
  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("인적사항 제출에 실패했습니다.");
  }
};
