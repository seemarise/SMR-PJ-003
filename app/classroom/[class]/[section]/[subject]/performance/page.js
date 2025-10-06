"use client";

import { useRouter, useParams } from "next/navigation";
import {
    RotateCcw,
    ArrowLeft,
    Book,
    GraduationCap,
    Users,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function StudentPerformancePage() {
    const router = useRouter();
    const { classId, section, subject } = useParams(); // ✅ get all three

    // Mock subject data
    const subjectInfo = {
        name: subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "English",
        class: `Class ${classId} - Section ${section.toUpperCase()}`,
        students: 2,
    };

    // Mock student list
    const students = [
        {
            id: 1,
            name: "Kishan Rao B",
            photo: "/students/kishan.jpg",
        },
        {
            id: 2,
            name: "Sai Prasad N",
            photo: "/students/sai.jpg",
        },
    ];

    const handleRefresh = () => {
        alert("Refreshing...");
    };

    // ✅ Correct routing to each student's report
    const handleStudentClick = (id) => {
        router.push(`/classroom/${classId}/${section}/${subject}/performance/${id}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl md:font-semibold">
                            Student Performance
                        </h1>

                        <button
                            className="text-[#5074b6] md:p-2 md:rounded-full md:hover:bg-blue-100"
                            onClick={handleRefresh}
                        >
                            <RotateCcw className="w-6 h-6 md:w-7 md:h-7" />
                        </button>
                    </div>

                    {/* Subject Info Card */}
                    <div className="bg-white border rounded-lg shadow p-4 mb-8 md:p-6 md:rounded-xl">
                        <div className="flex items-center gap-2 text-[#5074b6] font-medium mb-2 md:text-lg">
                            <Book className="w-5 h-5 md:w-6 md:h-6" />
                            <span>{subjectInfo.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1 md:text-base">
                            <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                            <span>{subjectInfo.class}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                            <Users className="w-4 h-4 md:w-5 md:h-5" />
                            <span>{subjectInfo.students} students</span>
                        </div>
                    </div>

                    {students.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-16">
                            <Users className="w-12 h-12 text-gray-300 mb-3 md:w-16 md:h-16" />
                            <h2 className="text-lg font-semibold text-gray-700 md:text-2xl">
                                No Students Found
                            </h2>
                            <p className="text-gray-500 text-sm mb-4 md:text-base">
                                There are no students assigned to this class yet.
                            </p>
                            <button
                                className="px-6 py-2 bg-[#5074b6] text-white font-semibold rounded-md shadow hover:bg-[#5074b6] transition md:px-8 md:py-3"
                                onClick={handleRefresh}
                            >
                                Refresh
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-500 mb-4 md:text-lg">
                                Select a student to view their performance report:
                            </p>

                            {/* Student Cards */}
                            <div className="flex flex-col gap-3 md:gap-4">
                                {students.map((student, index) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer md:p-4"
                                        onClick={() => handleStudentClick(student.id)}
                                    >
                                        <div className="flex items-center gap-3 md:gap-4">
                                            {/* Number Badge */}
                                            <div className="w-7 h-7 flex items-center justify-center bg-blue-100 text-[#5074b6] font-semibold rounded-full text-sm md:w-8 md:h-8 md:text-base">
                                                {index + 1}
                                            </div>

                                            {/* Profile Image */}
                                            <div className="w-10 h-10 rounded-full overflow-hidden md:w-12 md:h-12">
                                                <Image
                                                    src={student.photo}
                                                    alt={student.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            {/* Student Name */}
                                            <p className="font-semibold text-gray-800 text-base md:text-lg">
                                                {student.name}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <ChevronRight className="w-5 h-5 text-gray-400 md:w-6 md:h-6" />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
