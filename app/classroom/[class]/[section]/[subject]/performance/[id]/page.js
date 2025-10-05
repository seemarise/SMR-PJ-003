"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    GraduationCap,
    Book,
    RotateCcw,
    BarChart2,
} from "lucide-react";
import { useState } from "react";

export default function StudentPerformanceReport({ params }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("school");

    // Mock student and subject data
    const student = {
        id: params.id,
        name: "Kishan Rao B",
        class: "Class 10-A",
        subject: "English",
        photo: "/students/kishan.jpg",
    };

    const handleRefresh = () => {
        alert("Refreshing data...");
    };

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="px-4 py-3 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-transparent hover:bg-blue-50 transition md:p-3 md:bg-blue-100 md:hover:bg-blue-200 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700 md:w-6 md:h-6 md:text-blue-600" />
                        </button>

                        <h1 className="text-lg font-bold text-[#5074b6] md:text-3xl md:font-semibold text-center flex-1">
                            Performance Report
                        </h1>

                        <button
                            className="text-gray-700 md:text-[#5074b6] md:p-2 md:rounded-full md:hover:bg-blue-100"
                            onClick={handleRefresh}
                        >
                            <RotateCcw className="w-5 h-5 md:w-7 md:h-7" />
                        </button>
                    </div>

                    {/* Student Info Card */}
                    <div className="bg-white  rounded-lg shadow-sm p-3 mb-5 md:p-6 md:rounded-xl md:shadow">
                        <div className="flex items-center gap-3">
                            {/* Student Photo */}
                            <div className="w-12 h-12 rounded-full overflow-hidden md:w-16 md:h-16">
                                <Image
                                    src={student.photo}
                                    alt={student.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Student Details */}
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <h2 className="font-semibold text-gray-800 text-base md:text-2xl">
                                    {student.name}
                                </h2>
                                <div className="flex items-center gap-1 text-gray-600 text-xs md:text-base">
                                    <GraduationCap className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#5074b6]" />
                                    <span>{student.class}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#5074b6] text-xs md:text-base font-medium">
                                    <Book className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    <span>{student.subject}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs & Content Box */}
                    <div className=" rounded-lg shadow-sm bg-white overflow-hidden mb-6 md:rounded-xl md:border md:shadow-sm">
                        {/* Tabs Header */}
                        <div className="flex border-b">
                            <button
                                onClick={() => setActiveTab("school")}
                                className={`flex-1 py-3 font-medium flex flex-col items-center transition md:py-4 ${activeTab === "school"
                                    ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50"
                                    : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <GraduationCap className="w-4 h-4 mb-1 md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">
                                    School Exams
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab("vad")}
                                className={`flex-1 py-3 font-medium flex flex-col items-center transition md:py-4 ${activeTab === "vad"
                                    ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50"
                                    : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <BarChart2 className="w-4 h-4 mb-1 md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">
                                    VAD Tests
                                </span>
                            </button>
                        </div>

                        {/* Empty State */}
                        <div className="flex flex-col items-center justify-center text-center py-10 px-4 md:py-16">
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3 md:w-16 md:h-16 md:mb-4">
                                <BarChart2 className="w-6 h-6 text-gray-400 md:w-8 md:h-8" />
                            </div>

                            <h2 className="font-semibold text-gray-700 text-base md:text-2xl mb-1 md:mb-2">
                                No Data Available
                            </h2>
                            <p className="text-gray-500 text-xs mb-5 md:text-base md:mb-8">
                                {activeTab === "school"
                                    ? "No school exam data available for this student."
                                    : "No VAD test data available for this student."}
                            </p>

                            <button
                                onClick={handleRefresh}
                                className="px-5 py-1.5 bg-[#5074b6] text-white text-sm font-semibold rounded-md shadow hover:bg-blue-700 transition md:px-8 md:py-3 md:text-base"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
