"use client";
import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    UserRound,
    Pencil,
    Trash,
    ArrowRight,
    Plus,
} from "lucide-react";
import { getAssignments } from "@/services/classroomService/classroomApi";
import { useState, useEffect } from "react";

export default function AssignmentsPage({ params }) {
    const router = useRouter();
    // const params = useParams(); // ✅ Get current route params

    // Extract route params
    // 🔹 get route params
    const searchParams = useSearchParams();
    const { class: classId, section, subject } = React.use(params);
    const subjectId = searchParams.get("subject");

    const [assignments, setAssignments] = useState([]);
    // const assignments = [
    //     {
    //         id: 1,
    //         title: "por,M",
    //         dueDate: "Oct 10, 2025",
    //         tags: ["kh"],
    //         submissions: 1,
    //     },
    //     {
    //         id: 2,
    //         title: "Flutter",
    //         dueDate: "Oct 08, 2025",
    //         tags: ["Flutter", "Dart"],
    //         submissions: 0,
    //     },
    //     {
    //         id: 3,
    //         title: "Test Upload Image",
    //         dueDate: "Oct 08, 2025",
    //         tags: ["asdasd"],
    //         submissions: 0,
    //     },
    // ];
    useEffect(() => {
        async function fetchAssignments() {
            console.log("my subject id id", subjectId)
            let res = await getAssignments([subjectId]);
            setAssignments(res.data.assignments);
        };
        fetchAssignments();
    }, []);
    function formatDate(isoDate) {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {/* Main container for desktop alignment */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl md:font-bold">
                            Assignments
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Assignment Cards */}
                    <div className="space-y-4 md:space-y-6">
                        {assignments.length === 0 ? (
                            <p>Loading...</p>
                        ) : (assignments.map((a) => (
                            <div
                                key={a._id}
                                onClick={() =>
                                    router.push(
                                        `/classroom/${classId}/${section}/${subject}/assignments/${a._id}?title=${a.lesson}`
                                    )
                                }
                                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition md:p-6 md:rounded-xl"
                            >
                                {/* Top Row: Due Date + Status */}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500 md:text-base">
                                        Due: {formatDate(a.dueDate)}
                                    </span>
                                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full md:text-sm md:px-3">
                                        Active
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="font-semibold text-gray-800 md:text-xl">
                                    {a.lesson}
                                </h2>

                                {/* Tags */}
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {a.topics.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full md:text-sm md:px-3"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Row */}
                                <div className="flex justify-between items-center mt-3 text-sm text-gray-600 md:text-base">
                                    <span className="flex items-center gap-1">
                                        <UserRound size={16} className="md:w-5 md:h-5" />
                                        {a.submittedCount} submissions
                                    </span>

                                    <div className="flex gap-3 md:gap-5">
                                        {/* ✏️ Edit */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(
                                                    `/classroom/${classId}/${section}/${subject}/assignments/${a._id}/edit`
                                                );
                                            }}
                                            className="text-blue-500 hover:text-blue-700 transition"
                                        >
                                            <Pencil size={18} className="md:w-5 md:h-5" />
                                        </button>

                                        {/* 🗑️ Delete */}
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-red-500 hover:text-red-600 transition"
                                        >
                                            <Trash size={18} className="md:w-5 md:h-5" />
                                        </button>

                                        {/* ➡️ View */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(
                                                    `/classroom/${classId}/${section}/${subject}/assignments/${a._id}?title=${a.lesson}`
                                                );
                                            }}
                                            className="text-blue-600 hover:text-blue-700 transition"
                                        >
                                            <ArrowRight size={18} className="md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>

                    {/* Floating Add Button */}
                    <button
                        onClick={() =>
                            router.push(
                                `/classroom/${classId}/${section}/${subject}/assignments/create`
                            )
                        }
                        className="fixed bottom-6 right-6 bg-[#5074b6] text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 transition md:p-5 md:bottom-10 md:right-10"
                    >
                        <Plus />
                    </button>
                </div>
            </main>
        </div>
    );
}
