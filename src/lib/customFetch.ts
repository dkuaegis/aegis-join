import { toast } from "react-toastify";
import {
  defaultToastId,
  defaultToastOptions,
} from "@/toast/defaultToastOption";

const TIMEOUT_MS = 5000;
const TOAST_ID = defaultToastId;

const showErrorToast = (message: string) => {
  if (!toast.isActive(TOAST_ID)) {
    toast.error(message, defaultToastOptions);
  }
};

const errorHandlingWithToast = async (response: Response): Promise<never> => {
  let errorMessage = `${response.status} 에러! 알 수 없는 에러가 발생하였습니다. 다시 시도해 주세요`;

  try {
    const errorData = await response.json();
    if (errorData?.name) {
      errorMessage = `${response.status} 에러! ${errorData.name}`;
    }
  } catch {
    errorMessage = `${response.status} 에러! 에러 메시지를 파싱하는데 문제가 발생하였습니다.`;
  }

  throw new Error(errorMessage);
};

// promise 를 반환하는 함수. 미들웨어 패턴을 위한 함수라고 생각하면 된다.
const fetchingWithToast = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      credentials: "include",
      signal: controller.signal,
      ...options,
    });

    if (!response.ok) {
      // 404 Not Found 는 통과.
      if (response.status === 404) {
        return response;
      }
      await errorHandlingWithToast(response);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        if (!toast.isActive(TOAST_ID)) {
          showErrorToast(
            `요청이 ${TIMEOUT_MS / 1000}초 후에 타임아웃 되었습니다!. `
          );
        }
        throw new Error("요청 시간 초과");
      }
      showErrorToast(error.message);
      throw error;
    }
    showErrorToast("알 수 없는 에러 발생");
    throw new Error("알 수 없는 에러 발생");
  } finally {
    clearTimeout(timeoutId);
  }
};

export default fetchingWithToast;
