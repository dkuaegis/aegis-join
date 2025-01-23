interface ApiResponse {
  success: boolean;
}

export const postForm = async <T>(
  form: T,
  url: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("POST 요청 실패");
    }

    return { success: true };
  } catch (error) {
    console.error("error:", error);
    return { success: false };
  }
};
