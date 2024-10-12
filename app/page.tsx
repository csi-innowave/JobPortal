import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import { DialogOnboard } from "@/components/Onboarding/Dialog";
import prisma from "@/lib/postgresdb";
import JobCard from "@/components/JobCard"; 
import Logout from "@/components/Logout";
import UserButton from "@/components/UserButton";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user) {
    redirect("/auth");
  }


const companiesl = await prisma.company.findMany({ include: { jobs: true } });
  return (
    <div className="container mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <DialogOnboard />
      <UserButton/>
      <div className=" w-full max-w-screen-2xl ">
       <JobCard companies={companiesl}/>
      </div>
    </div>
  );
}