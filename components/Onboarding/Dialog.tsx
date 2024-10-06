'use client'
import UserInfoForm from "@/components/Onboarding/OnboardingAlert";
import Companies from "@/components/Companies";

export default function Dialog() {
    function onSubmit(){
        console.log('submitted')
      }
  return (
    <div className="w-full max-w-sm mx-auto">
       <UserInfoForm resumeLinkComponent={Companies} onSubmit={onSubmit}/>
    </div>
  )
}
