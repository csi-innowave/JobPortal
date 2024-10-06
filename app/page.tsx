
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/postgresdb";
import UserInfoForm from "@/components/Onboarding/OnboardingAlert";
import Companies from "@/components/Companies";
import Dialog from "@/components/Onboarding/Dialog";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session?.user) {
    redirect("/auth");
  }
  function onSubmit(){
    console.log('submitted')
  }
  return (
      
         <div className="">hi verified user
       <Dialog/>
      
         </div>
     
  )
}
