import { Bell } from "lucide-react";
import Image from "next/image";

export default function NavbarTop({ sharedTitle }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md bg-white z-10">
      {/* Profile */}
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        <Image
          src="/profile.jpg"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          VAD<span className="text-black">AI</span>
        </h1>
        <span className="text-white text-xs font-semibold px-3 py-1 bg-blue-600 rounded-full shadow-md -mb-2 z-10">
          {sharedTitle}
        </span>
      </div>

      {/* Notification */}
      <Bell className="h-6 w-6 text-gray-700 cursor-pointer" />
    </header>
  );
}
