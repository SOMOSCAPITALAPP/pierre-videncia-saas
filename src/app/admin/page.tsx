import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main>
      <Header />
      <AdminPanel />
    </main>
  );
}
