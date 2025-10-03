"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Megaphone, ClipboardList, BookOpen, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubjectPage({ params }) {
    const router = useRouter();
    const { class: className, section, subject } = React.use(params);

    const items = [
        { name: "Announcements", icon: Megaphone, href: "announcements" },
        { name: "Assignments", icon: ClipboardList, href: "assignments" },
        { name: "Resources", icon: BookOpen, href: "resources" },
        { name: "Performance", icon: BarChart3, href: "performance" },
    ];

    return (
        <main className="px-4 py-6 bg-white min-h-screen relative">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                aria-label="Go back"
            >
                <ArrowLeft className="w-5 h-5 text-blue-600" />
            </button>

            {/* Subject Title */}
            <h1 className="text-2xl font-semibold text-center text-blue-800 mb-4">
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </h1>

            {/* Class Info Box */}
            <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3 mb-6 shadow-sm">
                <div>
                    <p className="text-sm font-semibold text-gray-800">Class {className}</p>
                    <p className="text-xs text-gray-500">Section {section.toUpperCase()}</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                    <BookOpen className="text-blue-600 w-5 h-5" />
                </div>
            </div>

            {/* Subject Management Title */}
            <p className="text-blue-700 font-semibold mb-3">Subject Management</p>

            {/* Management Options */}
            <div className="flex flex-col space-y-5">
                {items.map(({ name, icon: Icon, href }) => (
                    <Link
                        key={name}
                        href={`/classroom/${className}/${section}/${subject}/${href}`}
                    >
                        <div className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50">
                                    <Icon className="text-blue-600 w-5 h-5" />
                                </div>
                                <span className="font-medium text-gray-700">{name}</span>
                            </div>
                            <span className="text-gray-400 text-xl">›</span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
