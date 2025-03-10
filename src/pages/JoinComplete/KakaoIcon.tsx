import type React from "react";

interface KakaoIconProps {
  className?: string;
}

const KakaoIcon: React.FC<KakaoIconProps> = ({ className = "" }) => (
  <svg
    className={className}
    width="30"
    height="30"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="kakao-icon-title"
  >
    <title id="kakao-icon-title">카카오톡 아이콘</title>
    <rect width="48" height="48" fill="var(--kakao-bg, #FEE500)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12C16.268 12 10 16.9249 10 23C10 26.8381 12.508 30.2103 16.2381 32.1796L14.7605 37.5663C14.6852 37.8485 14.9975 38.0687 15.2445 37.9049L21.5973 33.8505C22.3805 33.9492 23.1801 34 24 34C31.732 34 38 29.0751 38 23C38 16.9249 31.732 12 24 12Z"
      fill="var(--kakao-icon, #000000)"
    />
  </svg>
);

export default KakaoIcon;
