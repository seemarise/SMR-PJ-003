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
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {/* Main Container for desktop alignment */}
                <div className="md:max-w-4xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-blue-700 md:text-3xl md:font-semibold">
                            Student Performance
                        </h1>

                        <button className="text-blue-600 md:p-2 md:rounded-full md:hover:bg-blue-100">
                            <RotateCcw className="w-6 h-6 md:w-7 md:h-7" />
                        </button>
                    </div>

                    {/* Subject Card */}
                    <div className="bg-white border rounded-lg shadow p-4 mb-8 md:p-6 md:rounded-xl">
                        <div className="flex items-center gap-2 text-blue-700 font-medium mb-2 md:text-lg">
                            <Book className="w-5 h-5 md:w-6 md:h-6" />
                            <span>{subject.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1 md:text-base">
                            <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                            <span>{subject.class}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                            <Users className="w-4 h-4 md:w-5 md:h-5" />
                            <span>{subject.students} students</span>
                        </div>
                    </div>

                    {/* Empty State */}
                    <p className="text-gray-500 text-center mb-6 md:text-lg">
                        Select a student to view their performance report:
                    </p>

                    <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-16">
                        <Users className="w-12 h-12 text-gray-300 mb-3 md:w-16 md:h-16" />
                        <h2 className="text-lg font-semibold text-gray-700 md:text-2xl">
                            No Students Found
                        </h2>
                        <p className="text-gray-500 text-sm mb-4 md:text-base">
                            There are no students assigned to this class yet.
                        </p>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition md:px-8 md:py-3"
                            onClick={() => alert('Refreshing...')}
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
