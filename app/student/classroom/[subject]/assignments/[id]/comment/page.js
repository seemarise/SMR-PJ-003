"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    RotateCw,
    UserRound,
    Send,
    MessageSquarePlus,
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";
import Image from "next/image";

export default function CommentsPage() {
    const router = useRouter();
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const { subject, id } = useParams();


    // Popup-related states
    const [selectedId, setSelectedId] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAddComment = () => {
        if (commentText.trim() === "") return;

        const newComment = {
            id: Date.now(),
            name: "Sai Prasad N",
            you: true,
            text: commentText,
            time: "Just now",
        };

        setComments((prev) => [...prev, newComment]);
        setCommentText("");
    };

    const handleRefresh = () => {
        // placeholder for reload logic
    };

    // --- Popup Logic ---
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
        alert(`Edit comment with ID: ${selectedId}`);
        closeOptions();
    };

    const handleDelete = () => {
        setComments((prev) => prev.filter((c) => c.id !== selectedId));
        closeOptions();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
            {/* ===== Main Content ===== */}
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10 pb-28 md:pb-32">
                <div className="md:max-w-5xl md:mx-auto">
                    {/* --- Header --- */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 cursor-pointer md:shadow-sm"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                            Comments
                        </h1>

                        {/* <button
                            onClick={handleRefresh}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                        >
                            <RotateCw className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button> */}
                    </div>

                    {/* --- Comments Section --- */}
                    <div className="md:max-w-5xl md:mx-auto md:rounded-xl md:p-8 md:pb-32">
                        {/* No Comments State */}
                        {comments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                                <MessageSquarePlus className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-gray-700 font-semibold text-base mb-1">
                                    No comments yet
                                </p>
                                <p className="text-gray-500 text-sm mb-5">
                                    Be the first to share your thoughts!
                                </p>
                                <button
                                    onClick={() => {
                                        if (commentText.trim() === "")
                                            setCommentText("Sample comment");
                                    }}
                                    className="flex items-center gap-2 bg-[#4A5DC4] cursor-pointer text-white font-medium rounded-full px-5 py-2.5 shadow-sm hover:bg-[#4051a8] transition"
                                >
                                    <MessageSquarePlus className="w-4 h-4" />
                                    Add Comment
                                </button>
                            </div>
                        ) : (
                            // Comments List
                            <div className="flex flex-col gap-4 md:gap-6">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-4 flex flex-col md:p-6 relative"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <Image
                                                    src="/user.png"
                                                    alt="user"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-[15px] font-semibold text-gray-800 md:text-base">
                                                            {comment.name}
                                                        </p>
                                                        {comment.you && (
                                                            <span className="text-[11px] bg-[#E8EDFF] text-[#4A5DC4] px-2 py-0.5 rounded-full font-medium">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 md:text-sm">
                                                        {comment.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) =>
                                                    openOptions(comment.id, e)
                                                }
                                                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer transition"
                                            >
                                                <MoreVertical className="w-4 h-4 text-gray-500 md:w-5 md:h-5" />
                                            </button>
                                        </div>

                                        <p className="text-gray-800 mt-2 ml-12 text-[15px] md:ml-14 md:text-base">
                                            {comment.text}
                                        </p>

                                        <button className="self-end mt-2 text-[13px] text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 flex items-center gap-1 md:text-sm hover:bg-gray-100 transition cursor-pointer"
                                            onClick={() => router.push(`/student/classroom/${subject}/assignments/${id}/comment/reply`)}
                                        >
                                            <MessageSquarePlus className="w-3 h-3 md:w-4 md:h-4" />{" "}
                                            Reply
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ===== Footer (Input) ===== */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white flex items-center gap-3 px-4 py-3 md:px-8 md:py-4 shadow-sm pb-1">
                <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 md:py-2 max-w-5xl mx-auto">
                    <Image
                        src="/user.png"
                        alt="you"
                        width={10}
                        height={10}
                        className="rounded-full object-cover mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base"
                    />
                </div>
                <button
                    onClick={handleAddComment}
                    className="bg-[#5074b6] p-3 rounded-full text-white hover:bg-[#3d5f9b] transition cursor-pointer"
                >
                    <Send size={18} />
                </button>
            </footer>

            {/* ===== Popup Options ===== */}
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
                                Comment Options
                            </h3>

                            <button
                                onClick={handleEdit}
                                className="flex items-center justify-center gap-2 w-full py-3 text-[#5074b6] font-medium border-b border-gray-200 cursor-pointer"
                            >
                                <Pencil size={18} />
                                Edit Comment
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex items-center justify-center gap-2 w-full py-3 text-red-600 font-medium cursor-pointer"
                            >
                                <Trash2 size={18} />
                                Delete Comment
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
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded-lg text-[#5074b6] text-sm font-medium cursor-pointer"
                            >
                                <Pencil size={16} /> Edit Comment
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600 text-sm font-medium cursor-pointer"
                            >
                                <Trash2 size={16} /> Delete Comment
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
