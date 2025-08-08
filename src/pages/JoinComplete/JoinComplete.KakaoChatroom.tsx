import { forwardRef, useState } from "react";
import KakaoIcon from "@/assets/kakao-logo.svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Check, Copy, Info } from "lucide-react";
import React from "react";

const TriggerButton = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="flex items-center justify-center gap-2" {...props}>
    <img src={KakaoIcon} alt="Kakao Icon" className="w-8 h-8" />
    <span className="text-base font-semibold">카카오톡에서도 공지 받기</span>
  </div>
));
TriggerButton.displayName = "TriggerButton";

const Content = () => {
  const [copied, setCopied] = useState(false);

  const password = import.meta.env.VITE_KAKAO_CHATROOM_PASSWORD;
  const chatroomUrl = import.meta.env.VITE_KAKAO_CHATROOM_URL;

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);

      setTimeout(() => setCopied(false), 2000); // 2초 후 아이콘 원래대로
    });
  };

  const handleJoin = () => {
    window.open(chatroomUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-600">
          채팅방 비밀번호
        </label>
        <div className="flex items-center gap-2">
          <input
            id="password"
            type="text"
            value={password}
            readOnly
            className="flex-1 px-3 py-2 text-center bg-slate-100 border rounded-md text-lg font-mono"
          />
          <Button
            variant="icon"
            onClick={handleCopy}
            aria-label="비밀번호 복사"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* 2. 참여하기 버튼 */}
      <Button
        size="lg"
        className="w-full bg-[#FEE500] text-black font-bold transition-all hover:bg-[#F7D300] active:scale-95"
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

  const title = "카카오톡 공지방 참여 안내";
  const description =
    "아래에서 비밀번호를 복사한 후, '입장하기' 버튼을 눌러 참여해주세요.";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full bg-[#FEE500] text-black transition-all hover:bg-[#F7D300] active:scale-95" asChild>
            <TriggerButton />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm p-0">
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="w-full bg-[#FEE500] text-black transition-all hover:bg-[#F7D300] active:scale-95" asChild>
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