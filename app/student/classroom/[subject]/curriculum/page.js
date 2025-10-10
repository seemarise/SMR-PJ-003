"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VadaiCurriculumPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="flex-1 px-5 py-3 md:px-8 md:py-10">
                <div className="md:max-w-4xl md:mx-auto md:space-y-10">
                    {/* ===== Header ===== */}
                    <div className="flex items-center justify-between mb-6 md:mb-10 relative">
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-[22px] md:text-[30px] font-bold text-[#5074b6]">
                                VADAI Curriculum
                            </h1>
                        </div>

                        <div className="w-10 h-10 md:w-14 md:h-14" /> {/* Placeholder for symmetry */}
                    </div>

                    {/* ===== Content ===== */}
                    <div className="flex flex-col gap-6 md:gap-10">
                        {/* Learn Hub */}
                        <div
                            // onClick={() => router.push("/learn-hub")}
                            className="bg-[#5074b6] text-white rounded-3xl px-5 py-6 md:px-8 md:py-10 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99]"
                        >
                            <div className="border border-white rounded-2xl text-center py-3 mb-3">
                                <p className="text-lg md:text-xl font-semibold">Learn Hub</p>
                            </div>
                            <p className="text-[14px] md:text-base leading-relaxed opacity-90 text-white">
                                Study the VAD AI General Curriculum and stay aligned with what
                                students everywhere are learning.
                            </p>
                        </div>

                        {/* Test Hub */}
                        <div
                            // onClick={() => router.push("/test-hub")}
                            className="bg-[#f45a4e] text-white rounded-3xl px-5 py-6 md:px-8 md:py-10 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99]"
                        >
                            <div className="border border-white rounded-2xl text-center py-3 mb-3">
                                <p className="text-lg md:text-xl font-semibold">Test Hub</p>
                            </div>
                            <p className="text-[14px] md:text-base leading-relaxed opacity-90 text-white">
                                Challenge yourself with tests aligned to the VAD AI General
                                Curriculum which you learnt from the Learn Hub.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
