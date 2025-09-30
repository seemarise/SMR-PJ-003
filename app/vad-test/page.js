import NavbarTop from "@/components/NavbarTop";
import NavbarBottom from "@/components/NavbarBottom";
import SubjectCard from "@/components/SubjectCard";
import { ClipboardList } from "lucide-react";

export default function VadTestPage() {
  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white">
      {/* Top Navbar */}
      <NavbarTop />

      {/* Page Content */}
      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Title Row */}
        <div className="relative flex items-center justify-between">
          {/* Left - School Exam */}
          <button className="px-3 py-1 border border-gray-400 text-gray-800 rounded-lg text-sm font-medium">
            School Exam
          </button>

          {/* Center - VAD Test with doodle underline */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-xl font-bold">VAD Test</h2>
            <div className="w-16 h-2 mx-auto -mt-1">
              <svg
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-red-500"
              >
                <path
                  d="M5 5 C20 10, 40 0, 95 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                />
              </svg>
            </div>
          </div>

          {/* Right - Tasks Icon */}
          <ClipboardList className="h-6 w-6 text-gray-700 cursor-pointer" />
        </div>

        {/* Class Info */}
        <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg text-center shadow-sm">
          Class 10
        </div>

        {/* Subject Cards */}
        <div className="space-y-4">
          <SubjectCard title="English" date="01 Dec 2025" />
          <SubjectCard title="Social Science" date="01 Dec 2025" />
        </div>
      </main>

      {/* Bottom Navbar */}
      <NavbarBottom />
    </div>
  );
}
