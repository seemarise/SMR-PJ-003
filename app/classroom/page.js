"use client";

import withAuth from "../auth";
import Link from "next/link";

function Classroom() {
  const sections = ["A", "B", "C", "D"];

  // Example subjects coming from DB (replace with API call)
  const subjects = ["English", "Maths", "Science", "History"];

  return (
    <main className="px-4 py-4 bg-white min-h-screen md:h-screen md:overflow-y-auto md:bg-gray-50 md:px-8 md:py-10">
      {/* Content Container - Centered on desktop */}
      <div className="md:max-w-5xl md:mx-auto">
        {/* Title Section */}
        <div className="bg-blue-600 text-white text-lg font-semibold rounded-lg py-3 px-4 mb-4 text-center md:text-2xl md:py-4">
          My Classroom
        </div>

        {/* Class Pill */}
        <div className="flex justify-center mb-6 md:mb-8">
          <span className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full text-sm font-medium md:text-base md:px-6 md:py-2">
            Class 10
          </span>
        </div>

        {/* Section List */}
        <div className="space-y-6 md:space-y-8">
          {sections.map((section) => (
            <div key={section}>
              <p className="text-gray-700 font-semibold mb-1 md:text-lg md:mb-3">Sec - {section}</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                {subjects.map((subject) => (
                  <Link
                    key={subject}
                    href={`/classroom/class10/${section.toLowerCase()}/${subject.toLowerCase()}`}
                  >
                    <div className="bg-white rounded-xl p-4 shadow text-blue-600 font-medium text-center cursor-pointer hover:bg-blue-50 hover:shadow-md transition md:p-5 md:text-lg md:shadow-sm">
                      {subject}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Classroom);