import { apiFetch } from "./client";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
};

/**
 * Login user with email & password
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

/**
 * (Optional) Register user
 * You can remove this if not needed
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}
