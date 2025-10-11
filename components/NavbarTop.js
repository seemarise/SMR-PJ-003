"use client";

import { sessionService } from "@/services/sessionService";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Import this
import { useEffect, useState } from "react";

export default function NavbarTop({ sharedTitle }) {
  const router = useRouter(); // ✅ Initialize it here

  const [user, setUser] = useState({});

  useEffect(() => {
    let u = sessionService.getUser()
    setUser(u)
  }, [])
  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md bg-white z-10 relative">
      {/* Profile */}
      <div
        className="w-10 h-10 relative rounded-full overflow-hidden cursor-pointer"
        onClick={() => router.push(!user.studentId ? "/profile" : "/student/profile")} // ✅ Works now
      >
        <Image
          src={user?.profileImage ?? null}
          alt="Profile"
          height={500}
          width={500}
          className="object-cover"
        />
      </div>

      {/* Center Title */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-[#5074b6]">
          VAD<span className="text-black">AI</span>
        </h1>
        <span className="text-white text-xs font-semibold px-3 py-1 bg-[#5074b6] rounded-full shadow-md -mb-2 z-10">
          {sharedTitle}
        </span>
      </div>

      {/* Notification Icon */}
      {/* <Bell className="h-6 w-6 text-gray-700 cursor-pointer" /> */}
    </header>
  );
}
