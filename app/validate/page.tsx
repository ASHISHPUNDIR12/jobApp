import { auth } from "@/auth";
import ValidateBtn from "@/components/ValidateBtn";
import { redirect } from "next/navigation";

export default async function validatepage () {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="w-full h-[92.5vh] text-center pt-40">
      <div>
        <h1 className="text-8xl font-bold ">I am a...</h1>
        <ValidateBtn />
      </div>
    </div>
  );
}
