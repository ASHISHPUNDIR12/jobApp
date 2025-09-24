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
import { Job } from "@/app/generated/prisma";
import { useSession } from "next-auth/react";
import { deletePost } from "@/app/actions";

// type Job = {
//   id: String;
//   title: String;
//   description: String;
//   location: String;
//   companyName: String  ;

// };
type JobItemProps = {
  jobData: Job;
  hideSaveButton: Boolean;
  hideDeleteButton : Boolean
};

export default function JobCard({
  jobData,
  hideSaveButton = false,
  hideDeleteButton = false
}: JobItemProps) {
  const { data: session } = useSession();
  const role = session?.user.role;

 const deleteThisJobAction  = deletePost.bind(null , jobData.id) 

  

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>
          {jobData.title}
          {!hideDeleteButton && <form action={deleteThisJobAction}><Button  >delete</Button></form> }
        </CardTitle>

        <CardDescription>{jobData.description}</CardDescription>
        <CardAction>
          <Image
            width={50}
            height={50}
            src={jobData.image || "pvt"}
            alt={"logo"}
          />
          {jobData.location}
        </CardAction>
      </CardHeader>
      <CardFooter>
        <div>
          {role === "CANDIDATE" && (
            <Link href={`/jobs/${jobData.id}`}>
              <Button className="px-10 mr-10">More details</Button>
            </Link>
          )}
          {role === "RECRUITER" && (
            <Link href={`/postjob/postedjob/${jobData.id}`}>
              <Button className="px-10 mr-10">More details</Button>
            </Link>
          )}
          {!hideSaveButton && <Button>Saved </Button>}
        </div>
      </CardFooter>
    </Card>
  );
}
