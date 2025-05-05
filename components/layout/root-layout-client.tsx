"use client";

import { useEffect } from "react";
import TopNav from "@/components/layout/top-nav";
import Sidebar from "@/components/layout/sidebar";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  return (
    <>
      <div className="flex bg-gradient-to-r from-secondary to-third p-4 gap-4 min-h-screen w-full">
        <div className="h-fit sticky top-4">
          <Sidebar />
        </div>
        <main className="flex-1 sticky top-4 h-fit">
          <TopNav />
          {children}
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
