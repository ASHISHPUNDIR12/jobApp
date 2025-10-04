"use client";

import { applyJob } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus(); // track if form is submitting

  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? "Submitting..." : "Submit Application"}
    </Button>
  );
}

export default function ApplyDialog({
  jobId,
  jobTitle,
  companyName,
  hasApplied,
}: {
  jobId: string;
  jobTitle: string;
  companyName: string;
  hasApplied: boolean;
}) {
  const [education, setEducation] = useState("");

  if (hasApplied) {
    return <Button>Already applied</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto px-10 py-6 text-lg">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Apply for ${jobTitle} at ${companyName}`}</DialogTitle>
          <DialogDescription>Please fill out the form below.</DialogDescription>
        </DialogHeader>

        {/* The form now wraps all the inputs AND the submit button */}
        <form action={applyJob}>
          {/* Use a hidden input to pass the jobId to the server action */}
          <input type="hidden" name="jobId" value={jobId} />

          <div className="space-y-4">
            <Input
              name="yearsOfExperience"
              type="number"
              placeholder="Years of Experience"
              required
            />
            <Input
              name="skills"
              type="text"
              placeholder="Skills (comma-separated)"
              required
            />
            <Input name="education" type="hidden" value={education} />
            <RadioGroup value={education} onValueChange={setEducation} required>
              <Label>Education Level</Label>
              {/* The values MUST match your Prisma Enum */}
              <div className="flex items-center gap-3">
                <RadioGroupItem value="INTERMEDIATE" id="r1" />
                <Label htmlFor="r1">Intermediate</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="GRADUATE" id="r2" />
                <Label htmlFor="r2">Graduate</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="POSTGRADUATE" id="r3" />
                <Label htmlFor="r3">PostGraduate</Label>
              </div>
            </RadioGroup>

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="resume">Resume (PDF)</Label>
              <Input name="resume" id="resume" type="file" required />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
