"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const role = (user as { role?: string } | undefined)?.role;

  const login = useCallback(
    async (identifier: string, password: string) => {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("שם משתמש או סיסמה שגויים");
      }

      router.push("/dashboard");
      router.refresh();
    },
    [router]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  }, [router]);

  const register = useCallback(
    async (data: {
      firstName: string;
      lastName: string;
      phone: string;
      email?: string;
      gender?: string;
      city?: string;
      password: string;
    }) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "שגיאה בהרשמה");
      }

      // Auto login after registration
      await login(data.phone, data.password);
    },
    [login]
  );

  const isAdmin = role
    ? ["CITY_COORD_MALE", "CITY_COORD_FEMALE", "NEIGHBORHOOD_HEAD", "CITY_HEAD", "REGION_HEAD", "NATIONAL_ADMIN"].includes(role)
    : false;

  const isMentor = role ? ["MENTOR", "ACTIVIST"].includes(role) || isAdmin : false;

  return {
    session,
    user,
    role,
    isLoading,
    isAuthenticated,
    isAdmin,
    isMentor,
    login,
    logout,
    register,
  };
}
