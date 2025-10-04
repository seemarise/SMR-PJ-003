"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RotateCw, Info, UserRound, Send } from "lucide-react";

export default function CommentsPage() {
    const router = useRouter();
    const { classId, section, subject, id } = useParams();

    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Prakasavalli",
            avatar: "/user.png",
            text: "Hey everyone! Don’t forget the English lab tomorrow.",
            time: "49 minutes ago",
        },
        {
            id: 2,
            author: "Student A",
            avatar: "/user.png",
            text: "Got it, ma’am!",
            time: "20 minutes ago",
        },
    ]);
    const [input, setInput] = useState("");

    const handleAddComment = () => {
        if (!input.trim()) return;
        setComments([
            ...comments,
            {
                id: comments.length + 1,
                author: "You",
                avatar: "/user.png",
                text: input,
                time: "Just now",
            },
        ]);
        setInput("");
    };

    const handleRefresh = () => {
        console.log("Comments refreshed");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10 pb-28 md:pb-32">
                <div className="md:max-w-5xl md:mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-blue-700 md:text-3xl">
                            Comments
                        </h1>

                        <button
                            onClick={handleRefresh}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                        >
                            <RotateCw className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Announcement Info */}
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 md:px-5 md:py-3">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-700 md:text-base">
                            Announcement: <strong>English Lab</strong>
                        </span>
                    </div>

                    {/* Comments */}
                    <div className="space-y-4 md:space-y-6 mt-6">
                        {comments.map((c) => (
                            <div
                                key={c.id}
                                className="bg-white rounded-lg shadow p-4 md:p-6 flex gap-3 items-start"
                            >
                                <img
                                    src={c.avatar}
                                    alt={c.author}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-800">{c.author}</h4>
                                        <span className="text-xs text-gray-400">{c.time}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm md:text-base mt-1 whitespace-pre-line">
                                        {c.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* ✅ Footer (Fixed for both mobile + desktop) */}
            <footer
                className="fixed bottom-0 left-0 right-0 bg-white flex items-center gap-3 px-4 py-3 md:px-8 md:py-4 shadow-sm pb-1"

            >
                <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 md:py-3 max-w-5xl mx-auto">
                    <UserRound className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 bg-transparent outline-none text-sm md:text-base"
                    />
                </div>
                <button
                    onClick={handleAddComment}
                    className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition"
                >
                    <Send size={18} />
                </button>
            </footer>
        </div>
    );
}
