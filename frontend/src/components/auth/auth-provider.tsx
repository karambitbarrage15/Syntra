"use client";

import { AuthProvider as DescopeAuthProvider, useSession, useUser } from "@descope/react-sdk";
import { useEffect, ReactNode } from "react";
import { setSessionToken } from "@/lib/api";

function SessionSync() {
  const { sessionToken } = useSession();

  useEffect(() => {
    if (sessionToken) {
      setSessionToken(sessionToken);
    }
  }, [sessionToken]);

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <DescopeAuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}>
      <SessionSync />
      {children}
    </DescopeAuthProvider>
  );
}

export { useSession, useUser };
