"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { addAnnouncement } from "@/services/classroomService/announcementApi";
import React from "react";

export default function CreateAnnouncement({ params }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    let { class: className, section, subject } = React.use(params)


    // ✅ get query params
    const classId = searchParams.get("classId");
    const sectionId = searchParams.get("sectionId");
    const subjectId = searchParams.get("subjectId");


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // TODO: Save to DB
        addAnnouncement({ ...data, classId, sectionId, subjectId }).then(() => {
            router.push(`./?class=${classId}&section=${sectionId}&subject=${subjectId}`); // back to announcements list 
        })
    };

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 cursor-pointer md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-lg font-semibold text-[#5074b6] md:text-3xl md:font-bold">
                            Create Announcement
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                        {/* Title Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 md:text-lg">
                                Announcement Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter announcement title"
                                {...register("title", { required: "Title is required" })}
                                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm md:p-4 md:text-base md:rounded-xl"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 md:text-lg">
                                Announcement Description
                            </label>
                            <textarea
                                placeholder="Enter announcement description"
                                {...register("description", { required: "Description is required" })}
                                className="w-full border border-gray-300 rounded-lg p-3 h-28 shadow-sm md:h-40 md:p-4 md:text-base md:rounded-xl"
                            />
                            {errors.desc && (
                                <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
                            )}
                        </div>

                        {/* Post Button */}
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-[#5074b6] text-white w-full py-3 rounded-lg shadow hover:bg-[#5d88d3] transition text-lg font-medium md:py-4 md:text-xl md:font-semibold md:rounded-xl cursor-pointer"
                        >
                            Post Announcement
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
