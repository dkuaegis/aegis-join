import ExternalGuideLink from "../../components/ui/custom/externalGuideLink";

const HowtoDo = () => {
  return (
    <div>
      <p>
        디스코드 서버에 가입하신 후,{" "}
        <strong className="text-primary">'인증'</strong> 채널에서
        <code className="mx-1 rounded bg-gray-200 px-2 py-1">/join</code>{" "}
        명령어와 함께 코드를 입력해 주세요.
      </p>
      <ExternalGuideLink href={import.meta.env.VITE_DISCORD_GUIDE_URL}>
        디스코드 연동 상세 가이드 보기
      </ExternalGuideLink>
    </div>
  );
};

export default HowtoDo;
