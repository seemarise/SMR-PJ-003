"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SubjectsPage() {
    const router = useRouter();

    const subjects = [
        { name: "Tamil", announcements: 1, assignments: 0 },
        { name: "English", announcements: 12, assignments: 6 },
        { name: "Mathematics", announcements: 2, assignments: 0 },
        { name: "Science", announcements: 0, assignments: 0 },
        { name: "Social Science", announcements: 2, assignments: 1 },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f8fb]">
            <main className="flex-1 px-5  md:px-16 md:py-1">
                <div className="max-w-5xl mx-auto w-full">
                    {/* ===== Subjects Header Row ===== */}
                    <div className="flex justify-between items-center mt-3 mb-6 md:mb-3">
                        <div className="border border-black text-[13px] md:text-[15px] rounded-full px-3 py-[3px] font-medium">
                            Class: 10
                        </div>
                        <div className="text-center">
                            <h2 className="text-[18px] md:text-[26px] font-bold text-black">
                                Subjects
                            </h2>
                            <div className="flex justify-center">
                                <div className="w-[60px] h-[2px] bg-red-500 rounded-full"></div>
                            </div>
                        </div>
                        <div className="border border-black text-[13px] md:text-[15px] rounded-full px-3 py-[3px] font-medium">
                            Sec: A
                        </div>
                    </div>

                    {/* ===== My Classroom Button ===== */}
                    <div className="flex justify-center mb-6 md:mb-8"
                        onClick={() =>
                            router.push(
                                `/student/classroom/studentdashboard`
                            )}
                    >
                        <button className="bg-[#5074b6] text-white font-semibold text-[16px] md:text-[20px] px-6 py-5 text-left rounded-xl shadow-sm w-full md:w-full">
                            My Classroom
                        </button>
                    </div>

                    {/* ===== Subject Cards ===== */}
                    <div className="flex flex-col gap-3 md:gap-5">
                        {subjects.map((subject, idx) => (
                            <div
                                key={idx}
                                onClick={() =>
                                    router.push(
                                        `/student/classroom/${subject.name}?announcements=${subject.announcements}&assignments=${subject.assignments}`
                                    )
                                }

                                className="flex justify-between items-center bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.08)] px-6 py-5 md:px-6 md:py-5 cursor-pointer hover:shadow-md transition-all relative"
                            >
                                {/* Subject Name */}
                                <span className="text-[#5074b6] font-semibold text-[16px] md:text-[20px]">
                                    {subject.name}
                                </span>

                                {/* Notification Counts */}
                                {subject.announcements > 0 && subject.assignments === 0 && (
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-[#38b000] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                        {subject.announcements}
                                    </div>
                                )}

                                {subject.assignments > 0 && subject.announcements === 0 && (
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-[#e5383b] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                        {subject.assignments}
                                    </div>
                                )}

                                {subject.announcements > 0 && subject.assignments > 0 && (
                                    <>
                                        <div className="absolute right-[45px] top-0 bottom-0 flex items-center justify-center bg-[#38b000] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                            {subject.announcements}
                                        </div>
                                        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-[#e5383b] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                            {subject.assignments}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ===== Footer Summary ===== */}
                    <p className="text-center text-[13px] md:text-[15px] text-black font-medium mt-3 md:mt-8">
                        Total Assignments completed by class:{" "}
                        <span className="font-semibold text-[#5074b6]">12</span>
                    </p>
                </div>
            </main>
        </div>
    );
}
