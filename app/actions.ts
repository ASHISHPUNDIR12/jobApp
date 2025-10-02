"use server";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile } from "fs/promises";
import { Education, Status } from "./generated/prisma";

export async function updateRole(role: "CANDIDATE" | "RECRUITER") {
  console.log({ role });
  console.log("UpdateRole called with role:", role);

  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User must be authenticated");
    }

    const userId = session.user.id;

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/");
    revalidatePath("/jobs");
    revalidatePath("/postjob");

    if (role === "CANDIDATE") {
      revalidatePath("/jobs");
      redirect("/jobs");
    } else {
      revalidatePath("/postjob");
      redirect("/postjob");
    }
  } catch (error) {
    console.error("Error while updating the role:", error);
    throw error;
  }
}

// add dynamic companies

export async function addCompanies(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Authentication is must");
  }
  const name = formData.get("name") as string;
  const imageFile = formData.get("imgUrl") as File;

  if ((!name && !imageFile) || imageFile.size === 0) {
    throw new Error("Company name and logo are required.");
  }
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public/uploads", imageFile.name);
  await writeFile(filePath, buffer);

  const dbLogoUrl = `/uploads/${imageFile.name}`;

  try {
    await prisma.company.create({
      data: {
        name: name,
        imageLocalUrl: dbLogoUrl,
        recruiterId: userId,
      },
    });
    revalidatePath("/postjob");
    console.log("company created");
  } catch (err) {
    console.error("error adding company", err);
    throw new Error("failed to create company ");
  }
}

// post a job
export async function postJob(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("authentication is must");
  }
  const title = formData.get("title") as string;
  const description = formData.get("desc") as string;
  const location = formData.get("location") as string;
  const companyId = formData.get("companyId") as string;

  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
    },
  });
  if (!company) {
    throw new Error("Company not found ");
  }

  try {
    await prisma.job.create({
      data: {
        title,
        description,
        location,
        companyName: company?.name,
        image: company?.imageLocalUrl,
        companyId: company?.id,
        postedById: userId,
      },
    });
    revalidatePath("/postjob");
  } catch (err) {
    console.error("error creating post ", err);
  }
}
// applyjob
export async function applyJob(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("You must be signed in to apply.");
  }

  const jobId = formData.get("jobId") as string;
  const yearsOfExperience = Number(formData.get("yearsOfExperience"));
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim());
  const education = formData.get("education") as Education; // ENUM
  const resumeFile = formData.get("resume") as File;

  if (!resumeFile || resumeFile.size === 0) {
    throw new Error("A resume file is required.");
  }
  const bytes = await resumeFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const resumeUrl = path.join("/uploads", `${userId}-${resumeFile.name}`);
  await writeFile(path.join(process.cwd(), "public", resumeUrl), buffer);

  try {
    await prisma.application.create({
      data: {
        yoe: yearsOfExperience,
        skills,
        resumeUrl,
        education,
        userId: userId,
        jobId: jobId,
      },
    });

    revalidatePath(`/jobs/${jobId}`); // Revalidate the job page
  } catch (err) {
    console.error("Error applying for job:", err);
    throw new Error("Failed to submit application.");
  }
}

// delete post

export async function deletePost(id: string) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Athentication must ");
  }
  try {
    await prisma.job.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/posted/postedjob");
  } catch (err) {
    console.error("error deleting todo ", err);
  }
}

// updateStatus

export async function updateStatus(applicationId: string, newStatus: Status) {
  try {
    await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status: newStatus,
      },
    });
  } catch (err) {
    console.error("Failed to update status:", err);
  }
}
