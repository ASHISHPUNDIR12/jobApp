import locations from "@/data/location.json";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CustomCompany from "@/components/CustomCompany";
import { postJob } from "../actions";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function getCompanies() {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (err) {
    console.log("error fetching companies", err);
  }
}

export default async function PostJobPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const companies = (await getCompanies()) || [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h1>

      <form action={postJob} className="space-y-5">
        {/* Job Title */}
        <Input
          name="title"
          type="text"
          placeholder="Job Title"
          className="w-full border rounded-lg p-2 focus:ring-2 "
        />

        {/* Job Description */}
        <Textarea
          name="desc"
          placeholder="Job Description"
          className="w-full border rounded-lg p-2 focus:ring-2 "
        />

        {/* Location Select */}
        <Select required name="location">
          <SelectTrigger className="w-full border rounded-lg">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>States</SelectLabel>
              {locations.map((state, index) => (
                <SelectItem key={index} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Company Select */}
        <Select required name="companyId">
          <SelectTrigger className="w-full border rounded-lg">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Company</SelectLabel>
              {companies.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Add Custom Company */}
        <CustomCompany />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg shadow hover:bg-black transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
