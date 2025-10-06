"use client"; // Required for client-side navigation
import { redirect } from "next/navigation";
import withAuth from "./auth";

function HomePage() {
  redirect("/vad-test")
}

export default withAuth(HomePage);