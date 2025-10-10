"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BookOpen,        // for PiExam (approximation)
  School,          // for SiGoogleclassroom (approximation)
  Monitor,         // for HiMiniComputerDesktop
  Activity,        // for MdTimeline
  Brain,            // for FaBrain
  Lightbulb
} from "lucide-react";
import { sessionService } from "@/services/sessionService";


// Helper function to get active label
function getActiveLabel(path, items) {
  const activeItem = items.find((item) => item.href === path);
  return activeItem ? activeItem.label : "";
}

export default function NavbarBottom({ setSharedTitle }) {
  const pathname = usePathname();
  const [user, setUser] = useState(sessionService.getUser() ?? {})


  // Define all items
  const leftItems = [
    { icon: BookOpen, label: "VAD Test", href: user.studentId ? "/student/vad-test" : "/vad-test", display: !user.studentId },
    { icon: School, label: "Classroom", href: user.studentId ? "/student/classroom" : "/classroom", display: true },
  ];

  const centerItem = {
    icon: Brain,
    label: "VAD AI",
    href: "/ai",
    display: false
  };

  const rightItems = [
    { icon: Monitor, label: "Ethical Learning", href: "/ethical-learning", display: true },
    (!user.studentId ? { icon: Activity, label: "Timeline", href: "/timeline", display: true } : { icon: Lightbulb, label: "Career Game", href: "/career-game", display: false }),
  ];

  const allItems = [...leftItems, centerItem, ...rightItems];
  const activeLabel = getActiveLabel(pathname, allItems);

  useEffect(() => {
    if (setSharedTitle) {
      setSharedTitle(activeLabel);
    }
  }, [pathname, activeLabel, setSharedTitle]);



  return (
    <div className="fixed bottom-4 w-full flex justify-center z-50">
      <nav className="relative flex justify-between items-center w-[95%] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg px-4 py-2">
        {/* Left Items */}
        <div className="flex flex-1 pr-10 justify-evenly">
          {leftItems.filter(x => x.display).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>

        {/* Center FAB */}
        {/* <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
          <Link href={centerItem.href}>
            <div
              className={`
                bg-[#5074b6] w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white/30
                text-white hover:text-blue-300 hover:scale-105 transition-all duration-300
                ${pathname === centerItem.href ? "text-yellow-400 scale-110" : ""}
              `}
            >
              <centerItem.icon className="text-2xl" />
            </div>
          </Link>
          <span className="text-xs mt-2 font-bold uppercase text-black dark:text-[#5074b6]">{activeLabel}</span>
        </div> */}

        {/* Right Items */}
        <div className="flex flex-1 justify-evenly">
          {rightItems.filter(x => x.display).map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavItem({ item, pathname }) {
  const Icon = item.icon;
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onTouchStart={(e) => e.currentTarget.classList.add("touch-bounce")}
      onAnimationEnd={(e) => e.currentTarget.classList.remove("touch-bounce")}
      className={`
                flex flex-col items-center justify-center text-gray-700  transition-all duration-300
                ${isActive ? "scale-110 text-yellow-600" : "hover:scale-105 hover:text-blue-300"}
            `}
    >
      <Icon className="text-2xl mb-1" />
      {/* {isActive && <span className="text-xs">{item.label}</span>} */}
    </Link>
  );

}