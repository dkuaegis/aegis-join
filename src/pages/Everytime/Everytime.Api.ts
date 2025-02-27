export const postTimetableData = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/timetables`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (response.status === 409) {
      throw new Error("이미 제출된 시간표입니다.");
    }
    if (!response.ok) {
      throw new Error(`시간표 제출 중 알 수 없는 에러 발생 ${response.status}`);
    }
    return true;
  } catch (error) {
    return false;
  }
};
