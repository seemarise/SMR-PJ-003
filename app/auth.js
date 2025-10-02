"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sessionService } from "@/services/sessionService";
export default function withAuth(Component) {
  return function Authenticated(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = sessionService.getToken();

      if (!token) {
        router.replace("/login"); // Redirect if no token
      } else {
        setLoading(false); // Allow access if token exists
      }
    }, [router]);

    if (loading) return <div>Loading...</div>;

    return <Component {...props} />;
  };
}
