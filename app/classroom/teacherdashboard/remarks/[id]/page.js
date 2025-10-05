"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, MessageSquare } from "lucide-react";
import { getRemarks } from "@/services/classroomService/remarkApi";
import { getPeople } from "@/services/classroomService/classroomApi";
import Image from "next/image";

export default function StudentRemarkDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [students, setStudents] = useState([])

    useEffect(() => {
        getPeople().then((res) => {
            setStudents(res.data.students)
        })
    }, [])
    const [remark, setRemark] = useState("");
    const [remarksHistory, setRemarksHistory] = useState([]);
    const student = students.find(student => student._id == id)
    useEffect(() => {
        getRemarks({ studentId: id }).then(res => {

        })
    }, [])

    const handleSubmit = () => {
        if (!remark.trim()) return;
        setRemarksHistory((prev) => [
            ...prev,
            { text: remark, date: new Date().toLocaleString() },
        ]);
        setRemark("");
    };

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-4 md:px-8 md:py-10">
                {/* Centered container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-8">
                    {/* Header */}
                    <div className="relative flex items-center justify-between md:justify-center">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:absolute md:left-0 md:p-3 md:shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-700 md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-lg font-bold text-blue-800 md:text-3xl text-center">
                            Student Remarks
                        </h1>

                        <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:absolute md:right-0 md:p-3 md:shadow-sm">
                            <RefreshCw className="w-5 h-5 text-blue-700 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Student Info */}
                    {student && (
                        <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3 shadow-sm md:bg-white md:border md:border-blue-100 md:p-5">
                            <Image
                                src={student.profileImage}
                                alt={student.name}
                                width={100}
                                height={100}
                                className="w-14 h-14 rounded-full border-2 border-blue-300 object-cover md:w-16 md:h-16"
                            />
                            <h2 className="font-semibold text-gray-800 text-lg md:text-2xl">
                                {student.name}
                            </h2>
                        </div>
                    )}

                    {/* Add Remark Section */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mt-4 md:p-6 md:shadow-md">
                        <h3 className="font-semibold text-blue-800 text-base md:text-xl mb-3">
                            Add a New Remark
                        </h3>
                        <textarea
                            placeholder="Write your remark here..."
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base md:rounded-xl md:p-4 resize-none"
                            rows={4}
                        />
                        <button
                            onClick={handleSubmit}
                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm md:text-base md:px-6 md:py-3 md:rounded-xl transition"
                        >
                            Submit Remark
                        </button>
                    </div>

                    {/* Remarks History */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-blue-800 text-base md:text-xl">
                                Remarks History
                            </h3>
                            <RefreshCw className="w-4 h-4 text-gray-500 md:w-5 md:h-5 cursor-pointer" />
                        </div>

                        {/* No remarks yet */}
                        {remarksHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-500">
                                <MessageSquare className="w-10 h-10 mb-2 opacity-50 md:w-12 md:h-12" />
                                <p className="font-semibold text-sm md:text-lg">
                                    No Remarks Found
                                </p>
                                <p className="text-xs md:text-sm">
                                    No remarks have been added for this student yet.
                                </p>
                            </div>
                        ) : (
                            <div className="mt-4 space-y-3">
                                {remarksHistory.map((r, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm md:p-4 md:rounded-xl"
                                    >
                                        <p className="text-gray-800 text-sm md:text-base">
                                            {r.text}
                                        </p>
                                        <span className="text-gray-400 text-xs md:text-sm block mt-1">
                                            {r.date}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
