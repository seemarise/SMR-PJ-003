"use client";

import React from "react";
import { ArrowLeft, MessageSquare, Users, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnnouncementPage() {
    const router = useRouter();

    const announcements = [
        {
            id: 1,
            teacher: "Prakasavalli",
            time: "7 days ago",
            title: "English lab",
            content: "English lab\nday : Monday\nsession 2",
        },
        {
            id: 2,
            teacher: "Prakasavalli",
            time: "7 days ago",
            title: "holiday details",
            content: "September 27th to Oct 6th",
        },
        {
            id: 3,
            teacher: "Prakasavalli",
            time: "7 days ago",
            title: "Holiday Homework",
            content: "Do the homework as we discussed",
        },
    ];

    return (
        <main className="min-h-screen bg-white md:bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 shadow-sm border-b bg-white md:px-10 md:py-5 md:shadow-md md:sticky md:top-0">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                >
                    <ArrowLeft className="w-5 h-5 text-blue-700 md:w-6 md:h-6" />
                </button>

                {/* Title */}
                <h1 className="text-lg font-bold text-blue-800 truncate md:text-3xl md:font-semibold">
                    Classroom Announcements
                </h1>

                {/* Add Button */}
                <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition md:p-3">
                    <Plus className="text-white w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

            {/* Subheader */}
            <div className="bg-blue-50 py-2 px-5 border-b border-blue-100 md:py-4 md:px-10">
                <p className="text-gray-600 text-sm md:text-base flex items-center gap-2">
                    <span className="text-blue-600">📢</span>
                    Announcements for all your classes
                </p>
            </div>

            {/* Announcement List */}
            <div className="p-4 space-y-4 md:max-w-4xl md:mx-auto md:py-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                {announcements.map((a) => (
                    <div
                        key={a.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition"
                    >
                        {/* Teacher Info */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/teacher1.png"
                                    alt={a.teacher}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm md:text-base">
                                        {a.teacher}
                                    </p>
                                    <p className="text-gray-400 text-xs md:text-sm">{a.time}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">⋮</button>
                        </div>

                        {/* Title & Content */}
                        <div className="mb-4 whitespace-pre-line">
                            <h2 className="font-semibold text-gray-900 text-base md:text-lg mb-1">
                                {a.title}
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base leading-snug">
                                {a.content}
                            </p>
                        </div>

                        {/* Footer (Comments + Class Info) */}
                        <div className="flex items-center justify-between text-sm text-blue-600">
                            <div className="flex items-center gap-1 cursor-pointer hover:underline">
                                <MessageSquare className="w-4 h-4" />
                                Comments
                            </div>
                            <div className="flex items-center gap-1 text-blue-400">
                                <Users className="w-4 h-4" />
                                All Classes
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Add Button (mobile only) */}
            <button className="fixed bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition md:hidden">
                <Plus className="text-white w-6 h-6" />
            </button>
        </main>
    );
}
