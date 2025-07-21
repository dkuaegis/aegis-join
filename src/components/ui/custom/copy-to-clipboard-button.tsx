import type React from "react";

const CopyIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>복사 아이콘</title>
    <path
      d="M9.75 8.125H11.375V2.4375C11.375 2.02375 11.0387 1.625 10.6562 1.625H4.875V3.25M3.25 4.0625H8.125C8.53875 4.0625 8.9375 4.46125 8.9375 4.875V10.6562C8.9375 11.07 8.53875 11.4688 8.125 11.4688H2.4375C2.02375 11.4688 1.625 11.07 1.625 10.6562V4.875C1.625 4.46125 2.02375 4.0625 2.4375 4.0625H3.25Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface CopyToClipboardButtonProps {
  textToCopy: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  textToCopy,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="flex items-center gap-1 text-slate-500 underline"
    >
      <CopyIcon />
      <span>복사하기</span>
    </button>
  );
};

export default CopyToClipboardButton;
