"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";
import Image from "next/image";

export default function PeoplesPage() {
    const router = useRouter();

    const peoples = [
        { name: "Prakasavalli", img: "/images/prakasavalli.jpg" },
        { name: "Sai Prasad N", img: "/images/saiprasad.jpg" },
        { name: "Kishan Rao B", img: "/images/kishan.jpg" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="flex-1 px-5 py-3 md:px-8 md:py-10">
                {/* ===== Desktop Container ===== */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">

                    {/* ===== Header ===== */}
                    <div className="flex items-center justify-between mb-6 md:mb-8 relative">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm cursor-pointer"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                        </button>

                        {/* Title */}
                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-[20px] md:text-[30px] font-bold text-[#5074b6]">
                                Peoples
                            </h1>
                        </div>


                    </div>

                    {/* ===== People List ===== */}
                    <div className="flex flex-col divide-y divide-gray-200 md:w-[70%] md:mx-auto md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-200 md:overflow-hidden">
                        {peoples.map((person, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 py-3 md:py-5 px-0 md:px-6 cursor-default hover:bg-gray-50 transition"
                            >
                                {/* Profile Image */}
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                    <Image
                                        src={person.img}
                                        alt={person.name}
                                        width={48}
                                        height={48}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* Name */}
                                <span className="text-[15px] md:text-[18px] font-medium text-gray-800">
                                    {person.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
