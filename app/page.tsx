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

  // const companies = [
  //   "Google",
  //   "Microsoft",
  //   "Amazon",
  //   "Facebook",
  //   "Apple"
  // ];
  
  // const branches = [
  //   "Computer Science Engineering",
  //   "Electrical & Electronics Engineering",
  //   "Mechanical and Automation Engineering",
  //   "Electrical & Communications Engineering",
  //   "Computer Science & Technology",
  //   "Information Technology",
  //   "Information Technology & Engineering",
  //   "Artificial Intelligence & Data Science",
  //   "Artificial Intelligence & Machine Learning"
  // ];
  
  // // Skills for jobs (tags)
  // const skills = [
  //   "Frontend Development", "Backend Development", "Python", 
  //   "Machine Learning", "Artificial Intelligence", 
  //   "Data Science", "Cloud Computing", "DevOps", "React.js", 
  //   "Node.js", "Django", "Flask"
  // ];

  // function getRandomItems(array, count) {
  //   let shuffled = array.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, count);
  // }
  
  // // Generate companies and jobs and insert them into the database
  // async function createCompaniesAndJobs() {
  //   for (let i = 1; i < companies.length; i++) {
  //     // Create a company
  //     const company = await prisma.company.create({
  //       data: {
  //         name: companies[i]
  //       }
  //     });
  
  //     // Create 5-7 jobs for each company
  //     const jobCount = Math.floor(Math.random() * 3) + 5; // Random number between 5 and 7
  //     for (let j = 1; j <= jobCount; j++) {
  //       await prisma.job.create({
  //         data: {
  //           name: getRandomItems(skills, 1)[0] + " Engineer",
  //           jd: `This is a job description for ${getRandomItems(skills, 1)[0]} Engineer at Company ${i}.`,
  //           jdLink: `https://company${i}.com/job/${j}`,
  //           companyId: company.id, // Reference to the created company
  //           Tags: getRandomItems(skills, 3), // Pick 3 random skills for tags
  //           branchesAllowed: getRandomItems(branches, Math.floor(Math.random() * branches.length) + 1), // Random branches allowed
  //         }
  //       });
  //     }
  //   }
  
  //   console.log('Companies and jobs created successfully');
  // }
// await createCompaniesAndJobs()  
const companiesl = await prisma.company.findMany({ include: { jobs: true } });
  return (
    <div className="container mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <DialogOnboard />
      <UserButton/>
      <div className="grid gap-4 w-full max-w-screen-lg mx-auto">
       <JobCard companies={companiesl}/>
      </div>
    </div>
  );
}