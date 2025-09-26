"use client";

import { updateRole } from "../app/actions";

export default function ValidateBtn() {
  return (
    <div className="pt-10 flex justify-center gap-10">
      <form action={updateRole.bind(null, "CANDIDATE")}>
        <button
        
          type="submit"
          className="border py-10 px-20 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
        >
          Candidate
        </button>
      </form>
      <form action={updateRole.bind(null, "RECRUITER")}>
        <button
          type="submit"
          className="border py-10 px-20 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
        >
          Recruiter
          
        </button>
      </form>
    </div>
  );
}