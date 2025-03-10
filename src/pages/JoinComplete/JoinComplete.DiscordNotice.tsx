import DiscordIcon from "@/assets/discordIcon.svg";
import { Button } from "@/components/ui/button";

const DiscordNotice = () => {
  return (
    <div className="pt-8 break-words">
      <p className="mb-1 text-lg text-center line-breaks">
        앞으로의 모든 활동과 소통은 <strong>디스코드</strong>에서 이루어집니다.
        Aegis와 함께 성장해 나가요!
      </p>
      <Button
        size="lg"
        className="w-full bg-discord-blue text-white hover:bg-discord-blue"
        asChild
      >
        <a
          href={import.meta.env.VITE_DISCORD_NOTICE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1"
        >
          <img
            src={DiscordIcon}
            alt="Discord Icon"
            className="h-[24px] w-[24px]"
          />
          <span className="text-[16px]">
            디스코드 공지방 확인하기
          </span>
        </a>
      </Button>
    </div>
  );
};

export default DiscordNotice;
