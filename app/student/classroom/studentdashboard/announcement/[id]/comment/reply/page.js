"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, RotateCw, Send } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { addReplyToComment, getAllReply } from "@/services/classroomService/commentApi";
import { sessionService } from "@/services/sessionService";

export default function RepliesPage() {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [user] = useState(sessionService.getUser())
    const [replies, setReplies] = useState([])
    const [load, setLoad] = useState(false)
    const commentId = useSearchParams().get("comment")

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        getAllReply(commentId, {}).then(res => {
            setReplies(res.data.replies)
        })
    }, [load])




    const [replyText, setReplyText] = useState("");

    const handleSend = () => {
        if (!replyText.trim()) return;
        addReplyToComment({
            commentId,
            reply: replyText
        }).then(res => {
            setLoad(x => !x)
            setReplyText("");
        })

    };

    const comment = {}

    const handleRefresh = () => {
        setLoad(x => !x)
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
            {/* ===== Main Content ===== */}
            <main className="px-4 py-2 flex-1 pb-28 md:pb-32">
                <div className="md:max-w-5xl md:mx-auto">
                    {/* ===== Header (Matching CommentsPage) ===== */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm cursor-pointer"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                            Replies
                        </h1>

                        <button
                            onClick={handleRefresh}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                        >
                            <RotateCw className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* ===== Original Cards (Unchanged) ===== */}
                    <div className="flex-1 overflow-y-auto md:mb-28 w-full">
                        {/* --- Main Comment Card --- */}
                        {/* <div className="bg-[#F8F9FD] rounded-2xl shadow-sm p-4 flex flex-col mb-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={comment.profile}
                                    alt="profile"
                                    width={42}
                                    height={42}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-800 text-[15px] md:text-base">
                                            {comment.name}
                                        </p>
                                        {comment.you && (
                                            <span className="text-[11px] bg-[#E8EDFF] text-[#4A5DC4] px-2 py-[1px] rounded-full font-medium">
                                                You
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 md:text-sm">
                                        {comment.time}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-800 text-[15px] mt-2 ml-12 md:ml-14 md:text-base">
                                {comment.text}
                            </p>
                        </div> */}

                        {/* --- Replies List (Unchanged) --- */}
                        {replies.length > 0 ? (
                            <div className="flex flex-col gap-3 md:gap-4">
                                {replies.map((reply) => (
                                    <div
                                        key={reply._id}
                                        className="flex bg-[#F8F9FD] rounded-2xl shadow-sm overflow-hidden md:p-1"
                                    >
                                        {/* Blue vertical strip */}
                                        <div className="w-1.5 bg-[#4A5DC4]" />
                                        <div className="flex justify-center ml-1 items-center">
                                            <Image
                                                src={reply.repliedBy.profileImage}
                                                alt="profile"
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        {/* Card Content */}
                                        <div className="flex-1 p-1 flex flex-col">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-gray-800 text-[15px] md:text-base">
                                                            {reply.repliedBy.name}
                                                        </p>
                                                        {reply.you && (
                                                            <span className="text-[11px] bg-[#E8EDFF] text-[#4A5DC4] px-2 py-[1px] rounded-full font-medium">
                                                                You
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-800 text-[15px] mt-2 ml-3 md:text-base">
                                                {reply.reply}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                                <p className="text-gray-600 font-medium text-sm mb-2">
                                    No replies yet
                                </p>
                                <p className="text-gray-400 text-xs mb-4">
                                    Be the first to reply to this comment!
                                </p>
                                <button
                                    onClick={() => setReplyText("Sample reply")}
                                    className="bg-[#4A5DC4] text-white font-medium rounded-full px-5 py-2 flex items-center gap-2 shadow-sm hover:bg-[#3e51a6] transition cursor-pointer"
                                >
                                    Reply
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ===== Footer (Input) ===== */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white flex items-center gap-3 px-4 py-3 md:px-8 md:py-4 shadow-sm pb-1">
                <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 md:py-2 max-w-5xl mx-auto">
                    <Image
                        src={user.profileImage}
                        alt="you"
                        width={30}
                        height={30}
                        className="rounded-full object-cover mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base"
                    />
                </div>
                <button
                    onClick={handleSend}
                    className="bg-[#5074b6] p-3 rounded-full text-white hover:bg-[#3d5f9b] transition cursor-pointer"
                >
                    <Send size={18} />
                </button>
            </footer>
        </div>
    );
}
