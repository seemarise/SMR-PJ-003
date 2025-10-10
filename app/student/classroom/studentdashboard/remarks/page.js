"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sessionService } from "@/services/sessionService";
import { getStudentClassroomRemark } from "@/services/classroomService/studentClassroomApi";
import moment from "moment";

export default function RemarksPage() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [remarks, setRemark] = useState([])

    useEffect(() => {
        let u = sessionService.getUser();
        setUser(u);
        getStudentClassroomRemark().then((res) => {
            setRemark(res.data.remarks)
        })
    }, []);
    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
                {/* Centered Container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header Row */}
                    <div className="relative flex items-center justify-between">
                        <div
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm cursor-pointer"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-lg font-bold text-[#5074b6] md:text-3xl">
                                Remarks
                            </h1>
                        </div>
                    </div>


                    {/* Remarks List */}
                    <div className="mt-6 md:mt-10">
                        <div className="flex flex-col gap-4">
                            {remarks.map((remark) => (
                                <div
                                    key={remark.id}
                                    className="bg-white rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.08)] overflow-hidden"
                                >
                                    {/* Header Row */}
                                    <div className="flex justify-between items-center bg-[#EEF3FB] px-4 py-2 md:px-6 md:py-3">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={remark.senderProfile.profileImage}
                                                alt={remark.senderProfile.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full border border-gray-200"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-[#1C1C1C] text-[15px]">
                                                    {remark.senderProfile.name}
                                                </span>
                                                <span className="text-gray-500 text-sm">
                                                    {moment(remark.remarkedAt).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                            {remark.remarkedOn}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="px-4 py-3 md:px-6 md:py-4 text-gray-800 text-[15px] leading-relaxed">
                                        {remark.remarks}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
