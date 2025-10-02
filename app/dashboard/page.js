"use client";
import withAuth from "../auth";

export  function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="mt-2 text-gray-600">Welcome to your dashboard! 🎉</p>
    </div>
  );
}

export default withAuth(DashboardPage);