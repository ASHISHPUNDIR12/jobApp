import { UserRole } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

async function main() {
  console.log("🚀 Starting the seeding script...");

  // 1. Fetch recruiters
  const recruiters = await prisma.user.findMany({
    where: { role: UserRole.RECRUITER },
  });

  if (recruiters.length === 0) {
    console.log(
      "No recruiters found in the database. Please add recruiters first."
    );
    return;
  }

  // 2. Create a set of jobs for each recruiter
  for (const recruiter of recruiters) {
    console.log(`Creating jobs for recruiter: ${recruiter.name}...`);

    // The createMany command takes an array of data, just like you have here.
    await prisma.job.createMany({
      data: [
        {
          title: "Frontend Developer",
          description: "Work with React and Next.js",
          company: "Google",
          location: "Bangalore",
          postedById: recruiter.id, // Links the job to the current recruiter
          image: "/companies/google.webp",
        },
        {
          title: "Backend Engineer",
          description: "Build scalable APIs with Node.js",
          company: "Amazon",
          location: "Hyderabad",
          postedById: recruiter.id, // Links the job to the current recruiter
          image: "/companies/amazon.webp",
        },
        {
          title: "Full Stack Developer",
          description: "Work with the MERN stack",
          company: "Microsoft",
          location: "Pune",
          postedById: recruiter.id, // Links the job to the current recruiter
          image: "/companies/microsoft.webp",
        },
        {
          title: "DevOps Engineer",
          description: "Manage CI/CD pipelines",
          company: "Netflix",
          location: "Mumbai",
          postedById: recruiter.id, // Links the job to the current recruiter
          image: "/companies/netflix.webp",
        },
        {
          title: "Data Scientist",
          description: "Analyze data and build models",
          company: "Google",
          location: "Bangalore",
          postedById: recruiter.id, // Links the job to the current recruiter
          image: "/companies/google.webp",
        },
      ],
      skipDuplicates: true, // This prevents errors if you run the script multiple times
    });
  }

  console.log("✅ Successfully created jobs for all recruiters.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
