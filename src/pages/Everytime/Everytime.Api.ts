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
    if (response.status)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return true;
  } catch (error) {
    
    return false;
  }
};
