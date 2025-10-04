"use client";
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
import locations from "@/data/location.json";
import { postJob } from "@/app/actions";
import { Company } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import { useEffect, useRef, useState, useTransition } from "react";

const initialState = { success: false, message: "" };

export default function PostjobForm({ companies }: { companies: Company[] }) {
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await postJob(state, formData);
      setState(result);
    });
  };

  useEffect(() => {
    // This effect runs when the server returns a message
    if (state.message) {
      // If it was a success, reset the form fields
      if (state.success) {
        formRef.current?.reset();
      }
      // Set a timer to clear the message after 3 seconds
      const timer = setTimeout(() => {
        setState(initialState);
      }, 3000);

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div>
      <form ref={formRef} action={clientAction} className="space-y-5">
        {/* All your form inputs remain exactly the same */}
        <Input
          required
          name="title"
          type="text"
          placeholder="Job Title"
          className="w-full border rounded-lg p-2 focus:ring-2 "
        />
        <Textarea
          required
          name="desc"
          placeholder="Job Description"
          className="w-full border rounded-lg p-2 focus:ring-2 "
        />
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
        <CustomCompany />

        {/* This will now work correctly */}
        <SubmitButton text="Post Job" isPending={isPending} />
      </form>

      {/* The message visibility is now controlled by the presence of a message in the state */}
      {state.message && (
        <p
          className={`mt-4 text-center font-semibold ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}