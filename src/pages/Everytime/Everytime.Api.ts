import fetchingWithToast from "@/lib/customFetch";

export const fetchTimetableData = async (): Promise<{ url: string } | null> => {
  try {
    const response = await fetchingWithToast(
      `${import.meta.env.VITE_API_URL}/timetables`
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch timetable link:", error);
    return null;
  }
};

export const postTimetableData = async (url: string): Promise<boolean> => {
  try {
    const response = await fetchingWithToast(
      `${import.meta.env.VITE_API_URL}/timetables`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error("Failed to post timetable link:", error);
    return false;
  }
};
