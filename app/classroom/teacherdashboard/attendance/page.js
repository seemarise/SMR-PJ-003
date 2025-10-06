"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle, XCircle, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAttendence, updateAttendence } from "@/services/classroomService/classroomApi";
import Image from "next/image";

function capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


export default function AttendancePage() {
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [attendance, setAttendance] = useState([
    ]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // YYYY-MM-DD format for input[type="date"]
    });
    const [changedAttendence, setChangedAttendence] = useState({})
    const [load, setLoad] = useState(false)

    useEffect(() => {
        getAttendence({ date: selectedDate }).then((res) => {
            setAttendance(res.data?.studentsWithAttendance)
            setChangedAttendence(res.data?.studentsWithAttendance?.reduce((acc, v) => {
                return { ...acc, [v._id]: { studentId: v._id, status: v.attendanceDetails.status } }
            }, {}))
        })
    }, [selectedDate, load])

    const handleSubmitAttendence = () => {
        let param = {
            date: selectedDate,
            attendanceData: Object.values(changedAttendence)
        }
        updateAttendence(param).then(res => {
            setIsEditing(false)
            setLoad(x => !x)
        })
    }



    const toggleStatus = (studentId, status) => {
        setChangedAttendence(p => ({
            ...p, [studentId]: {
                studentId, status
            }
        }))
    };

    return (
        <main className="px-4 py-4 bg-white min-h-screen md:bg-gray-50 md:px-8 md:py-10">
            {/* Centered Container */}
            <div className="md:max-w-5xl md:mx-auto">
                {/* Header */}
                <div className="relative flex items-center justify-between mb-6 md:mb-10">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                    </button>

                    {/* Centered Title */}
                    <div className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="text-xl md:text-3xl font-bold text-[#5074b6]">
                            Student Attendance
                        </h1>
                    </div>

                    {/* Edit / Save Controls */}
                    <div className="flex gap-4 items-center ml-auto">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1 md:p-2"
                            >
                                <Pencil className="w-5 h-5 text-[#5074b6] hover:scale-110 transition md:w-6 md:h-6" />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-red-500 font-medium hover:underline text-sm md:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitAttendence}
                                    className="text-[#5074b6] font-medium hover:underline text-sm md:text-base"
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Date Selector (Now with input type="date") */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between mb-6 md:p-6 md:rounded-2xl md:bg-blue-50 md:border-blue-100">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Date</p>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="font-semibold text-gray-800 text-base md:text-lg bg-transparent focus:outline-none cursor-pointer"
                            />
                        </div>
                    </div>
                    <span className="text-gray-400 text-lg md:text-xl">▾</span>
                </div>

                {/* Student List */}
                <div className="space-y-4 md:max-w-4xl md:mx-auto">
                    {attendance.map((student) => (
                        <div
                            key={student._id}
                            className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition md:p-5"
                        >
                            <div className="flex items-center gap-3">
                                <Image
                                    src={student.profileImage}
                                    width={35}
                                    height={35}
                                    alt={student.name}
                                    className="w-12 h-12 rounded-full object-cover border border-gray-200 md:w-14 md:h-14"
                                />
                                <p className="font-semibold text-gray-800 text-base md:text-lg">
                                    {student.name}
                                </p>
                            </div>

                            {/* Attendance Status */}
                            {!isEditing ? (
                                <div
                                    className={`px-3 py-1 rounded-full border font-medium text-sm md:text-base flex items-center gap-1 ${student.attendanceDetails.status === "present"
                                        ? "text-green-600 border-green-400 bg-green-50"
                                        : "text-red-500 border-red-400 bg-red-50"
                                        }`}
                                >
                                    {student.attendanceDetails.status === "present" ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <XCircle className="w-4 h-4" />
                                    )}
                                    {capitalize(student.attendanceDetails.status)}
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => toggleStatus(student._id, "present")}
                                        className={`p-2 rounded-full border transition ${changedAttendence[student._id]?.status === "present"
                                            ? "bg-green-500 border-green-500 text-white"
                                            : "border-green-400 text-green-500 hover:bg-green-50"
                                            }`}
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(student._id, "absent")}
                                        className={`p-2 rounded-full border transition ${changedAttendence[student._id]?.status === "absent"
                                            ? "bg-red-500 border-red-500 text-white"
                                            : "border-red-400 text-red-500 hover:bg-red-50"
                                            }`}
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
