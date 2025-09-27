// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth"; // your auth.ts export 

export async function middleware(request: NextRequest) {
  // get current session using auth() helper from your auth.ts
  const session = await auth();

  // if no session and trying to access /jobs
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // allow if authenticated
  return NextResponse.next();
}

// apply middleware only to /jobs
export const config = {
  matcher: ["/jobs/:path*"  , "/postjob/:path*"],
};
