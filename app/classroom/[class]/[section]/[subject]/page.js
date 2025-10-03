"use client";

import { Megaphone, ClipboardList, BookOpen, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function SubjectPage({ params }) {
  const { class: className, section, subject } = params;

  const items = [
    { name: "Announcements", icon: Megaphone, href: "announcements" },
    { name: "Assignments", icon: ClipboardList, href: "assignments" },
    { name: "Resources", icon: BookOpen, href: "resources" },
    { name: "Performance", icon: BarChart3, href: "performance" },
  ];

  return (
    <main className="px-4 py-6 bg-white min-h-screen md:h-screen md:overflow-y-auto md:bg-gray-50 md:px-8 md:py-10">
      {/* Content Container - Centered on desktop */}
      <div className="md:max-w-4xl md:mx-auto">
        {/* Subject Title */}
        <h1 className="text-2xl font-semibold text-center text-blue-800 mb-4 md:text-4xl md:mb-6">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </h1>

        {/* Class Info Box */}
        <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3 mb-6 shadow-sm md:px-6 md:py-4 md:mb-8 md:bg-white md:border md:border-blue-100">
          <div>
            <p className="text-sm font-semibold text-gray-800 md:text-lg">Class {className}</p>
            <p className="text-xs text-gray-500 md:text-sm">Section {section.toUpperCase()}</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 md:w-14 md:h-14">
            <BookOpen className="text-blue-600 w-5 h-5 md:w-7 md:h-7" />
          </div>
        </div>

        {/* Subject Management Title */}
        <p className="text-blue-700 font-semibold mb-3 md:text-xl md:mb-5">Subject Management</p>

        {/* Management Options */}
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
          {items.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={`/classroom/${className}/${section}/${subject}/${href}`}
            >
              <div className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5 md:hover:border-blue-200">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 md:w-12 md:h-12">
                    <Icon className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="font-medium text-gray-700 md:text-lg">{name}</span>
                </div>
                <span className="text-gray-400 text-xl md:text-2xl">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}