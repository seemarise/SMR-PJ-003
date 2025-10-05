"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Info, BookOpen, GraduationCap, SquarePen } from "lucide-react";

export default function EditAnnouncementPage() {
    const router = useRouter();
    const { class: classNum, section, subject, id } = useParams();

    // Dummy data fetching simulation
    const [announcement, setAnnouncement] = useState({
        title: "",
        description: "",
    });

    // Simulate fetching announcement by ID
    useEffect(() => {
        // You can replace this with real API call
        const dummy = {
            title: "English lab",
            description: "English lab\nday : Monday\nsession 2",
        };
        setAnnouncement(dummy);
    }, [id]);

    const handleUpdate = () => {
        // Here you can call your PUT API to update the announcement
        console.log("Updated announcement:", announcement);
        router.push(
            `/classroom/${classNum}/${section}/${subject}/announcements`
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4  bg-white shadow-sm md:px-8">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                </button>
                <h1 className="text-lg font-bold text-[#5074b6] md:text-2xl">
                    Edit Announcement
                </h1>
                <div className="w-6" />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 md:flex md:justify-center md:items-start">
                <div className="w-full max-w-xl bg-white md:rounded-2xl md:shadow-lg md:p-8 p-4">
                    {/* Info Box */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Info className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-gray-700 text-sm md:text-base">
                                    Editing announcement for:
                                </p>
                                <div className="mt-2 space-y-1 text-sm md:text-base">
                                    <div className="flex items-center gap-2 text-gray-800">
                                        <GraduationCap className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium">Class {classNum}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-800">
                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium">Section {section}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#5074b6]">
                                        <SquarePen className="w-4 h-4" />
                                        <span className="font-semibold">{subject}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Announcement Title
                            </label>
                            <input
                                type="text"
                                value={announcement.title}
                                onChange={(e) =>
                                    setAnnouncement({ ...announcement, title: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter title"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Announcement Description
                            </label>
                            <textarea
                                rows="5"
                                value={announcement.description}
                                onChange={(e) =>
                                    setAnnouncement({ ...announcement, description: e.target.value })
                                }
                                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter description"
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={handleUpdate}
                        className="w-full mt-8 bg-[#5074b6] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Update Announcement
                    </button>
                </div>
            </main>
        </div>
    );
}
