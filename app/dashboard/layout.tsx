"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedPage from "@/services/auth/ProtectedPage";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedPage>
      <div className="flex items-start justify-between">
        <Sidebar />
        <main className="w-full h-full px-4">
          <div>{children}</div>
          <Toaster />
        </main>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
