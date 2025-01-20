"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import ProtectedPage from "@/services/auth/ProtectedPage";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedPage>
      <SearchBar />
      <div className="flex items-start justify-between">
        <Sidebar />
        <main className="w-full h-full min-h-screen rounded-l-lg bg-white">
          <div className="px-6 pb-6">{children}</div>
          <Toaster />
        </main>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
