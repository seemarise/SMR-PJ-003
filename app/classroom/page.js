"use client";

import withAuth from "../auth";
import Link from "next/link";

function Classroom() {
    const sections = ["A", "B", "C", "D"];

    // Example subjects coming from DB (replace with API call)
    const subjects = ["English", "Maths", "Science", "History"];

    return (
        <main className="px-4 py-4 bg-white min-h-screen">
            {/* Title Section */}
            <div className="bg-blue-600 text-white text-lg font-semibold rounded-lg py-3 px-4 mb-4 text-center">
                My Classroom
            </div>

            {/* Class Pill */}
            <div className="flex justify-center mb-6">
                <span className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                    Class 10
                </span>
            </div>

            {/* Section List */}
            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section}>
                        <p className="text-gray-700 font-semibold mb-1">Sec - {section}</p>
                        <div className="grid grid-cols-2 gap-4">
                            {subjects.map((subject) => (
                                <Link
                                    key={subject}
                                    href={`/classroom/class10/${section.toLowerCase()}/${subject.toLowerCase()}`}
                                >
                                    <div className="bg-white rounded-xl p-4 shadow text-blue-600 font-medium text-center cursor-pointer hover:bg-blue-50 hover:shadow-md transition">
                                        {subject}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default withAuth(Classroom);
