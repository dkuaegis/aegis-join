import Lottie from "lottie-react";
import Success from "@/assets/lottie/Success.json";

const DiscordComplete = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <Lottie
        animationData={Success}
        loop={false} // 한 번만 재생
        style={{ width: 300, height: 300 }} // 원하는 크기로 조절
      />
      <h2 className="text-2xl font-semibold tracking-tight">
        연동을 완료했어요
      </h2>
    </div>
  );
};

export default DiscordComplete;
