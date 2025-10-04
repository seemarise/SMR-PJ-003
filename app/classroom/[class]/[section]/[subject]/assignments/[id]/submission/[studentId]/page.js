"use client";

import { useRouter } from "next/navigation";

export default function SubmissionDetails({ params }) {
    const router = useRouter();

    // Mock submission data
    const submission = {
        id: "SMAE4XB2",
        status: "Approved",
        submittedAt: "Oct 03, 2025 - 08:19 AM",
        student: {
            id: params.studentId,
            name: "Sai Prasad N",
            class: "Class 10 - Section A",
            image: "https://via.placeholder.com/80",
        },
        answers: [
            { qid: "68df864c7fcb6becf31da094", option: 1 },
            { qid: "68df864c7fcb6becf31da095", option: 2 },
            { qid: "68df864c7fcb6becf31da096", option: 4 },
            { qid: "68df864c7fcb6becf31da097", option: 2 },
            { qid: "68df864c7fcb6becf31da098", option: 1 },
        ],
    };

    return (
        <main className="px-4 py-4 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => router.back()} className="text-2xl">←</button>
                <h1 className="text-lg font-semibold text-blue-600">
                    por,M by {submission.student.name}
                </h1>
            </div>

            {/* Status Box */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col gap-2 mb-6">
                <span className="text-green-600 font-semibold flex items-center gap-2">
                    ✅ {submission.status}
                </span>
                <p className="text-sm text-gray-700">
                    Submitted on: {submission.submittedAt}
                </p>
            </div>

            {/* Student Info */}
            <h2 className="text-blue-800 font-semibold mb-2">Student Information</h2>
            <div className="bg-white rounded-lg shadow p-4 flex gap-4 items-center mb-6">
                <img
                    src={submission.student.image}
                    alt={submission.student.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-gray-800">{submission.student.name}</h3>
                    <p className="text-sm text-gray-500">🎓 {submission.student.class}</p>
                    <p className="text-sm text-gray-500">📝 Submission ID: {submission.id}</p>
                </div>
            </div>

            {/* MCQ Answers */}
            <h2 className="text-blue-800 font-semibold mb-2">MCQ Answers</h2>
            <div className="space-y-3 mb-8">
                {submission.answers.map((ans, i) => (
                    <div
                        key={ans.qid}
                        className="bg-white rounded-lg shadow p-3 flex flex-col"
                    >
                        <span className="text-sm text-gray-600">
                            {i + 1}. Question ID: {ans.qid}
                        </span>
                        <span className="text-gray-900 font-medium">
                            Selected Option: {ans.option}
                        </span>
                    </div>
                ))}
            </div>
            {/* Reject Button */}
            <button
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow"
                onClick={() => alert("Assignment Rejected")}
            >
                ❌ Reject Assignment
            </button>
        </main>
    );
}
