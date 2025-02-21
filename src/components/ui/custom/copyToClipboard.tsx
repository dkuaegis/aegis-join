import { useCallback } from "react";
import { cssTransition, toast } from "react-toastify";

const fadeInOut = cssTransition({
  enter: "fade-in",
  exit: "fade-out",
});

interface UseCopyToClipboard {
  copyToClipboard: (text: string) => void;
}

function useCopyToClipboard(): UseCopyToClipboard {
  const copyToClipboard = useCallback((text: string) => {
    const toastId = "copy-toast"; // 고유한 ID 설정

    if (!toast.isActive(toastId)) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("클립보드에 복사되었습니다!", {
            toastId, // 고유 ID 적용
            transition: fadeInOut,
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            style: {
              marginBottom: "50%",
              fontFamily: "sans-serif",
              textAlign: "center",
            },
            className: "rounded-lg shadow-lg p-4 w-11/12 sm:w-full", // 모바일에서는 84%, PC에서는 100%
          });
        })
        .catch(() => {
          toast.error("복사에 실패했습니다.", {
            toastId, // 고유 ID 적용
            transition: fadeInOut,
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            style: {
              width: "90%",
              maxWidth: "400px", // 최대 너비 설정
              margin: "0 auto 10vh", // 상하 여백 조정
              fontFamily: "sans-serif",
              textAlign: "center",
            },
            className: "rounded-lg shadow-lg p-4",
          });
        });
    }
  }, []);

  return { copyToClipboard };
}

export default useCopyToClipboard;

