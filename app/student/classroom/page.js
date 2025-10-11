"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudentSubjects } from "@/services/classroomService/studentClassroomApi";
import { sessionService } from "@/services/sessionService";

export default function SubjectsPage() {
    const router = useRouter();
    const [subjects, setSubjects] = useState([])
    const [user, setUser] = useState({});
    const [assignementCount, setAssignmentCount] = useState(0)

    useEffect(() => {
        let u = sessionService.getUser()
        setUser(u)
    }, [])
    useEffect(() => {
        getStudentSubjects().then((res) => {
            setSubjects(res.data.subjects)
            setAssignmentCount(res.data.submittedAssignmentsCount)
        })
    }, [])


    return (
        <div className="flex flex-col min-h-screen bg-[#f6f8fb]">
            <main className="flex-1 px-5  md:px-16 md:py-1">
                <div className="max-w-5xl mx-auto w-full">
                    {/* ===== Subjects Header Row ===== */}
                    <div className="flex justify-between items-center mt-3 mb-6 md:mb-3">
                        <div className="border border-black text-[13px] md:text-[15px] rounded-full px-3 py-[3px] font-medium">
                            Class: {user.className}
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
                            Sec: {user.section}
                        </div>
                    </div>

                    {/* ===== My Classroom Button ===== */}
                    <div className="flex justify-center mb-6 md:mb-8"
                        onClick={() =>
                            router.push(
                                `/student/classroom/studentdashboard`
                            )}
                    >
                        <button className="bg-[#5074b6] text-white font-semibold text-[16px] md:text-[20px] px-6 py-5 text-left rounded-xl cursor-pointer shadow-sm w-full md:w-full">
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
                                        `/student/classroom/${subject._id}?announcements=${subject.announcementsCount}&assignments=${subject.assignmentsCount}&subject=${subject.subjectName}`
                                    )
                                }

                                className="flex justify-between items-center bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.08)] px-6 py-5 md:px-6 md:py-5 cursor-pointer hover:shadow-md transition-all relative"
                            >
                                {/* Subject Name */}
                                <span className="text-[#5074b6] font-semibold text-[16px] md:text-[20px]">
                                    {subject.subjectName}
                                </span>

                                {/* Notification Counts */}
                                {subject.announcementsCount > 0 && subject.assignmentsCount === 0 && (
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-[#38b000] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                        {subject.announcementsCount}
                                    </div>
                                )}

                                {subject.assignmentsCount > 0 && subject.announcementsCount === 0 && (
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-[#e5383b] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                        {subject.assignmentsCount}
                                    </div>
                                )}

                                {subject.announcementsCount > 0 && subject.assignmentsCount > 0 && (
                                    <>
                                        <div className="absolute right-[45px] top-0 bottom-0 flex items-center justify-center bg-[#38b000] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                            {subject.announcementsCount}
                                        </div>
                                        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-[#e5383b] text-white text-[15px] md:text-[17px] font-semibold w-[45px] rounded-r-xl">
                                            {subject.assignmentsCount}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ===== Footer Summary ===== */}
                    <p className="text-center text-[13px] md:text-[15px] text-black font-medium mt-3 md:mt-8">
                        Total Assignments completed by class:{" "}
                        <span className="font-semibold text-[#5074b6]">{assignementCount}</span>
                    </p>
                </div>
            </main>
        </div>
    );
}
