"use client";

import { useRouter } from "next/navigation";
import { RotateCcw, ArrowLeft, Book, GraduationCap, Users } from "lucide-react";

export default function StudentPerformancePage() {
    const router = useRouter();

    // Mock subject data
    const subject = {
        name: "English",
        class: "Class 10 - Section B",
        students: 0,
    };

    return (
        <main className="px-4 py-4 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-xl">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-semibold text-blue-700">
                        Student Performance
                    </h1>
                </div>
                <button className="text-blue-600">
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>

            {/* Subject Card */}
            <div className="bg-white border rounded-lg shadow p-4 mb-8">
                <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                    <Book className="w-5 h-5" />
                    <span>{subject.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{subject.class}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{subject.students} students</span>
                </div>
            </div>

            {/* Empty State */}
            <p className="text-gray-500 text-center mb-6">
                Select a student to view their performance report:
            </p>

            <div className="flex flex-col items-center justify-center text-center mt-12">
                <Users className="w-12 h-12 text-gray-300 mb-3" />
                <h2 className="text-lg font-semibold text-gray-700">No Students Found</h2>
                <p className="text-gray-500 text-sm mb-4">
                    There are no students assigned to this class yet.
                </p>
                <button
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow"
                    onClick={() => alert("Refreshing...")}
                >
                    Refresh
                </button>
            </div>
        </main>
    );
}
