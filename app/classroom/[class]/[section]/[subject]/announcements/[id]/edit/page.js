"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Info, BookOpen, GraduationCap, SquarePen } from "lucide-react";
import { updateAnnouncement } from "@/services/classroomService/announcementApi";

export default function EditAnnouncementPage() {
    const router = useRouter();
    const { class: classNum, section, subject, id } = useParams();

    const searchParams = useSearchParams();
    const classId = searchParams.get("classId");
    const sectionId = searchParams.get("sectionId");
    const subjectId = searchParams.get("subjectId");
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Simulate fetching existing announcement
    useEffect(() => {
        reset({ title, description }); // populate form with fetched data
    }, [id, reset]);

    const onSubmit = (data) => {
        updateAnnouncement(id, { ...data, classId, sectionId, subjectId }).then(res => {
            router.back();
        })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm md:px-8">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                </button>
                <h1 className="text-lg font-bold text-blue-700 md:text-2xl">
                    Edit Announcement
                </h1>
                <div className="w-6" />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 md:flex md:justify-center md:items-start">
                <div className="w-full max-w-xl bg-white md:rounded-2xl md:shadow-lg md:p-8 p-4">
                    {/* Info Box */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Info className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-gray-700 text-sm md:text-base">
                                    Editing announcement for:
                                </p>
                                <div className="mt-2 space-y-1 text-sm md:text-base">
                                    <div className="flex items-center gap-2 text-gray-800">
                                        <GraduationCap className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium">Class {classNum}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-800">
                                        <BookOpen className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium">Section {section}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <SquarePen className="w-4 h-4" />
                                        <span className="font-semibold">{subject}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Announcement Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter title"
                                {...register("title", { required: "Title is required" })}
                                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Announcement Description
                            </label>
                            <textarea
                                rows="5"
                                placeholder="Enter description"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Update Button */}
                        <button
                            type="submit"
                            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Update Announcement
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
