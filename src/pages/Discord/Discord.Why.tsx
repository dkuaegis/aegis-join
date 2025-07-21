import { Separator } from "@radix-ui/react-select";
import { Info } from "lucide-react"; // 시각적 효과를 위한 아이콘
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

// 컴포넌트의 메인 함수
export function DiscordWhy() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const title = "디스코드 연동 안내";
  const description =
    "동아리 활동을 하기 위해 디스코드 계정 연동이 필요합니다.";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-1">
            <Info className="h-4 w-4" />
            디스코드 연동이 왜 필요한가요?
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DiscordInfoContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full gap-1">
          <Info className="h-4 w-4" />
          디스코드 연동이 왜 필요한가요?
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DiscordInfoContent className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">확인</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// 디스코드 연동이 필요한 이유를 설명하는 콘텐츠 부분
function DiscordInfoContent({ className }: { className?: string }) {
  return (
    <div className={cn("text-sm", className)}>
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold">📄 디스코드를 사용하는 이유</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1">✓</span>
              <span>
                <strong>초대 및 역할 자동화:</strong> 웹사이트 가입 시, 동아리
                전용 서버로 자동으로 초대하고 활동에 맞는 역할을 부여하여 관리
                효율을 높입니다.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">✓</span>
              <span>
                <strong>효율적인 코드 공유:</strong> 코드 블록, 스니펫, 파일
                공유 기능이 뛰어나 개발 관련 논의와 코드 리뷰를 진행하기에
                최적의 환경을 제공합니다.
              </span>
            </li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 font-semibold">🔗 연동 방법</h3>
          <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
            <li>제공되는 인증 코드를 확인하고 '복사' 버튼을 누릅니다.</li>
            <li>
              'Aegis discord' 버튼을 눌러 동아리 서버의 인증 채널로 이동합니다.
            </li>
            <li>
              채팅창에 `/인증` 명령어를 입력하고, 복사한 코드를 붙여넣어
              전송합니다.
            </li>
            <li>자동으로 역할이 부여되며 연동이 완료됩니다.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
