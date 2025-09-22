"use client";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

type Job = {
  id: String;
  title: String;
  description: String;
  location: String;
  company: String;
};
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
            src="/companies/google.webp"
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
