import {prisma} from "@/lib/prisma";

async function main() {
  console.log("🚀 Starting the seeding script...");


  
 await prisma.company.createMany({
  data: [
    { name: 'Amazon', imageLocalUrl: '/companies/amazon.svg'  },
    { name: 'Atlassian', imageLocalUrl: '/companies/atlassian.svg' },
    { name: 'Google', imageLocalUrl: '/companies/google.webp' },
    { name: 'IBM', imageLocalUrl: '/companies/ibm.svg' },
    { name: 'Meta', imageLocalUrl: '/companies/meta.svg' },
    { name: 'Microsoft', imageLocalUrl: '/companies/microsoft.webp' },
    { name: 'Netflix', imageLocalUrl: '/companies/netflix.png' },
    { name: 'Uber', imageLocalUrl: '/companies/uber.svg' },
  ],
  skipDuplicates: true, // Prevents errors if you run the seed multiple times
});

  console.log("✅ Successfully created companies  for all recruiters.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
