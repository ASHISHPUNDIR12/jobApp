import Link from "next/link";
import Login from "./LoginBtn";
import LoginDialog from "./LoginDialog";

export default function Header() {
  return (
    <header className="flex justify-between p-2 border-b border-b-slate-400">
      <div>
        <Link href={"/"}>Hired</Link>
      </div>
      <div>
        <LoginDialog />
      </div>
    </header>
  );
}
