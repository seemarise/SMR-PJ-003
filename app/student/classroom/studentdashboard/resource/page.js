"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    BookOpen,
    Folder,
} from "lucide-react";
import { getStudentClassroomChapters } from "@/services/classroomService/studentClassroomApi";

export default function ResourcesPage({ params }) {
    const router = useRouter();
    // const params = useParams();
    const [chapters, setChapters] = useState([])

    useEffect(() => {
        getStudentClassroomChapters().then(res => {
            setChapters(res.data.chapters)
        })
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                            Resources
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Chapter Cards */}
                    <div className="flex flex-col divide-y divide-gray-200">
                        {chapters.map((chapter, index) => (
                            <div key={index} className="flex items-center gap-4 py-3 md:py-4 cursor-pointer" onClick={() =>
                                router.push(
                                    `/student/classroom/studentdashboard/resource/${chapter._id}`
                                )
                            }>
                                {/* Circle Number */}
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5074b6] text-white font-semibold text-sm md:w-10 md:h-10 md:text-base"

                                >
                                    {index + 1}
                                </div> {/* Chapter Title */}
                                <p className="text-[15px] text-gray-800 font-medium md:text-lg cursor-pointer">
                                    {chapter.chapterName}
                                </p>
                            </div>
                        ))}
                    </div>
                    {chapters.length == 0 && <div className="mt-48 flex items-center justify-center">
                        Hmm... nothing here yet! Try again?
                    </div>}

                </div>
            </main>
        </div>
    );
}
