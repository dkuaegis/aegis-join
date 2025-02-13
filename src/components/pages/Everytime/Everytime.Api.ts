export const fetchTimetableData = async (): Promise<{ timetableLink: string } | null> => {
  try {
    const response = await fetch("http://localhost:3001/api/everytime");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch timetable link:", error);
    return null;
  }
};

export const postTimetableData = async (timetableLink: string): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3001/api/everytime", {
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
