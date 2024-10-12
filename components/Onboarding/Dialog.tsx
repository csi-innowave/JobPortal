"use client";
import useUserStore from "@/store/UserStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import UserInfoForm from "./OnboardingAlert";
import { Edit } from "lucide-react";
import { useState,useEffect } from "react";
export function DialogOnboard() {
  const [isOpen,setIsOpen]=useState(false)
  const { user } = useUserStore();
 useEffect(()=>{
  setIsOpen(!user?.isVerified)
 },[])
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here before applying.
          </DialogDescription>
        </DialogHeader>
       <section className="grid grid-flow-col">
       <Button className="w-fit gap-2 flex items-center ">
          <p>Complete Form</p>
          <Edit size={17} />
        </Button>
        {/* <UserInfoForm/> */}
        <Button variant='secondary' onClick={()=>{setIsOpen(false)}}>Skip now</Button>
       </section>
      </DialogContent>
    </Dialog>
  );
}
