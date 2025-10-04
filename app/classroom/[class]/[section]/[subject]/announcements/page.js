"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Plus, Megaphone, GraduationCap } from "lucide-react";

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="px-4 py-4 flex-1 relative md:px-8 md:py-10">
                {/* Page Container (centers content on desktop) */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">

                    {/* Header with Back + Title + Add */}
                    <div className="flex justify-between items-center mb-6 md:mb-10">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        {/* Page Title */}
                        <h1 className="text-xl font-semibold text-blue-600 md:text-3xl md:font-bold">
                            Announcements
                        </h1>

                        {/* Add Button */}
                        <Link
                            href="announcements/create"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 md:w-11 md:h-11 md:shadow-sm"
                        >
                            <Plus className="md:w-6 md:h-6" size={20} />
                        </Link>
                    </div>

                    {/* Class Section Header */}
                    <div className="flex items-center gap-2 text-gray-600 mb-6 md:mb-8">
                        <span className="text-sm flex justify-center items-center gap-0.5 md:text-base">
                            <GraduationCap className="md:w-5 md:h-5" /> Class
                        </span>
                        <span className="text-sm md:text-base">• Section</span>
                    </div>

                    {/* If no announcements */}
                    {announcements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center mt-20 md:mt-28">
                            <div className="bg-blue-50 rounded-full p-6 mb-4 md:p-8">
                                <Megaphone className="text-blue-600 w-10 h-10 md:w-14 md:h-14" />
                            </div>
                            <h2 className="text-blue-600 font-semibold text-lg mb-1 md:text-2xl">
                                No Announcements Yet
                            </h2>
                            <p className="text-gray-500 text-sm mb-6 md:text-base md:mb-8">
                                Create your first announcement for this subject
                            </p>
                            <Link
                                href="announcements/create"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition md:px-8 md:py-3 md:text-lg"
                            >
                                + Create Announcement
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4 md:space-y-6">
                            {announcements.map((a, i) => (
                                <div
                                    key={i}
                                    className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-2 md:p-6 md:border-gray-200 md:hover:shadow-md md:transition-all"
                                >
                                    <h3 className="font-semibold text-blue-600 md:text-xl">
                                        {a.title}
                                    </h3>
                                    <p className="text-gray-700 md:text-base">{a.description}</p>
                                    {a.image && (
                                        <img
                                            src={URL.createObjectURL(a.image)}
                                            alt="announcement"
                                            className="rounded-lg mt-2 md:mt-4 md:max-h-80 object-cover"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Action Button (mobile only) */}
                <Link
                    href="announcements/create"
                    className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition md:hidden"
                >
                    <Plus size={24} />
                </Link>
            </main>
        </div>
    );
}
