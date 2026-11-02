import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const signedIn = Boolean(request.auth);
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard") && !signedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (path.startsWith("/sign-in") && signedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"]
};
