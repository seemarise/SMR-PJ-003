"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    MessageSquare,
    Plus,
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";
import { deleteAnnouncement, getAllAnnouncements } from "@/services/classroomService/announcementApi";
import Image from "next/image";
import Link from "next/link";

export default function AnnouncementsPage({ params }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    let { class: className, section, subject } = React.use(params)

    // ✅ get query params
    const classId = searchParams.get("class");
    const sectionId = searchParams.get("section");
    const subjectId = searchParams.get("subject");

    // state
    const [announcements, setAnnouncements] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    // fetch announcements
    const fetchAnnouncements = async (page) => {
        if (loading || !hasMore) return;
        setLoading(true);

        let params = {
            pageNumber: page,
            pageSize: 10,
            subjectId,
            classId,
            sectionId,
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

    // Scroll listener for infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 50 >=
                document.documentElement.offsetHeight
            ) {
                if (hasMore && !loading) {
                    setPageNumber((prev) => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);

    // Fetch on pageNumber change
    useEffect(() => {
        if (pageNumber > 1) {
            fetchAnnouncements(pageNumber);
        }
    }, [pageNumber]);

    // Detect mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openOptions = (id, e) => {
        const rect = e.target.getBoundingClientRect();
        setPopupPosition({ top: rect.bottom + 4, left: rect.left - 150 });
        setSelectedId(id);
        setShowOptions(true);
    };

    const closeOptions = () => {
        setShowOptions(false);
        setSelectedId(null);
    };

    const handleEdit = () => {
        if (selectedId) {
            let annc = announcements.find(x => x._id == selectedId)
            router.push(
                `/classroom/${className}/${section}/${subject}/announcements/${selectedId}/edit?classId=${classId}&sectionId=${sectionId}&subjectId=${subjectId}&title=${annc.title}&description=${annc.description}`
            );
            closeOptions();
        }
    };

    const handleDelete = () => {
        if (selectedId) {
            setAnnouncements((prev) => prev.filter((a) => a._id !== selectedId));
            deleteAnnouncement(selectedId)
            closeOptions();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-blue-700 md:text-3xl">
                            Announcements
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Announcements List */}
                    <div className="space-y-4 md:space-y-6">
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
                                        <button
                                            onClick={(e) => openOptions(a._id, e)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <MoreVertical
                                                size={18}
                                                className="text-gray-600"
                                            />
                                        </button>
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
                                    className="flex justify-start items-center gap-1 mt-4 text-blue-600 text-sm md:text-base hover:underline cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/classroom/${className}/${section}/${subject}/announcements/${a._id}/comments`
                                        )
                                    }
                                >
                                    <MessageSquare size={16} />
                                    Comments
                                </div>
                            </div>
                        ))}
                    </div>

                    {loading && <p className="text-gray-500">Loading...</p>}
                    {!hasMore && (
                        <p className="text-gray-400 text-center mt-4">
                            No more announcements
                        </p>
                    )}

                    {/* Floating Add Button */}
                    <button
                        onClick={() =>
                            router.push(
                                `/classroom/${className}/${section}/${subject}/announcements/create?classId=${classId}&sectionId=${sectionId}&subjectId=${subjectId}`
                            )
                        }
                        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 transition md:p-5 md:bottom-10 md:right-10"
                    >
                        <Plus />
                    </button>

                </div>
            </main>

            {/* Overlay Options */}
            {showOptions && (
                <div
                    className="fixed inset-0 bg-white/40 flex items-end justify-center z-50 md:items-start md:justify-start"
                    onClick={closeOptions}
                >
                    {isMobile ? (
                        <div
                            className="bg-white w-full rounded-t-2xl p-6 space-y-4 shadow-lg animate-slide-up md:hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 text-center">
                                Announcement Options
                            </h3>

                            <button
                                onClick={handleEdit}
                                className="flex items-center justify-center gap-2 w-full py-3 text-blue-600 font-medium border-b border-gray-200"
                            >
                                <Pencil size={18} />
                                Edit Announcement
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex items-center justify-center gap-2 w-full py-3 text-red-600 font-medium"
                            >
                                <Trash2 size={18} />
                                Delete Announcement
                            </button>
                        </div>
                    ) : (
                        <div
                            style={{
                                position: "absolute",
                                top: popupPosition.top,
                                left: popupPosition.left,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white shadow-xl rounded-xl p-2 w-52 animate-fade-in"
                        >
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded-lg text-blue-600 text-sm font-medium"
                            >
                                <Pencil size={16} /> Edit Announcement
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600 text-sm font-medium"
                            >
                                <Trash2 size={16} /> Delete Announcement
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
