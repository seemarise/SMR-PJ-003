"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Plus, Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const router = useRouter();

    return (
        <main className="px-4 py-4 bg-white min-h-screen relative">
            {/* Header with Back + Title + Add */}
            <div className="flex justify-between items-center mb-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                    <ArrowLeft size={22} className="text-gray-700" />
                </button>

                <h1 className="text-xl font-semibold text-blue-600">Announcements</h1>

                {/* Add Button */}
                <Link
                    href="announcements/create"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                    <Plus size={20} />
                </Link>
            </div>

            {/* Class Section Header */}
            <div className="flex items-center gap-2 text-gray-600 mb-6">
                <span className="text-sm">📘 Class</span>
                <span className="text-sm">• Section</span>
            </div>

            {/* If no announcements */}
            {announcements.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-20">
                    <div className="bg-blue-50 rounded-full p-6 mb-4">
                        <Megaphone className="text-blue-600 w-10 h-10" />
                    </div>
                    <h2 className="text-blue-600 font-semibold text-lg mb-1">
                        No Announcements Yet
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Create your first announcement for this subject
                    </p>
                    <Link
                        href="announcements/create"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        + Create Announcement
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map((a, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-2"
                        >
                            <h3 className="font-semibold text-blue-600">{a.title}</h3>
                            <p className="text-gray-700">{a.description}</p>
                            {a.image && (
                                <img
                                    src={URL.createObjectURL(a.image)}
                                    alt="announcement"
                                    className="rounded-lg mt-2"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Action Button */}
            <Link
                href="announcements/create"
                className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
            >
                <Plus size={24} />
            </Link>
        </main>
    );
} 
