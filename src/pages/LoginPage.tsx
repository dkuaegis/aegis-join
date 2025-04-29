import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function LoginPage() {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">가입이 일시적으로 불가합니다</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>가입이 일시적으로 불가합니다</DialogTitle>
              <DialogDescription>
                기업은행의 전산시스템 이전작업으로 5.3일(토) 00시~5.5일(월)
                24시까지 금융거래가 일시 중단되어 동아리 가입이 불가합니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className="w-full" asChild>
                <a href="https://www.ibk.co.kr/cyber/newibkDetailCyber.ibk?pageId=IR04010200&srno=316118">
                  기업은행 공지사항 확인하기
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/*<Button className="w-full">
          <a
            href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}
          >
            Google로 로그인
          </a>
        </Button>*/}
        <Button className="w-full" asChild>
          <a href="https://sites.google.com/dankook.ac.kr/help">
            단국대 Gmail 생성 가이드
          </a>
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
