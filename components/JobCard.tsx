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
    <Card className="h-full min-h-[270px] flex flex-col justify-between rounded-2xl border-slate-200/80 bg-white/90 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/10">
      {/* Header */}
      <CardHeader className="flex-1">
        {/* Title */}
        <CardTitle className="text-lg font-bold leading-6 line-clamp-2 text-slate-950">
          {jobData.title}
        </CardTitle>

        {/* Location + Logo in one line */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-slate-500">{jobData.location}</p>
          <div className="relative flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-lg border bg-slate-950">
            <Image
              fill
              className="object-contain p-1"
              src={jobData.image || "/placeholder.png"}
              alt="logo"
            />
          </div>
        </div>

        {/* Description */}
        <CardDescription className="mt-4 line-clamp-3 text-sm leading-6">
          {jobData.description}
        </CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="mt-auto flex justify-center border-t border-slate-100 pt-5">
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
