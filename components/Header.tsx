import Link from "next/link";
import LoginDialog from "./LoginDialog";
import logo from "@/public/logo-dark.png";
import Image from "next/image";
import { auth } from "@/auth";
export default async function Header() {
  const session = await auth();
  const role = session?.user.role;
  return (
    <header className="flex justify-between px-20 py-5  ">
      <div>
        {role === "CANDIDATE" && (
          <Link className="text-4xl font-bold" href={"/jobs"}>
            <Image className="w-30" src={logo} alt="Hired" />
          </Link>
        )}
        {role === "RECRUITER" && (
          <Link className="text-4xl font-bold" href={"/postjob"}>
            <Image className="w-30" src={logo} alt="Hired" />
          </Link>
        )}
      </div>
      <div className="mt-5">
        <LoginDialog />
      </div>
    </header>
  );
}
