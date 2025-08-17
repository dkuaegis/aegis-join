import { lazy, Suspense, useEffect, useRef } from "react";
import Rocket from "@/assets/lottie/Rocket.json";
import DiscordNotice from "./JoinComplete.DiscordNotice";
import KakaoChatroom from "./JoinComplete.KakaoChatroom";
import { Analytics } from "@/service/analytics";
import { usePersonalInfoStore } from "@/stores/personalInfoStore";
import { httpClient } from "@/api/api";
import type { GetMemberResponse } from "@/types/api/member";

const Lottie = lazy(() => import("lottie-react"));

const JoinComplete = () => {
  const studentId = usePersonalInfoStore(
    (s) => s.personalInfoData?.studentId
  );
  const identifiedRef = useRef(false);

  useEffect(() => {
    Analytics.trackEvent("Complete_View", { category: "Complete" });

    if (identifiedRef.current) return;

    const identify = async () => {
      try {
        if (studentId) {
          Analytics.identifyStudent(studentId);
          identifiedRef.current = true;
          return;
        }
        // 스토어에 없으면 백엔드에서 가져와서 식별
        const profile = await httpClient.get<GetMemberResponse>("/member");
        if (profile.student_id) {
          Analytics.identifyStudent(String(profile.student_id), profile.name);
          identifiedRef.current = true;
        }
      } catch (e) {
        // 실패해도 무시
        if (import.meta.env.VITE_ENV === "development") {
          console.warn("identifyStudent on Complete failed:", e);
        }
      }
    };

    void identify();
  }, [studentId]);

  return (
    <Wrapper>
      <Suspense
        fallback={
          <div className="mx-auto" style={{ width: 240, height: 240 }} />
        }
      >
        {/* Lottie 애니메이션 크기를 줄여 세로 공간을 확보합니다. */}
        <Lottie
          animationData={Rocket}
          loop={true}
          style={{ width: 240, height: 240, margin: "0 auto" }}
        />
      </Suspense>
      <p className="mt-4 font-bold text-3xl">등록이 완료됐어요</p>
      <DiscordNotice />
      <KakaoChatroom />
    </Wrapper>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-16 mb-8 w-full max-w-md space-y-4 px-4 py-8 pb-28 text-center">
      {children}
    </div>
  );
};

export default JoinComplete;
