import { type ToastOptions, cssTransition } from "react-toastify";

const fadeInOut = cssTransition({
  enter: "fade-in",
  exit: "fade-out",
});

export const defaultToastId = "defaultToastId";

export const defaultToastOptions: ToastOptions = {
  toastId: "defaultToastId",
  transition: fadeInOut,
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: "colored",
  style: {
    marginBottom: "50%",
    fontFamily: "SUIT",
    textAlign: "center",
  },
  className: "rounded-lg shadow-lg p-4 w-11/12 sm:w-full line-breaks", // 모바일에서는 84%, PC에서는 100%
};
