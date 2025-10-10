"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";

export default function ModulesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-4 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
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
                                Modules
                            </h1>
                        </div>

                        {/* Placeholder to balance layout */}
                        <div className="w-8 md:w-10" />
                    </div>

                    {/* ===== Search Bar ===== */}
                    <div className="flex items-center justify-center mb-10">
                        <div className="flex items-center w-full max-w-md border border-gray-300 rounded-full px-4 py-2 shadow-sm md:px-5 md:py-3 bg-white">
                            <input
                                type="text"
                                placeholder="Search Keywords of Module/File Name"
                                className="flex-1 text-gray-700 text-[15px] md:text-[17px] placeholder-gray-500 focus:outline-none"
                            />
                            <button className="ml-2 bg-[#5074b6] rounded-full p-2 flex items-center justify-center">
                                <Search className="w-4 h-4 text-white md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* ===== Empty State Message ===== */}
                    <div className="flex flex-col items-center justify-center text-center mt-20 md:mt-28">
                        <p className="text-gray-500 text-[16px] md:text-[20px] font-medium">
                            Hmm... nothing here yet! Try again?
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
