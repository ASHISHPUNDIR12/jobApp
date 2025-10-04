"use client";
import Image from "next/image";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { deletePost } from "@/app/actions";
import { Job } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type JobItemProps = {
  jobData: Job;
  hideSaveButton?: boolean;
  hideDeleteButton?: boolean;
};

export default function JobCard({
  jobData,
  hideDeleteButton = false,
}: JobItemProps) {
  const { data: session } = useSession();
  const role = session?.user.role;
    const [loading, setLoading] = useState(false);
      const router = useRouter();



  const deleteThisJobAction = deletePost.bind(null, jobData.id);

   const handleNavigate = (url: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(url);
    }, 1000); 
  };

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
          <Button
            className="w-full"
            onClick={() => handleNavigate(`/jobs/${jobData.id}`)}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "More details"}
          </Button>
        )}
        <div className="flex gap-5 ">
            {role === "RECRUITER" && (
          <Button
            className="w-40"
            onClick={() => handleNavigate(`/postjob/postedjob/${jobData.id}`)}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "More details"}
          </Button>
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
