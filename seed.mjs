import prisma from "./lib/postgresdb";

// Import the Prisma client


// Branches allowed
const branches = [
  "Computer Science Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical and Automation Engineering",
  "Electrical & Communications Engineering",
  "Computer Science & Technology",
  "Information Technology",
  "Information Technology & Engineering",
  "Artificial Intelligence & Data Science",
  "Artificial Intelligence & Machine Learning"
];

// Skills for jobs (tags)
const skills = [
  "Frontend Development", "Backend Development", "Python", 
  "Machine Learning", "Artificial Intelligence", 
  "Data Science", "Cloud Computing", "DevOps", "React.js", 
  "Node.js", "Django", "Flask"
];

// Helper function to get random items from an array
function getRandomItems(array, count) {
  let shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate companies and jobs and insert them into the database
async function createCompaniesAndJobs() {
  for (let i = 1; i <= 5; i++) {
    // Create a company
    const company = await prisma.company.create({
      data: {
        name: `Company ${i}`
      }
    });

    // Create 5-7 jobs for each company
    const jobCount = Math.floor(Math.random() * 3) + 5; // Random number between 5 and 7
    for (let j = 1; j <= jobCount; j++) {
      await prisma.job.create({
        data: {
          name: getRandomItems(skills, 1)[0] + " Engineer",
          jd: `This is a job description for ${getRandomItems(skills, 1)[0]} Engineer at Company ${i}.`,
          jdLink: `https://company${i}.com/job/${j}`,
          companyId: company.id, // Reference to the created company
          Tags: getRandomItems(skills, 3), // Pick 3 random skills for tags
          branchesAllowed: getRandomItems(branches, Math.floor(Math.random() * branches.length) + 1), // Random branches allowed
        }
      });
    }
  }

  console.log('Companies and jobs created successfully');
}

// Execute the function
await createCompaniesAndJobs()
  