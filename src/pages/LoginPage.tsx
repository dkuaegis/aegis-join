import { Button } from "@/components/ui/button";
import { useExternalBrowser } from "@/hooks/useExternalBrowser";
import { Analytics } from "@/service/analytics";
import BrowserRedirectPage from "./BrowserRedirectPage";
import { Label } from "@/components/ui/label";
import { ExternalLinkIcon } from "lucide-react";

const LoginPage = () => {
  const { isKakaoInApp } = useExternalBrowser();

  if (isKakaoInApp) {
    return <BrowserRedirectPage />;
  }

  return (
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
          <a
            href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}
          >
            Google로 로그인
          </a>
        </Button>
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
          <a href="https://dkuaegis.org/" target="_blank" rel="noopener noreferrer">
            Aegis 홈페이지
          </a>
        </Button>
      </div>
    <div className="flex flex-col text-center">
      <a
        href="https://sites.google.com/dankook.ac.kr/help"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground text-sm font-extrabold underline inline-flex items-center justify-center gap-1"
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
  );
};

export default LoginPage;
