import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  async function focusedJob(jobId: string) {
    try {
      const detailjob = await prisma.job.findFirst({
        where: { id: jobId },
      });
      return detailjob;
    } catch (err) {
      console.error("error", err);
    }
  }

  const detailjob = await focusedJob(id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900">
        {detailjob?.company}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
          {detailjob?.title}
        </h2>
        <div className="mt-4 md:mt-0">
          <Image
            width={100}
            height={60}
            src="/companies/google.webp"
            alt="company logo"
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex items-center text-gray-600 mb-6">
        <CiLocationOn className="mr-2 text-xl" />
        <span>{detailjob?.location}</span>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">About the Job</h3>
        <p className="text-gray-700 leading-relaxed">
          {detailjob?.description}
        </p>
      </div>
      <Dialog>
        <DialogTrigger className="border border-black px-130 bg-black text-white py-2 rounded ">
          Apply
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {`Apply for ${detailjob?.title} at ${detailjob?.company}`}
            </DialogTitle>
            <DialogDescription>Please fill the form below</DialogDescription>
          </DialogHeader>
          <form action="">
            <Input type="text" placeholder="Year of Experience " />
            <Input className="mt-3" type="text" placeholder="Skills" />
            <RadioGroup className="mt-3">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Intermediate</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Graduate</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Post Graduate</Label>
              </div>
            </RadioGroup>
            <div className="grid w-full max-w-sm items-center gap-3 mt-2">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
          </form>
          <DialogFooter>
            <Button>Apply</Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
