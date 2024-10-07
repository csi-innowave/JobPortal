import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import { DialogOnboard } from "@/components/Onboarding/Dialog";
import prisma from "@/lib/postgresdb";
import JobCard from "@/components/JobCard"; 

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user) {
    redirect("/auth");
  }

  const companies = await prisma.company.findMany({ include: { jobs: true } });

  return (
    <div className="container mx-auto p-4">
      <DialogOnboard />
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.flatMap((company) =>
          company.jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              company={company}
            />
          ))
        )}
      </div>
    </div>
  );
}