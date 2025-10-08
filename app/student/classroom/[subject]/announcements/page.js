"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquare, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sessionService } from "@/services/sessionService";
import { deleteAnnouncement, getAllAnnouncements } from "@/services/classroomService/announcementApi";

export default function AnnouncementPage() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [announcements, setAnnouncements] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);


    const fetchAnnouncements = async (page) => {
        if (loading || !hasMore) return;
        setLoading(true);

        let params = {
            pageNumber: page,
            pageSize: 10,
        };

        try {
            const res = await getAllAnnouncements(params);
            const newData = res.data?.announcements || [];

            if (newData.length > 0) {
                setAnnouncements((prev) => [...prev, ...newData]);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching announcements:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchAnnouncements(pageNumber);
    }, []);


    useEffect(() => {
        let u = sessionService.getUser();
        setUser(u);
    }, []);



    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
                {/* Centered Container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header Row */}
                    <div className="relative flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>
                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-lg font-bold text-[#5074b6] md:text-3xl">
                                Announcement
                            </h1>
                        </div>
                    </div>
                    {/* Announcements List */}
                    <div className="space-y-4 mt-2 md:space-y-6">
                        {announcements.map((a, i) => (
                            <div
                                key={a._id + "-" + i}
                                className="bg-white rounded-lg shadow p-4 md:p-6 md:rounded-xl relative"
                            >
                                {/* Author and menu */}
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                                        <Image
                                            src={
                                                a.senderProfile?.profileImage
                                            }
                                            alt="Teacher Profile"
                                            height={35}
                                            width={35}
                                            className="rounded-full object-cover md:w-10 md:h-10"
                                        />
                                        <span>{a.senderProfile?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 md:text-sm">
                                            {a.time}
                                        </span>
                                        {/* <button
                                            onClick={(e) => openOptions(a._id, e)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <MoreVertical
                                                size={18}
                                                className="text-gray-600"
                                            />
                                        </button> */}
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="font-semibold text-gray-800 md:text-xl">
                                    {a.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-700 whitespace-pre-line text-sm md:text-base mt-2">
                                    {a.description}
                                </p>

                                {/* Footer */}
                                <div
                                    className="flex justify-start items-center gap-1 mt-4 text-[#5074b6] text-sm md:text-base hover:underline cursor-pointer"

                                >
                                    <MessageSquare size={16} />
                                    Comments
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </main>
        </div>
    );
}
