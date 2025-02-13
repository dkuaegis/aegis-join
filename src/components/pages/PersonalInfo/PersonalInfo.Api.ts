import type { PersonalInfoFormValues } from "./PersonalInfo.schema";

export const fetchPersonalInfoData =
  async (): Promise<PersonalInfoFormValues> => {
    const response = await fetch("http://localhost:3001/api/member",{
      // credentials: "include",
    });

    if (!response.ok) {
      throw new Error("데이터를 가져오는데 실패");
    }
    return response.json();
  };

export const submitPersonalInfoData = async (data: PersonalInfoFormValues) => {
  const response = await fetch("http://localhost:3001/api/member", {
    // credentials: "include",
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
