import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookie = (await cookies()).get("user");

  if (!cookie) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(JSON.parse(cookie.value));
}
