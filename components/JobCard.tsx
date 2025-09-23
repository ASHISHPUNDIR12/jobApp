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

// type Job = {
//   id: String;
//   title: String;
//   description: String;
//   location: String;
//   companyName: String  ;
  
// };
type JobItemProps = {
  jobData: Job;
};

export default function JobCard({ jobData }: JobItemProps) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{jobData.title}</CardTitle>
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
          <Link href={`/jobs/${jobData.id}`}>
            <Button className="px-10 mr-10">More details</Button>
          </Link>
          <Button>saved</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
