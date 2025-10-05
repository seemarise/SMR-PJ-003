"use client";

import React, { useState } from "react";
import { ArrowLeft, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentRemarksPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const students = [
        {
            id: 1,
            name: "Kishan Rao B",
            image: "/student1.png",
        },
        {
            id: 2,
            name: "Sai Prasad N",
            image: "/student2.png",
        },
    ];

    const filteredStudents = students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-4 md:px-8 md:py-10">
                {/* Centered Container for Desktop */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="relative flex items-center justify-between md:justify-center">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:absolute md:left-0 md:p-3 md:shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-700 md:w-6 md:h-6" />
                        </button>

                        {/* Title */}
                        <h1 className="text-lg font-bold text-blue-800 md:text-3xl md:font-semibold text-center">
                            Student Remarks
                        </h1>

                        {/* Refresh Button */}
                        <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:absolute md:right-0 md:p-3 md:shadow-sm">
                            <RefreshCw className="w-5 h-5 text-blue-700 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Search Section */}
                    <div className="p-4 md:p-0 md:mt-4">
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm md:px-4 md:py-3 md:border-gray-200 md:shadow-md">
                            <Search className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full ml-2 outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
                            />
                        </div>
                        <p className="text-gray-500 text-sm mt-3 md:text-base">
                            Select a student to view or add remarks
                        </p>
                    </div>

                    {/* Student List */}
                    <div className="px-4 pb-10 md:px-0 md:mt-6">
                        {filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                onClick={() => router.push(`/classroom/teacherdashboard/remarks/${student.id}`)}
                                className="flex items-center justify-between bg-white border-b border-gray-100 py-3 cursor-pointer hover:bg-blue-50 transition md:rounded-xl md:shadow-sm md:p-4 md:mb-3 md:hover:shadow-md md:border md:border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={student.image}
                                        alt={student.name}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-200 md:w-14 md:h-14"
                                    />
                                    <p className="font-semibold text-gray-800 text-sm md:text-lg">
                                        {student.name}
                                    </p>
                                </div>
                                <span className="text-gray-400 text-lg md:text-xl">›</span>
                            </div>
                        ))}

                        {filteredStudents.length === 0 && (
                            <p className="text-gray-500 text-center mt-10 text-sm md:text-base">
                                No students found.
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
