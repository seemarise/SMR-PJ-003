"use client";
import NavbarTop from "@/components/NavbarTop";
import NavbarBottom from "@/components/NavbarBottom";
import withAuth from "../auth";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Top Navbar */}
      <NavbarTop />

      {/* Page Content */}
      <main className="flex-1 p-4">{children}</main>

      {/* Bottom Navbar */}
      <NavbarBottom />
    </div>
  );
}

export default withAuth(DashboardLayout);