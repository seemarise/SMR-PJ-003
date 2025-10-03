"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sessionService } from "@/services/sessionService";

export default function withAuth(Component) {
  return function Authenticated(props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking

    useEffect(() => {
      const token = sessionService.getToken();

      if (!token) {
        router.replace("/login"); // Redirect if no token
      } else {
        setIsAuthenticated(true); // Token exists
      }
    }, [router]);

    // While checking, show loader
    if (isAuthenticated === null) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      );
    }

    // If not authenticated, nothing is rendered because redirect already triggered
    if (!isAuthenticated) return null;

    // Authenticated
    return <Component {...props} />;
  };
}
