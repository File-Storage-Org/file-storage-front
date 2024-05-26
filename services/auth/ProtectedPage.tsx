"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/services/auth/AuthProvider";
import { useRouter } from "next/navigation";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    // Prevent rendering before redirect
    return null;
  }

  return children;
};

export default ProtectedPage;
