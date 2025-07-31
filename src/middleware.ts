// middleware.ts

import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// ✅ Only apply middleware to /admin and its subpaths
export const config = {
  matcher: ["/admin/:path*"],
};
