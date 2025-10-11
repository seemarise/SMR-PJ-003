"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, RotateCw, Info, UserRound, Send } from "lucide-react";
import { addComment, getAllComment } from "@/services/classroomService/commentApi";
import Image from "next/image";
import moment from "moment";

export default function CommentsPage() {
    const router = useRouter();
    const { classId, section, subject, id } = useParams();
    const [load, setLoad] = useState(false)
    const [comments, setComments] = useState([]);

    // ✅ React Hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getAllComment(id, {}).then(res => {
            setComments(res.data.comments)
        })
    }, [load])

    const onSubmit = (data) => {
        if (!data.comment.trim()) return;

        let param = {
            comment: data.comment,
            parentId: id
        }

        addComment(param).then(() => {
            reset(); // clears the input
            setLoad(x => !x)
        })


    };

    const handleRefresh = () => {
        csetLoad(x => !x)
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 relative">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10 pb-28 md:pb-32">
                <div className="md:max-w-5xl md:mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition md:p-3"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                            Comments
                        </h1>
                        {/* 
                        <button
                            onClick={handleRefresh}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
                        >
                            <RotateCw className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button> */}
                    </div>

                    {/* Announcement Info */}
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 md:px-5 md:py-3">
                        <Info className="w-4 h-4 text-[#5074b6]" />
                        <span className="text-sm text-[#5074b6] md:text-base">
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
                                <Image
                                    src={c.commentedBy.profileImageUrl}
                                    alt={c.commentedBy.name}
                                    width={35}
                                    height={35}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-800">{c.commentedBy.name}</h4>
                                        <span className="text-xs text-gray-400">{moment(c.commentedOn).fromNow()}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm md:text-base mt-1 whitespace-pre-line">
                                        {c.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* ✅ Footer with React Hook Form */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white flex items-center gap-3 px-4 py-3 md:px-8 md:py-4 shadow-sm pb-1">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2 md:py-3 max-w-5xl mx-auto"
                >
                    <UserRound className="text-gray-400 w-5 h-5 mr-2" />
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        {...register("comment", { required: true })}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base"
                    />
                </form>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-[#5074b6] p-3 rounded-full text-white hover:bg-[#5074b6] transition cursor-pointer"
                >
                    <Send size={18} />
                </button>
            </footer>

            {errors.comment && (
                <p className="text-red-500 text-xs text-center pb-2">
                    Comment cannot be empty
                </p>
            )}
        </div>
    );
}
