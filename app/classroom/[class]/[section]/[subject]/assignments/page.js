"use client";

import { useRouter } from "next/navigation";

export default function AssignmentsPage() {
    const router = useRouter();

    // Mock data (replace with API later)
    const assignments = [
        {
            id: 1,
            title: "por,M",
            dueDate: "Oct 10, 2025",
            tags: ["kh"],
            submissions: 1,
        },
        {
            id: 2,
            title: "Flutter",
            dueDate: "Oct 08, 2025",
            tags: ["Flutter", "Dart"],
            submissions: 0,
        },
        {
            id: 3,
            title: "Test Upload Image",
            dueDate: "Oct 08, 2025",
            tags: ["asdasd"],
            submissions: 0,
        },
    ];

    return (
        <main className="px-4 py-4 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => router.back()} className="text-2xl">←</button>
                <h1 className="text-xl font-bold text-blue-700">Assignments</h1>
                <div className="w-6" />
            </div>

            {/* Assignment Cards */}
            <div className="space-y-4">
                {assignments.map((a) => (
                    <div key={a.id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">
                                Due: {a.dueDate}
                            </span>
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                Active
                            </span>
                        </div>

                        <h2 className="font-semibold text-gray-800">{a.title}</h2>

                        {/* Tags */}
                        <div className="flex gap-2 mt-2">
                            {a.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                            <span>👤 {a.submissions} submissions</span>
                            <div className="flex gap-3">
                                <button className="text-blue-500">✏️</button>
                                <button className="text-red-500">🗑️</button>
                                <button
                                    onClick={() => router.push(`assignments/${a.id}`)} // relative path ✅
                                    className="text-blue-600 text-xl"
                                >
                                    ➡
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => router.push("/assignments/create")}
                className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-3xl hover:bg-blue-700 active:scale-95 transition-all"
            >
                +
            </button>

        </main>
    );
}
