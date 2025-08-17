import { Copy } from "lucide-react";
import { forwardRef, useState } from "react";
import toast from "react-hot-toast";
import KakaoIcon from "@/assets/kakao-logo.svg";
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
import { Analytics } from "@/service/analytics";

const TriggerButton = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="flex items-center justify-center gap-2" {...props}>
    <img src={KakaoIcon} alt="Kakao Icon" className="h-8 w-8" />
    <span className="font-semibold text-base">카카오톡에서도 공지 받기</span>
  </div>
));
TriggerButton.displayName = "TriggerButton";

const Content = () => {
  const password = import.meta.env.VITE_KAKAO_CHATROOM_PASSWORD;
  const chatroomUrl = import.meta.env.VITE_KAKAO_CHATROOM_URL;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("복사되었습니다.");
      Analytics.trackEvent("Complete_Kakao_Copy_Password_Success", {
        category: "Complete",
      });
    } catch (error) {
      toast.error("복사에 실패했습니다. 브라우저 권한을 확인해주세요.");
      console.error("copy failed:", error);
      Analytics.trackEvent("Complete_Kakao_Copy_Password_Failed", {
        category: "Complete",
        error_message:
          error instanceof Error ? error.message : String(error ?? ""),
      });
    }
  };

  const handleJoin = () => {
    Analytics.trackEvent("Complete_Kakao_Join_Click", { category: "Complete" });
    window.open(chatroomUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-medium text-slate-600 text-sm"
        >
          채팅방 비밀번호
        </label>
        <div className="flex items-center gap-2">
          <input
            id="password"
            type="text"
            value={password}
            readOnly
            className="flex-1 rounded-md border bg-slate-100 px-3 py-2 text-center font-mono text-lg"
          />
          <Button
            variant="icon"
            onClick={handleCopy}
            aria-label="비밀번호 복사"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 2. 참여하기 버튼 */}
      <Button
        size="lg"
        className="w-full bg-[#FEE500] font-bold text-black transition-all hover:bg-[#F7D300] active:scale-95"
        onClick={handleJoin}
      >
        입장하기
      </Button>
    </div>
  );
};

const KakaoChatroom = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (next: boolean) => {
    if (next !== open) {
      Analytics.trackEvent(next ? "Complete_Kakao_Open" : "Complete_Kakao_Close", {
        category: "Complete",
      });
    }
    setOpen(next);
  };

  const title = "카카오톡 공지방 참여 안내";
  const description =
    "아래에서 비밀번호를 복사한 후, '입장하기' 버튼을 눌러 참여해주세요.";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="w-full bg-[#FEE500] text-black transition-all hover:bg-[#F7D300] active:scale-95"
            asChild
          >
            <TriggerButton />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-sm">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className="w-full bg-[#FEE500] text-black transition-all hover:bg-[#F7D300] active:scale-95"
          asChild
        >
          <TriggerButton />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <Content />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default KakaoChatroom;
