"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function ChaptersPage() {
    const router = useRouter();

    const chapters = [
        "Chapter 1: Prose",
        "Chapter 2: Poem",
        "Chapter 3: Supplementary Reader",
        "Chapter 4: Grammar",
        "Chapter 5: Tenses",
        "Chapter 6: Reading Comprehension",
    ];
    const { subject } = useParams();

    const slugify = (title) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="flex-1 px-5 py-3 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* ===== Header ===== */}
                    <div className="flex items-center justify-between mb-6 md:mb-8 relative">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-[22px] md:text-[30px] font-bold text-[#5074b6]">
                                Chapters
                            </h1>
                        </div>

                        <div className="w-10 h-10 md:w-14 md:h-14" /> {/* Placeholder for symmetry */}
                    </div>

                    {/* Chapters List */}
                    <div className="flex flex-col divide-y divide-gray-200">
                        {chapters.map((chapter, index) =>
                        (
                            <div key={index} className="flex items-center gap-4 py-3 md:py-4 cursor-pointer" onClick={() =>
                                router.push(
                                    `/student/classroom/${subject}/resources/${slugify(chapter)}`
                                )
                            }>
                                {/* Circle Number */}
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5074b6] text-white font-semibold text-sm md:w-10 md:h-10 md:text-base"

                                >
                                    {index + 1}
                                </div> {/* Chapter Title */}
                                <p className="text-[15px] text-gray-800 font-medium md:text-lg cursor-pointer">
                                    {chapter}
                                </p>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
