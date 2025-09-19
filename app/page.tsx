import { auth } from "@/auth";

export default async function Home() {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return;
  // }
  return (
    <div>
      this is home page
      {/* <h1>{session.user.name}</h1> */}
    </div>
  );
}
