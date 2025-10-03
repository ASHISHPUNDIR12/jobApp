"use client";
import Image from "next/image";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { deletePost } from "@/app/actions";
import { Job } from "@prisma/client";

type JobItemProps = {
  jobData: Job;
  hideSaveButton?: boolean;
  hideDeleteButton?: boolean;
};

export default function JobCard({
  jobData,
  hideSaveButton = false,
  hideDeleteButton = false,
}: JobItemProps) {
  const { data: session } = useSession();
  const role = session?.user.role;

  const deleteThisJobAction = deletePost.bind(null, jobData.id);

  return (
    <Card className="w-80 h-[250px] flex flex-col justify-between shadow-md rounded-2xl">
      {/* Header */}
      <CardHeader className="flex-1">
        {/* Title */}
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {jobData.title}
        </CardTitle>

        {/* Location + Logo in one line */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-600">{jobData.location}</p>
          <div className="relative bg-black border rounded w-16 h-8 flex-shrink-0 flex items-center justify-center">
            <Image
              fill
              className="object-contain p-1"
              src={jobData.image || "/placeholder.png"}
              alt="logo"
            />
          </div>
        </div>

        {/* Description */}
        <CardDescription className="mt-2 line-clamp-3 text-sm truncate">
          {jobData.description}
        </CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="mt-auto flex justify-center">
        {role === "CANDIDATE" && (
          <Link href={`/jobs/${jobData.id}`} className="w-full">
            <Button className="w-full">More details</Button>
          </Link>
        )}
        <div className="flex gap-5 ">
          {role === "RECRUITER" && (
            <Link href={`/postjob/postedjob/${jobData.id}`} className="w-full">
              <Button className="w-40">More details</Button>
            </Link>
          )}
          {!hideDeleteButton && (
            <form action={deleteThisJobAction}>
              <Button variant="destructive">Delete</Button>
            </form>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
