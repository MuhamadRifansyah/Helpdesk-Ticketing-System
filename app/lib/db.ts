export type Role = "admin" | "agent" | "user";

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
  name: string;
};

export const users: User[] = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
    name: "Admin System",
  },
  {
    id: 2,
    email: "agent@gmail.com",
    password: "agent",
    role: "agent",
    name: "Support Agent",
  },
  {
    id: 3,
    email: "user@gmail.com",
    password: "user",
    role: "user",
    name: "John Doe",
  },
];
