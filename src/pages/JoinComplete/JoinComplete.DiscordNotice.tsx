import DiscordLinkButton from "@/components/ui/custom/discord-link-button";

const DiscordNotice = () => {
  return (
    <div className="break-words pt-8">
      <p className="line-breaks mb-1 text-center text-lg">
        앞으로의 모든 활동과 소통은 <strong>디스코드</strong>에서 이루어집니다.
        Aegis와 함께 성장해 나가요!
      </p>
      <DiscordLinkButton
        text="디스코드 공지방"
        url={import.meta.env.VITE_DISCORD_NOTICE_URL}
      />
    </div>
  );
};

export default DiscordNotice;
