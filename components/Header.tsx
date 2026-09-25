import Link from "next/link";
import LoginDialog from "./LoginDialog";
import logo from "@/public/logo-dark.png";
import Image from "next/image";
import { auth } from "@/auth";
export default async function Header() {
  const session = await auth();
  const role = session?.user.role;
  const home = role === "CANDIDATE" ? "/jobs" : role === "RECRUITER" ? "/postjob" : "/";
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-background/85 px-4 py-4 backdrop-blur-xl sm:px-8">
      <div className="content-shell flex items-center justify-between">
        <Link href={home} aria-label="Hired home">
          <Image className="h-auto w-28" src={logo} alt="Hired" priority />
        </Link>
        <LoginDialog />
      </div>
    </header>
  );
}
