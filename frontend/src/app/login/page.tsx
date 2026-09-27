"use client";

import { Descope } from "@descope/react-sdk";
import { useSession } from "@descope/react-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userApi } from "@/lib/api";
import { Bot } from "lucide-react";

export default function LoginPage() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isSessionLoading, router]);

  const handleSuccess = async () => {
    try {
      await userApi.sync();
    } catch (error) {
      console.error("Error syncing user:", error);
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Syntra</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your AI-powered Google Calendar assistant
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <Descope
            flowId="sign-up-or-in"
            onSuccess={handleSuccess}
            onError={(e) => console.error("Login error:", e)}
          />
        </div>
      </div>
    </div>
  );
}
