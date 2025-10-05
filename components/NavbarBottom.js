"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Example placeholder component
const IconPlaceholder = () => (
  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
);

// Dynamically import icons with loading placeholder
const PiExam = dynamic(
  () => import("react-icons/pi").then((mod) => mod.PiExam),
  { ssr: false, loading: () => <IconPlaceholder /> }
);

const SiGoogleclassroom = dynamic(
  () => import("react-icons/si").then((mod) => mod.SiGoogleclassroom),
  { ssr: false, loading: () => <IconPlaceholder /> }
);

const HiMiniComputerDesktop = dynamic(
  () => import("react-icons/hi2").then((mod) => mod.HiMiniComputerDesktop),
  { ssr: false, loading: () => <IconPlaceholder /> }
);

const MdTimeline = dynamic(
  () => import("react-icons/md").then((mod) => mod.MdTimeline),
  { ssr: false, loading: () => <IconPlaceholder /> }
);

const FaBrain = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaBrain),
  { ssr: false, loading: () => <IconPlaceholder /> }
);



// Helper function to get active label
function getActiveLabel(path, items) {
  const activeItem = items.find((item) => item.href === path);
  return activeItem ? activeItem.label : "";
}

export default function NavbarBottom({ setSharedTitle }) {
  const pathname = usePathname();


  // Define all items
  const leftItems = [
    { icon: PiExam, label: "VAD Test", href: "/vad-test" },
    { icon: SiGoogleclassroom, label: "Classroom", href: "/classroom" },
  ];

  const centerItem = {
    icon: FaBrain,
    label: "VAD AI",
    href: "/ai",
  };

  const rightItems = [
    { icon: HiMiniComputerDesktop, label: "Ethical Learning", href: "/ethical-learning" },
    { icon: MdTimeline, label: "Timeline", href: "/timeline" },
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
          {leftItems.map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>

        {/* Center FAB */}
        <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
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
          {/* Always show active label below FAB */}
          <span className="text-xs mt-2 text-black dark:text-blue-600">{activeLabel}</span>
        </div>

        {/* Right Items */}
        <div className="flex flex-1 justify-evenly">
          {rightItems.map((item) => (
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
                ${isActive ? "scale-110 text-yellow-200" : "hover:scale-105 hover:text-blue-300"}
            `}
    >
      <Icon className="text-2xl mb-1" />
      {/* {isActive && <span className="text-xs">{item.label}</span>} */}
    </Link>
  );

}