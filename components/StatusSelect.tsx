"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStatus } from "@/app/actions";
import { Status } from "@prisma/client";

export default function StatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: string;
}) {
  return (
    <form >
      <input type="hidden" name="applicationId" value={applicationId} />
      <input type="hidden" name="status" defaultValue={currentStatus} />

      <Select
        defaultValue={currentStatus}
        onValueChange={(value) => {
         updateStatus(applicationId , value as Status)
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Applied" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="APPLIED">Applied</SelectItem>
          <SelectItem value="SELECTED">Selected</SelectItem>
          <SelectItem value="INTERVIEWING">Interviewing</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <button type="submit" className="hidden" />
    </form>
  );
}
