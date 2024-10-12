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

  const variables = [
    "background", "foreground", "card", "card-foreground", "popover", 
    "popover-foreground", "primary", "primary-foreground", "secondary", 
    "secondary-foreground", "muted", "muted-foreground", "accent", 
    "accent-foreground", "destructive", "destructive-foreground", "border", 
    "input", "ring", "radius", "chart-1", "chart-2", "chart-3", "chart-4", "chart-5"
  ];
const companiesl = await prisma.company.findMany({ include: { jobs: true } });
  return (
    <div className="container mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <DialogOnboard />
      <UserButton/>
      <div className=" w-full max-w-screen-2xl ">
       <JobCard companies={companiesl}/>
       {/* <div className="p-8 bg-background text-foreground flex flex-wrap gap-4">
      {variables.map((variable) => (
        <div key={variable} className="flex flex-col items-center">
          <span 
            className={`w-20 h-20 rounded-md`}
            style={{ backgroundColor: `hsl(var(--${variable}))` }}
          ></span>
          <span className="mt-2 text-xs text-center">{`--${variable}`}</span>
        </div>
      ))}
    </div> */}
      </div>
    </div>
  );
}