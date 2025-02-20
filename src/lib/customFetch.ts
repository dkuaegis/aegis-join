import { toast } from "react-toastify";

const errorToastStyle = {
  theme: "colored",
  style: {
    fontFamily: "Roboto, sans-serif",
  },
  className: "bg-red-300 text-white rounded-lg shadow-lg p-4",
};

const TIMEOUT_MS = 5000;

// promise 를 반환하는 함수. 미들웨어 패턴을 위한 함수라고 생각하면 된다.
async function fetchingWithToast(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      credentials: "include",
      signal: controller.signal,
      ...options,
    });

    if (!response.ok) {
      let errorMessage = "";
      try {
        const data = await response.json();
        errorMessage =
          data.message ||
          "알 수 없는 에러가 발생하였습니다! 다시 시도해 주세요";
      } catch {
        errorMessage = "알 수 없는 에러가 발생하였습니다! 다시 시도해 주세요";
      }

      toast.error(`${response.status} 에러!  ${errorMessage}`, errorToastStyle);
      throw new Error(errorMessage);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        toast.error(
          `요청이 ${TIMEOUT_MS / 1000}초 후에 타임아웃 되었습니다!. `,
          errorToastStyle
        );
        throw new Error("요청 시간 초과");
      }
      throw error;
    }
    throw new Error("알 수 없는 오류 발생");
  } finally {
    clearTimeout(timeoutId);
  }
}

export default fetchingWithToast;
