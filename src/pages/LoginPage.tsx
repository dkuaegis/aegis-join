import { ExternalLinkIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExternalBrowser } from "@/hooks/useExternalBrowser";
import { Analytics } from "@/service/analytics";
import BrowserRedirectPage from "./BrowserRedirectPage";

const GOOGLE_LOGIN_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
const AEGIS_HOMEPAGE_URL = "https://dkuaegis.org/";
const GMAIL_GUIDE_URL = "https://sites.google.com/dankook.ac.kr/help";

// IBK 기업은행 점검 시간 체크 함수
const isMaintenanceTime = (): boolean => {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-based이므로 +1
  const date = now.getDate();
  const hours = now.getHours();

  // 3월 1일 0시~12시 (0시부터 11시 59분까지)
  return month === 3 && date === 1 && hours >= 0 && hours < 12;
};

const LoginPage = () => {
  const { isKakaoInApp } = useExternalBrowser();
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    const maintenance = isMaintenanceTime();
    setIsMaintenance(maintenance);
    if (maintenance) {
      setShowMaintenanceModal(true);
    }
  }, []);

  if (isKakaoInApp) {
    return <BrowserRedirectPage />;
  }

  return (
    <>
      <Dialog
        open={showMaintenanceModal}
        onOpenChange={setShowMaintenanceModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>시스템 점검 안내</DialogTitle>
            <DialogDescription className="pt-4 text-base">
              IBK 기업은행 시스템 점검으로 인해
              <br />
              <strong className="text-foreground">3월 1일 0시 ~ 12시</strong>
              까지
              <br />
              회원 가입이 불가능합니다.
              <br />
              <br />
              점검 종료 후 이용해주시기 바랍니다.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="line-breaks flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="w-full max-w-[400px] space-y-6 p-4">
          <div className="flex flex-col space-y-2 text-center">
            <img
              src="/aegis-logo.webp"
              alt="Aegis Logo"
              className="mx-auto mb-4 h-32 w-32"
            />
            <h1 className="font-semibold text-2xl tracking-tight">
              Aegis 회원 가입
            </h1>
            <p className="text-muted-foreground text-sm">
              단국대학교 구글 계정으로 로그인해주세요
            </p>
          </div>
          {!isMaintenance && (
            <Button
              onClick={() => {
                Analytics.safeTrack("Google_Login_Click", {
                  category: "Auth",
                  method: "Google",
                });
              }}
              className="w-full"
              asChild
            >
              <a href={GOOGLE_LOGIN_URL}>Google로 로그인</a>
            </Button>
          )}
          <Button
            onClick={() => {
              Analytics.safeTrack("Go_Homepage_Click", {
                category: "Auth",
                method: "Email",
              });
            }}
            className="w-full"
            asChild
          >
            <a
              href={AEGIS_HOMEPAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Aegis 홈페이지
            </a>
          </Button>
        </div>
        <div className="flex flex-col text-center">
          <a
            href={GMAIL_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 font-extrabold text-muted-foreground text-sm underline"
            onClick={() => {
              Analytics.safeTrack("Gmail_Guide_Click", {
                category: "Link",
                method: "Guide",
              });
            }}
          >
            단국대 Gmail 생성 가이드
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
