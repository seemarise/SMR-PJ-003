"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";

export default function SubjectDetailPage() {
    const router = useRouter();
    const { subject } = useParams();
    const searchParams = useSearchParams();

    const announcements = Number(searchParams.get("announcements")) || 0;
    const assignments = Number(searchParams.get("assignments")) || 0;

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="flex-1 px-5 py-3 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* ===== Header ===== */}
                    <div className="flex items-center justify-between mb-6 md:mb-8 relative">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-[22px] md:text-[30px] font-bold text-[#5074b6]">
                                {subject}
                            </h1>
                        </div>

                        <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
                            <Users
                                onClick={() =>
                                    router.push(`/student/classroom/${subject}/people`)
                                }
                                className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                        </div>
                    </div>

                    {/* ===== Curriculum Card ===== */}
                    <div className="rounded-2xl border-2 border-[#5074b6] overflow-hidden mb-6 shadow-sm md:w-[80%] md:mx-auto md:mb-10"
                        onClick={() =>
                            router.push(`/student/classroom/${subject}/curriculum`)
                        }>
                        <div className="flex justify-between items-center bg-[#5074b6] px-6 py-5">
                            <span className="text-white text-[20px] font-semibold md:text-[22px]"
                            >
                                Curriculum
                            </span>
                            <span className="text-white text-[15px] md:text-[17px] font-medium border-l border-white pl-4">
                                Learn & Grow
                            </span>
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 mb-6 md:w-[60%] md:mx-auto md:mb-10" />

                    {/* ===== Menu Buttons ===== */}
                    <div className="flex flex-col gap-4 md:gap-5 md:w-[60%] md:mx-auto">
                        {/* Announcements */}
                        <div
                            onClick={() =>
                                router.push(`/student/classroom/${subject}/announcements`)
                            }
                            className="flex justify-between items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-5 cursor-pointer hover:shadow-md transition-all md:p-6 md:w-full"
                        >
                            <span className="font-semibold text-[17px] md:text-[19px] text-gray-800">
                                Announcements
                            </span>
                            {announcements > 0 && (
                                <div className="bg-[#38b000] text-white font-semibold w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[15px] md:text-[16px]">
                                    {announcements}
                                </div>
                            )}
                        </div>

                        {/* Assignments */}
                        <div
                            onClick={() =>
                                router.push(`/student/classroom/${subject}/assignments`)
                            }
                            className="flex justify-between items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-5 cursor-pointer hover:shadow-md transition-all md:p-6 md:w-full"
                        >
                            <span className="font-semibold text-[17px] md:text-[19px] text-gray-800">
                                Assignments
                            </span>
                            {assignments > 0 && (
                                <div className="bg-[#e5383b] text-white font-semibold w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[15px] md:text-[16px]">
                                    {assignments}
                                </div>
                            )}
                        </div>

                        {/* Resources */}
                        <div
                            onClick={() =>
                                router.push(`/student/classroom/${subject}/resources`)
                            }
                            className="flex justify-between items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-5 cursor-pointer hover:shadow-md transition-all md:p-6 md:w-full"
                        >
                            <span className="font-semibold text-[17px] md:text-[19px] text-gray-800">
                                Resources
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
