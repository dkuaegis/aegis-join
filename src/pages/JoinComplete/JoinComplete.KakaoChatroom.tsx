import { Button } from "@/components/ui/button";
import { useState } from "react";
import KakaoIcon from "./KakaoIcon"; // 직접 만든 SVG 컴포넌트

type OpenChatStep = "copyCode" | "copied" | "enterOpenChat";

const KakaoChatroom = () => {
  const [openChatStep, setOpenChatStep] = useState<OpenChatStep>("copyCode");
  const password = import.meta.env.VITE_KAKAO_CHATROOM_PASSWORD; // 예시 비밀번호
  const chatroomUrl = import.meta.env.VITE_KAKAO_CHATROOM_URL;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (openChatStep === "copyCode") {
      e.preventDefault();
      navigator.clipboard.writeText(password);
      setOpenChatStep("copied");
      setTimeout(() => setOpenChatStep("enterOpenChat"), 1000);
    }
    // "enterOpenChat" 상태에서는 링크의 기본 동작이 진행됩니다.
  };

  return (
    <div className="break-words pt-8">
      <p className="line-breaks mb-1 text-center text-gray-600 text-sm">
        오픈채팅방에서도 공지를 확인할 수 있습니다.
      </p>
      <Button
        size="lg"
        className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500] hover:text-black active:scale-95 transition-transform duration-100"
        asChild
      >
        <a
          href={chatroomUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center justify-center gap-0"
        >
          <KakaoIcon className="!h-[30px] !w-[30px] h-[30px] w-[30px]" />
          <span className="text-[16px]">
            {openChatStep === "copyCode"
              ? "비밀번호 복사하기"
              : openChatStep === "copied"
              ? "복사되었습니다!"
              : "오픈채팅방 참여하기!!"}
          </span>
        </a>
      </Button>
    </div>
  );
};

export default KakaoChatroom;
