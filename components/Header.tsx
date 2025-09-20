import Link from "next/link";
import LoginDialog from "./LoginDialog";
import logo from "@/public/logo-dark.png"
import Image from "next/image";
export default function Header() {
  return (
    <header className="flex justify-between px-20 py-5  ">
      <div>
        <Link className="text-4xl font-bold" href={"/"}>
           <Image className="w-30" src={logo} alt="Hired" />
        </Link>
      </div>
      <div className="mt-5">
        <LoginDialog />
      </div>
    </header>
  );
}
