import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers.get("x-forwarded-proto");
    if (proto === "http") {
      const httpsUrl = req.url.replace(/^http:/, "https:");
      return NextResponse.redirect(httpsUrl, { status: 301 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
