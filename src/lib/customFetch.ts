import { cssTransition, toast } from "react-toastify";

const fadeInOut = cssTransition({
  enter: "fade-in",
  exit: "fade-out",
});

const errorToastStyle = {
  theme: "colored",
  className: "rounded-lg shadow-lg p-4 bg-red-300 text-white",
};

const TIMEOUT_MS = 5000;
const TOAST_ID = "fetch-error-toast";

// promise 를 반환하는 함수. 미들웨어 패턴을 위한 함수라고 생각하면 된다.
async function fetchingWithToast(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      //credentials: "include",
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

      if (!toast.isActive(TOAST_ID)) {
        toast.error(`${response.status} 에러!  ${errorMessage}`, {
          ...errorToastStyle,
          toastId: TOAST_ID,
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          position: "bottom-center",
          transition: fadeInOut,
          style: {
            marginBottom: "50%",
            width: "90%",
            fontFamily: "sans-serif",
            textAlign: "center",
          },
        });
      }
      throw new Error(errorMessage);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        if (!toast.isActive(TOAST_ID)) {
          toast.error(
            `요청이 ${TIMEOUT_MS / 1000}초 후에 타임아웃 되었습니다!. `,
            {
              ...errorToastStyle,
              toastId: TOAST_ID,
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              position: "bottom-center",
              transition: fadeInOut,
              style: {
                marginBottom: "50%",
                width: "84%",
                fontFamily: "sans-serif",
                textAlign: "center",
              },
            }
          );
        }
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
