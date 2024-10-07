'use client'
import useUserStore from "@/store/UserStore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import UserInfoForm from "./OnboardingAlert"
export function DialogOnboard() {
    const {user}=useUserStore()
  return (
    <Dialog open={!user?.isVerified}>
      
      <DialogContent className="sm:max-w-[425px] h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserInfoForm/>
        
      </DialogContent>
    </Dialog>
  )
}
