import { Button } from "@/components/ui/button";
import KakaoIcon from "./KakaoIcon"; // 직접 만든 SVG 컴포넌트

const KakaoChatroom = () => {
  return (
    <div className="pt-8">
      <p className="line-breaks mb-1 text-center text-gray-600 text-sm">
        오픈채팅방에서도 공지를 확인할 수 있습니다.
      </p>
      <Button
        size="lg"
        className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500] hover:text-black"
        asChild
      >
        <a
          href={import.meta.env.VITE_KAKAO_CHATROOM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-0"
        >
          <KakaoIcon className="!h-[30px] !w-[30px] h-[30px] w-[30px]" />
          <span className="text-[16px] ">오픈채팅방 참여하기</span>
        </a>
      </Button>
    </div>
  );
};

export default KakaoChatroom;
