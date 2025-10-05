"use client";

import React from "react";
import Link from "next/link";
import {
    UserRound,
    Megaphone,
    FileText,
    BarChart2,
    BookOpen,
    ArrowLeft,
} from "lucide-react";

export default function TeacherDashboard() {
    const menuItems = [
        {
            title: "Attendance",
            icon: FileText,
            link: "/classroom/teacherdashboard/attendance",
        },
        {
            title: "Announcements",
            icon: Megaphone,
            link: "/classroom/announcements",
        },
        {
            title: "Remarks",
            icon: FileText,
            link: "/classroom/remarks",
        },
        {
            title: "Performance",
            icon: BarChart2,
            link: "/classroom/performance",
        },
        {
            title: "Resources",
            icon: BookOpen,
            link: "/classroom/resources",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10">
                {/* Centered Container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header Row */}
                    <div className="relative flex items-center justify-between">
                        <Link
                            href="/classroom"
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </Link>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-lg font-bold text-blue-800 md:text-3xl">
                                Teacher Dashboard
                            </h1>
                        </div>
                    </div>

                    {/* Teacher Card */}
                    <div className="bg-blue-50 rounded-xl px-4 py-3 mt-3 shadow-sm md:px-6 md:py-5 md:bg-white md:border md:border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src="/teacher-avatar.png"
                                alt="Teacher Avatar"
                                className="w-16 h-16 rounded-full border-2 border-blue-300 md:w-20 md:h-20"
                            />
                            <div>
                                <p className="text-gray-600 text-sm md:text-base">Welcome,</p>
                                <h2 className="font-bold text-lg md:text-2xl text-gray-800">
                                    Prakasavalli
                                </h2>
                                <span className="mt-1 inline-flex items-center bg-white border border-blue-600 text-blue-700 text-sm font-medium px-3 py-1 rounded-lg">
                                    <UserRound className="w-4 h-4 mr-2" />
                                    Class 10 A
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Management Section */}
                    <div>
                        <p className="text-blue-700 mt-3 font-semibold text-base md:text-xl">
                            Classroom Management
                        </p>

                        <div className="flex flex-col gap-4 mt-3 md:grid md:grid-cols-2 md:gap-6">
                            {menuItems.map(({ title, icon: Icon, link }) => (
                                <Link
                                    key={title}
                                    href={link}
                                    className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer md:p-5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 md:w-12 md:h-12">
                                            <Icon className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <span className="font-medium text-gray-700 md:text-lg">
                                            {title}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-xl md:text-2xl">›</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
