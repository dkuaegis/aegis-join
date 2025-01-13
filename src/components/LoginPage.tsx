import { Button } from "@/components/ui/button";

function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-[400px] space-y-6 p-4">
        <div className="flex flex-col space-y-2 text-center">
          <img
            src="/aegis-logo.png"
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
        <Button className="w-full" asChild>
          <a
            href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}
          >
            Google로 로그인
          </a>
        </Button>
        <Button className="w-full" asChild>
          <a
            href="https://cms.dankook.ac.kr/web/polymer/-67?p_p_id=Bbs_WAR_bbsportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_cacheability=cacheLevelPage&p_p_col_id=column-2&p_p_col_count=1&_Bbs_WAR_bbsportlet_extFileId=125144"
          >
            단국대 GMAIL 생성 가이드
          </a>
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
