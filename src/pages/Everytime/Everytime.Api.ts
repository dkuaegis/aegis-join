export const fetchTimetableData = async (): Promise<{ timetableLink: string } | null> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/everytime`,{
      credentials: "include",
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch timetable link:", error);
    return null;
  }
};

export const postTimetableData = async (timetableLink: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/everytime`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timetableLink }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error("Failed to post timetable link:", error);
    return false;
  }
};
