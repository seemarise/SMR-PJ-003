"use client";

import React, { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle, XCircle, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AttendancePage() {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [attendance, setAttendance] = useState([
        { id: 1, name: "Kishan Rao B", status: "Present", image: "/student1.png" },
        { id: 2, name: "Sai Prasad N", status: "Absent", image: "/student2.png" },
    ]);

    const toggleStatus = (id, newStatus) => {
        setAttendance((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, status: newStatus } : student
            )
        );
    };

    return (
        <main className="px-4 py-4 bg-white min-h-screen md:bg-gray-50 md:px-8 md:py-10">
            {/* Centered Container */}
            <div className="md:max-w-5xl md:mx-auto">
                {/* Header */}
                <div className="relative flex items-center justify-between mb-6 md:mb-10">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5 text-blue-700 md:w-6 md:h-6" />
                    </button>

                    {/* Centered Title */}
                    <div className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="text-xl md:text-3xl font-bold text-[#5074b6]">
                            Student Attendance
                        </h1>
                    </div>

                    {/* Edit / Save Controls */}
                    <div className="flex gap-4 items-center ml-auto">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1 md:p-2"
                            >
                                <Pencil className="w-5 h-5 text-[#5074b6] hover:scale-110 transition md:w-6 md:h-6" />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-red-500 font-medium hover:underline text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-[#5074b6] font-medium hover:underline text-sm md:text-base"
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Date Selector */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between mb-6 md:p-6 md:rounded-2xl md:bg-blue-50 md:border-blue-100">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Date</p>
                            <p className="font-semibold text-gray-800 text-base md:text-lg">
                                05 Oct 2025
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-400 text-lg md:text-xl">▾</span>
                </div>

                {/* Student List */}
                <div className="space-y-4 md:max-w-4xl md:mx-auto">
                    {attendance.map((student) => (
                        <div
                            key={student.id}
                            className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition md:p-5"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={student.image}
                                    alt={student.name}
                                    className="w-12 h-12 rounded-full object-cover border border-gray-200 md:w-14 md:h-14"
                                />
                                <p className="font-semibold text-gray-800 text-base md:text-lg">
                                    {student.name}
                                </p>
                            </div>

                            {/* Attendance Status */}
                            {!isEditing ? (
                                <div
                                    className={`px-3 py-1 rounded-full border font-medium text-sm md:text-base flex items-center gap-1 ${student.status === "Present"
                                        ? "text-green-600 border-green-400 bg-green-50"
                                        : "text-red-500 border-red-400 bg-red-50"
                                        }`}
                                >
                                    {student.status === "Present" ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <XCircle className="w-4 h-4" />
                                    )}
                                    {student.status}
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => toggleStatus(student.id, "Present")}
                                        className={`p-2 rounded-full border transition ${student.status === "Present"
                                            ? "bg-green-500 border-green-500 text-white"
                                            : "border-green-400 text-green-500 hover:bg-green-50"
                                            }`}
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(student.id, "Absent")}
                                        className={`p-2 rounded-full border transition ${student.status === "Absent"
                                            ? "bg-red-500 border-red-500 text-white"
                                            : "border-red-400 text-red-500 hover:bg-red-50"
                                            }`}
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
