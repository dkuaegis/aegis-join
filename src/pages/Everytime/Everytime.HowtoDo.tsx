import ExternalGuideLink from "../../components/ui/custom/externalGuideLink";

const HowtoDo = () => {
  return (
    <div>

      <p>
        에브리타임 <strong className="text-primary">시간표</strong>에서 
        <strong className="text-primary"> URL로 공유</strong>를 클릭후 제출해주세요!
      </p>
      <ExternalGuideLink href={import.meta.env.VITE_EVERYTIME_GUIDE_URL}>
        시간표 제출 상세 가이드 보기
      </ExternalGuideLink>
    </div>
  );
};

export default HowtoDo;
