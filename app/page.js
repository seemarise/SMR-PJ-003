"use client"; // Required for client-side navigation
import { redirect } from "next/navigation";
import withAuth from "./auth";
import { useState } from "react";
import { sessionService } from "@/services/sessionService";

function HomePage() {
  const [user] = useState(sessionService.getUser())
  redirect(!user.studentId ? "/classroom" : "/student/classroom")
}

export default withAuth(HomePage);