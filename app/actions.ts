"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateRole(role: "CANDIDATE" | "RECRUITER") {
  console.log("UpdateRole called with role:", role);

  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User must be authenticated");
    }

    const userId = session.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

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
