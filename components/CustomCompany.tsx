"use client";
import { addCompanies } from "@/app/actions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

export default function CustomCompany() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border border-dashed border-gray-400 py-2 hover:bg-gray-100 transition"
        >
          + Add Company
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white rounded-xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Add New Company
          </DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            await addCompanies(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          {/* Company Name */}
          <Input
            name="name"
            type="text"
            placeholder="Company Name"
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-black-500"
          />

          {/* Picture Upload */}
          <div className="space-y-2">
            <Label htmlFor="picture" className="text-sm font-medium text-gray-700">
              Company Logo
            </Label>
            <Input
              name="imgUrl"
              id="picture"
              type="file"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black transition"
          >
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
