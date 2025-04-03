import "../globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/stores/Providers";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkHive Owners",
  description:
    "WorkHive was developed as a groundbreaking solution for managing and booking coworking spaces. This platform is designed to provide a professional, centralized, and convenient system, optimizing the management of bookings, organizing information, and supporting events for coworking spaces. WorkHive not only benefits users of these services but also effectively supports coworking space owners in enhancing service quality and expanding their market presence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="min-h-screen bg-third flex items-center justify-center w-full">
        <Providers>
          <div className="w-5xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-[600px] border border-primary rounded-md shadow-2xl">
            <div className="relative w-full h-[600px] flex-1/2">
              <Image
                src="/signup.jpg"
                alt="logo"
                fill
                className="object-cover w-full h-full rounded-l-md"
                priority
              />
            </div>
            <div className="flex flex-col bg-white flex-1/2 h-[600px] rounded-r-md">
              {children}
            </div>
          </div>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
