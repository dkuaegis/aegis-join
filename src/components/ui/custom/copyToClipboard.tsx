import { useCallback } from "react";
import { toast, cssTransition } from "react-toastify";

const fadeInOut = cssTransition({
  enter: "fade-in",
  exit: "fade-out",
});

type CopyType = "account" | "sender" | "discord";

interface UseCopyToClipboard {
  copyToClipboard: (text: string, type: CopyType) => void;
}

function useCopyToClipboard(): UseCopyToClipboard {
  const copyToClipboard = useCallback((text: string) => {
    const toastId = "copy-toast"; // 고유한 ID 설정

    if (!toast.isActive(toastId)) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("클립보드에 복사했습니다!", {
            toastId, // 고유 ID 적용
            transition: fadeInOut,
            position: "bottom-right",
            autoClose: 600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            style: {
              width: "84%",
              marginBottom: "50%",
              marginRight: "8%",
              fontFamily: "Roboto, sans-serif",
            },
            className: "rounded-lg shadow-lg p-4",
          });
        })
        .catch(() => {
          toast.error("복사에 실패했습니다.", {
            toastId,
            transition: fadeInOut,
            position: "bottom-right",
            autoClose: 600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            style: {
              width: "84%",
              marginBottom: "50%",
              marginRight: "8%",
              fontFamily: "Roboto, sans-serif",
            },
            className: "rounded-lg shadow-lg p-4",
          });
        });
    }
  }, []);

  return { copyToClipboard };
}

export default useCopyToClipboard;
