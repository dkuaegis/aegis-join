import ExternalGuideLink from "../../components/ui/custom/externalGuideLink";

const HowtoDo = () => {
  return (
    <div>
      <p>
        <strong className="text-primary">송금자명</strong>을 위처럼 변경하여
        송금해주세요 !
      </p>
      <ExternalGuideLink href={import.meta.env.VITE_PAYMENT_GUIDE_URL}>
        납부 상세 가이드 보기
      </ExternalGuideLink>
    </div>
  );
};

export default HowtoDo;
