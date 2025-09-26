
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Assuming you use shadcn/ui
import { Application, Job } from "@/app/generated/prisma";
import Link from "next/link";
import { Button } from "./ui/button";

const statusStyles = {
  APPLIED: "bg-gray-200 text-gray-800",
  INTERVIEWING: "bg-blue-200 text-blue-800",
  SELECTED: "bg-green-200 text-green-800",
  REJECTED: "bg-red-200 text-red-800",
};

type ApplicationWithJob = Application & {
  job: Job;
};

export default function AppliedJobCard({ application }: { application: ApplicationWithJob }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{application.job.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{application.job.companyName}</p>
      </CardHeader>
      <CardContent>
          <Link href={`/jobs/${application.job.id}`}>
              <Button className="px-10 mr-10">More details</Button>
            </Link>
        <p>Applied on: {application.appliedAt.toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <span>Status:</span>
          <Badge className={statusStyles[application.status]}   variant="outline">{application.status}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}