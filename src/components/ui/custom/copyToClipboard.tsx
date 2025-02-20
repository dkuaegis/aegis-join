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
            position: "bottom-center", // 중앙 정렬
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            style: {
              width: "90%",
              marginBottom: "50%",
              fontFamily: "sans-serif",
              textAlign: "center", // 텍스트 중앙 정렬
            },
            className: "rounded-lg shadow-lg p-4",
          });
        })
        .catch(() => {
          toast.error("복사에 실패했습니다.", {
            toastId, // 고유 ID 적용
            transition: fadeInOut,
            position: "bottom-center", // 중앙 정렬
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            style: {
              width: "84%",
              marginBottom: "50%",
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
