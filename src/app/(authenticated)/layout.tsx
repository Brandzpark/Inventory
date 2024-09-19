import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SideNavigationBar from "@/components/SideNavigationBar/SideNavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Inventory System",
    template: "%s | Inventory System",
  },
  description: "Inventory System",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full">
      <SideNavigationBar />
      <div className="p-5 lg:p-10 bg-[#F7F7F7] w-full">{children}</div>
    </section>
  );
}
