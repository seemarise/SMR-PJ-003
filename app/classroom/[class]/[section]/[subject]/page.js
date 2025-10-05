"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Megaphone,
  ClipboardList,
  BookOpen,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function SubjectPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Fix: directly extract from params (not React.use)
  const { class: className, section, subject } = params || {};
  // 🔹 get query params
  const classId = searchParams.get("class");
  const sectionId = searchParams.get("section");
  const subjectId = searchParams.get("subject");
  const items = [
    { name: "Announcements", icon: Megaphone, href: "announcements" },
    { name: "Assignments", icon: ClipboardList, href: `assignments` },
    { name: "Resources", icon: BookOpen, href: "resources" },
    { name: "Performance", icon: BarChart3, href: "performance" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10">
        {/* Desktop-centered container */}
        <div className="md:max-w-5xl md:mx-auto md:space-y-10">

          {/* Top Row */}
          <div className="relative flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            </button>

            {/* Subject Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                {subject
                  ? subject.charAt(0).toUpperCase() + subject.slice(1)
                  : "Subject"}
              </h1>

            </div>
          </div>

          {/* Class Info Box */}
          <div className="bg-blue-50 rounded-xl px-4 py-3 mt-3 shadow-sm md:px-6 md:py-5 md:bg-white md:border md:border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800 md:text-lg">
                Class {className || "-"}
              </p>
              <p className="text-xs text-gray-500 md:text-sm">
                Section {section ? section.toUpperCase() : "-"}
              </p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 md:w-14 md:h-14">
              <BookOpen className="text-[#5074b6] w-5 h-5 md:w-7 md:h-7" />
            </div>
          </div>

          {/* Management Section */}
          <p className="text-[#5074b6] mt-3 font-semibold text-base md:text-xl">
            Subject Management
          </p>

          <div className="flex flex-col gap-4 mt-3 md:grid md:grid-cols-2 md:gap-6 md:gap-y-6 md:gap-x-6 md:space-y-0">
            {items.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={`/classroom/${className}/${section}/${subject}/${href}?class=${classId}&section=${sectionId}&subject=${subjectId}`}
              >
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 md:w-12 md:h-12">
                      <Icon className="text-[#5074b6] w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className="font-medium text-gray-700 md:text-lg">
                      {name}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xl md:text-2xl">›</span>
                </div>
              </Link>
            ))}
          </div>


        </div>
      </main>
    </div>
  );
}
