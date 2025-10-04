"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="relative flex items-center justify-between mb-6 md:mb-10">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        {/* Title Centered */}
                        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-blue-600 md:text-3xl md:font-bold text-center">
                            por,M by {submission.student.name}
                        </h1>

                        {/* Right placeholder for symmetry */}
                        <div className="w-8 md:w-10" />
                    </div>

                    {/* Status Box */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col gap-2 mb-6 md:p-6 md:rounded-2xl md:shadow-sm md:bg-white md:border-green-100">
                        <span className="text-green-600 font-semibold flex items-center gap-2 md:text-lg">
                            ✅ {submission.status}
                        </span>
                        <p className="text-sm text-gray-700 md:text-base">
                            Submitted on: {submission.submittedAt}
                        </p>
                    </div>

                    {/* Student Info */}
                    <div>
                        <h2 className="text-blue-800 font-semibold mb-2 md:text-xl">
                            Student Information
                        </h2>
                        <div className="bg-white rounded-lg shadow p-4 flex gap-4 items-center mb-6 md:p-6 md:rounded-xl md:shadow-md">
                            <img
                                src={submission.student.image}
                                alt={submission.student.name}
                                className="w-16 h-16 rounded-full object-cover md:w-20 md:h-20"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800 md:text-lg">
                                    {submission.student.name}
                                </h3>
                                <p className="text-sm text-gray-500 md:text-base">
                                    🎓 {submission.student.class}
                                </p>
                                <p className="text-sm text-gray-500 md:text-base">
                                    📝 Submission ID: {submission.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* MCQ Answers */}
                    <div>
                        <h2 className="text-blue-800 font-semibold mb-2 md:text-xl">
                            MCQ Answers
                        </h2>
                        <div className="space-y-3 mb-8 md:space-y-4">
                            {submission.answers.map((ans, i) => (
                                <div
                                    key={ans.qid}
                                    className="bg-white rounded-lg shadow p-3 flex flex-col md:p-5 md:rounded-xl md:shadow-sm"
                                >
                                    <span className="text-sm text-gray-600 md:text-base">
                                        {i + 1}. Question ID: {ans.qid}
                                    </span>
                                    <span className="text-gray-900 font-medium md:text-lg">
                                        Selected Option: {ans.option}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reject Button */}
                    <button
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow md:py-4 md:text-lg md:rounded-xl hover:bg-red-600 transition"
                        onClick={() => alert('Assignment Rejected')}
                    >
                        ❌ Reject Assignment
                    </button>
                </div>
            </main>
        </div>
    );
}
