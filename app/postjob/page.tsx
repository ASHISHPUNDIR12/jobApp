import locations from "@/data/location.json";
import companies from "@/data/companies.json";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { addCompanies } from "../actions";

export default function () {
  return (
    <div>
      <h1>Post a Job </h1>
      <form action="">
        <Input type="text " placeholder="Job Title" />
        <Textarea placeholder="Job Description" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder=" location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>States</SelectLabel>
              {locations.map((state, index) => (
                <SelectItem key={index} value={state}>
                  {" "}
                  {state}{" "}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="company" />
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Company</SelectLabel>
                {companies.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Dialog>
          <form action={addCompanies}>
            <DialogTrigger asChild>
              <Button variant="outline">add company</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company </DialogTitle>
              </DialogHeader>
              <Input name="name" type="text" placeholder="Company Name " />
              <div>
                <Label htmlFor="picture">Picture</Label>
                <Input name="imgUrl" id="picture" type="file" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button  variant="outline">Cancel</Button>
                </DialogClose>
                <Button  type="submit">Add</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </form>
    </div>
  );
}
