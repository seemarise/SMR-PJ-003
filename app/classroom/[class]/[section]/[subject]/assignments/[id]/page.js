"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AssignmentDetails({ params }) {
    const router = useRouter();

    // Mock data (same as in AssignmentsPage)
    const assignments = [
        {
            id: 1,
            title: "por,M",
            dueDate: "Oct 10, 2025",
            submissionDate: "Oct 03, 2025 - 08:19 AM",
            status: "Approved",
            student: {
                name: "Sai Prasad N",
                class: "Class 10 - Section A",
                image: "https://via.placeholder.com/50",
            },
        },
        {
            id: 2,
            title: "Flutter",
            dueDate: "Oct 08, 2025",
            submissionDate: "Oct 01, 2025 - 02:45 PM",
            status: "Pending",
            student: {
                name: "John Doe",
                class: "Class 10 - Section B",
                image: "https://via.placeholder.com/50",
            },
        },
        {
            id: 3,
            title: "Test Upload Image",
            dueDate: "Oct 08, 2025",
            submissionDate: "Oct 02, 2025 - 09:10 AM",
            status: "Reviewed",
            student: {
                name: "Alice Smith",
                class: "Class 9 - Section A",
                image: "https://via.placeholder.com/50",
            },
        },
    ];

    // Get current assignment by id from params
    const assignment = assignments.find((a) => a.id.toString() === params.id);

    if (!assignment) {
        return (
            <main className="px-4 py-4">
                <h1 className="text-red-500">Assignment not found</h1>
            </main>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {/* Desktop container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="relative flex items-center justify-between mb-6 md:mb-10">
                        {/* Left - Back button */}
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        {/* Center - Title */}
                        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-blue-600 md:text-3xl md:font-bold text-center">
                            {assignment.title}
                        </h1>

                        {/* Right - Placeholder for symmetry */}
                        <div className="w-8 md:w-10" />
                    </div>

                    {/* Submission Card */}
                    <div className="border rounded-lg bg-green-50 border-green-200 p-4 shadow-sm md:p-8 md:rounded-2xl md:bg-white md:border md:border-green-100 md:shadow-md md:space-y-6">
                        {/* Submission Info */}
                        <div className="flex justify-between items-center mb-3 md:mb-5">
                            <p className="text-sm text-green-700 md:text-base font-medium">
                                Submitted on: {assignment.submissionDate}
                            </p>
                            <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full md:text-sm md:px-4">
                                {assignment.status}
                            </span>
                        </div>

                        {/* Student Info */}
                        <div
                            onClick={() =>
                                router.push(
                                    `/classroom/class10/a/english/assignments/${assignment.id}/submission/${assignment.student.name
                                        .replace(/\s+/g, "")
                                        .toLowerCase()}`
                                )
                            }
                            className="flex items-center gap-4 bg-white rounded-lg p-3 shadow cursor-pointer hover:bg-gray-50 transition md:p-6 md:rounded-xl md:shadow-sm"
                        >
                            <img
                                src={assignment.student.image}
                                alt={assignment.student.name}
                                className="w-12 h-12 rounded-full object-cover md:w-16 md:h-16"
                            />
                            <div className="flex-1">
                                <h2 className="font-semibold text-gray-800 md:text-xl">
                                    {assignment.student.name}
                                </h2>
                                <p className="text-sm text-gray-500 md:text-base">
                                    {assignment.student.class}
                                </p>
                            </div>
                            <span className="text-green-500 text-xl md:text-2xl">›</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
