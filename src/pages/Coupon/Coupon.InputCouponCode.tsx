

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coupon } from "./Coupon.Types"
import CouponForm from "./Coupon.CouponForm"

interface InputCouponCodeProps {
    setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
}

export default function InputCouponCode({setCoupons}: InputCouponCodeProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [couponCode, setCouponCode] = useState("")

  console.log("rerender");

  useEffect(() => {
    console.log("wtf");
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // 여기에 쿠폰 등록 로직을 구현하세요
    console.log("Submitted coupon code:", couponCode)
    setOpen(false)
    setCouponCode("")
    }, [couponCode, setOpen, setCouponCode]);


  if (isMobile) {
    return (
    <div className="flex justify-center" >
      <Drawer open={open} onOpenChange={setOpen} modal={false} >
        <DrawerTrigger asChild>
            <Button size="lg" className=" w-10/12 items-center"  variant="outline">쿠폰 등록하기</Button>   
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>쿠폰 등록</DrawerTitle>
            <DrawerDescription>보유하신 쿠폰 코드를 입력해주세요.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <CouponForm couponCode={couponCode} setCouponCode={setCouponCode} handleSubmit={handleSubmit} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    )
  }

  return (
    <div className="flex justify-center" >
    <Dialog open={open} onOpenChange={setOpen}  modal={false}>
      <DialogTrigger asChild >
        <Button size="lg" className=" w-10/12 items-center"  variant="outline">쿠폰 등록하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>쿠폰 등록</DialogTitle>
          <DialogDescription>보유하신 쿠폰 코드를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <CouponForm couponCode={couponCode} setCouponCode={setCouponCode} handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
    </div>
  )
}


