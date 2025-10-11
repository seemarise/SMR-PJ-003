"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AssignmentsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("pending");
    const { subject } = useParams();

    const pendingAssignments = [
        {
            id: 1,
            title: "Python",
            subtitle: "Scope",
            dueDate: "27/09/2025",
        },
        {
            id: 2,
            title: "The Path of Learning",
            subtitle: "Poem",
            dueDate: "09/10/2025",
        },
    ];

    const completedAssignments = [];

    const handleAttemptClick = (id) => {
        // You can later make 'English' dynamic using useParams()
        router.push(`/student/classroom/${subject}/assignments/${id}/attempt`);
    };

    const handleCommentClick = (id) => {
        router.push(`/student/classroom/${subject}/assignments/${id}/comment`)
    }

    const assignments =
        activeTab === "pending" ? pendingAssignments : completedAssignments;

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="flex-1 px-5 py-3 md:px-8 md:py-10">
                {/* ===== Desktop Container for Centering ===== */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* ===== Header ===== */}
                    <div className="flex items-center justify-between relative mb-6 md:mb-8">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm cursor-pointer"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-[21px] md:text-[30px] font-bold text-[#5074b6]">
                                Assignments
                            </h1>
                        </div>

                        <div className="w-8 h-8 md:w-10 md:h-10"></div>
                    </div>

                    {/* ===== Toggle Buttons ===== */}
                    <div className="flex justify-center mb-6 md:mb-10">
                        <div className="flex w-[85%] md:w-[50%] bg-white rounded-full shadow-md overflow-hidden md:shadow-sm">
                            <button
                                className={`flex-1 py-2 text-[15px] font-medium rounded-full cursor-pointer transition-all ${activeTab === "pending"
                                    ? "bg-black text-white"
                                    : "text-black bg-white"
                                    }`}
                                onClick={() => setActiveTab("pending")}
                            >
                                Pending
                            </button>
                            <button
                                className={`flex-1 py-2 text-[15px] font-medium rounded-full cursor-pointer transition-all ${activeTab === "completed"
                                    ? "bg-black text-white"
                                    : "text-black bg-white"
                                    }`}
                                onClick={() => setActiveTab("completed")}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    {/* ===== Section Title ===== */}
                    {activeTab === "pending" && (
                        <h2 className="text-[18px] md:text-[22px] font-semibold text-[#d62828] mb-4 md:mb-8 text-center md:text-left md:w-[60%] md:mx-auto">
                            To do:
                        </h2>
                    )}

                    {/* ===== Assignment Cards ===== */}
                    {assignments.length > 0 ? (
                        <div className="flex flex-col gap-5 md:gap-6 md:w-[60%] md:mx-auto">
                            {assignments.map((a, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#b15a5a] text-white rounded-2xl p-4 shadow-sm md:p-6 md:flex md:justify-between md:items-center md:border-2 md:border-gray-100 md:hover:shadow-md md:transition-all"
                                >
                                    {/* Left Side */}
                                    <div>
                                        <h3 className="text-[17px] md:text-[20px] font-semibold text-gray-900">
                                            {a.title}
                                        </h3>
                                        <p className="text-[14px] md:text-[16px] text-gray-900 mb-3 md:mb-4">
                                            {a.subtitle}
                                        </p>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleAttemptClick(a.id)}
                                                className="bg-white text-black font-medium px-5 py-1.5 rounded-full text-[14px] md:text-[15px] cursor-pointer shadow-sm">
                                                Attempt
                                            </button>
                                            <button className="border border-white text-white font-medium px-5 py-1.5 rounded-full cursor-pointer text-[14px] md:text-[15px]"
                                                onClick={() => handleCommentClick(a.id)}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </div>

                                    {/* Divider & Due Date */}
                                    <div className="hidden md:block w-px h-20 bg-black mx-6" />
                                    <div className="mt-3 md:mt-0 md:text-right border-t border-black md:border-t-0 md:border-l md:pl-4">
                                        <p className="text-[15px] md:text-[16px] font-medium text-gray-900">
                                            Due Date:
                                        </p>
                                        <p className="text-[15px] md:text-[16px] text-gray-900 font-semibold">
                                            {a.dueDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center mt-16 md:mt-24">
                            <p className="text-gray-600 text-[16px] md:text-[18px] font-medium text-center">
                                Hmm... nothing here yet! Try again?
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
