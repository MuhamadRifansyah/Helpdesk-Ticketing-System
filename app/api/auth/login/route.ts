import { NextResponse } from "next/server";
import { users } from "../../../lib/users";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    email: user.email,
    role: user.role,
  });

  res.cookies.set(
    "user",
    JSON.stringify({
      email: user.email,
      role: user.role,
    }),
    { httpOnly: true, path: "/" }
  );

  return res;
}
