"use client";

import { useRouter } from "next/navigation";

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
        <main className="px-4 py-4 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => router.back()} className="text-2xl">
                    ←
                </button>
                <h1 className="text-lg font-semibold text-blue-600">
                    {assignment.title}
                </h1>
            </div>

            {/* Submission Card */}
            <div className="border rounded-lg bg-green-50 border-green-200 p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-green-700">
                        Submitted on: {assignment.submissionDate}
                    </p>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        {assignment.status}
                    </span>
                </div>

                {/* Student Info */}
                <div
                    onClick={() =>
                        router.push(
                            `/classroom/class10/a/english/assignments/${assignment.id}/submission/${assignment.student.name.replace(/\s+/g, "").toLowerCase()}`
                        )
                    }
                    className="flex items-center gap-4 bg-white rounded-lg p-3 shadow cursor-pointer hover:bg-gray-50"
                >
                    <img
                        src={assignment.student.image}
                        alt={assignment.student.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h2 className="font-semibold text-gray-800">{assignment.student.name}</h2>
                        <p className="text-sm text-gray-500">{assignment.student.class}</p>
                    </div>
                    <span className="text-green-500 text-xl">›</span>
                </div>

            </div>
        </main>
    );
}
