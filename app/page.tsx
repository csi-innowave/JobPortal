
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import { DialogOnboard } from "@/components/Onboarding/Dialog";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session?.user) {
    redirect("/auth");
  }

  return (
      
         <div className="">hi verified user
       <DialogOnboard/>
      
         </div>
     
  )
}
