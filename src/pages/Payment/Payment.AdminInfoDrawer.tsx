import { Button } from "@/components/ui/button";
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
import { ADMIN_INFO } from "./Payment.Config";

const AdminInfoDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <p className=" text-start text-slate-500 underline">
          입금과정에서 초과납부 등의 문제 발생 시
          <span className="font-extrabold"> 회장/총무에게 문의해주세요.</span>
        </p>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>연락처</DrawerTitle>
          <DrawerDescription>
            전화번호: {ADMIN_INFO.phoneNumber} <br />
            카카오톡: {ADMIN_INFO.kakaoId}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminInfoDrawer;
