"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { sessionService } from "@/services/sessionService";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
        let u = sessionService.getUser()
        setUser(u)
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
                {/* Centered desktop container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="relative flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#5074b6] md:text-3xl">
                            Account Details
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 md:p-6 md:shadow-md md:border-blue-100">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-blue-200">
                                <Image
                                    src={user.profileImage}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-800 text-lg md:text-2xl">
                                    {user.name}
                                </h2>
                                <span className="bg-blue-100 text-[#5074b6] text-xs md:text-sm font-semibold px-3 py-1 rounded-full mt-1 inline-block">
                                    Learning Index: 0.0
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Sections */}
                    <div className="md:bg-white md:p-6 md:rounded-2xl md:shadow-md md:border md:border-blue-100 md:space-y-6">
                        <Section title="Basic Information">
                            <Info label="Student ID" value={user.teachersId} />
                            <Info label="Name" value={user.name} />
                        </Section>

                        <Section title="School Information">
                            <Info label="School" value={user.school} />
                            <Info label="Class " value={user.className + " - " + user.section} />
                            <Info label="Roll Number" value={122231} />
                            <Info label="Subjects" value={
                                user.classesAndSubjects?.map((a, i) => (
                                    a.subjectName + " "
                                ))
                            } />
                            <Info label="Learning Index" value={0.0} />
                        </Section>

                        <Section title="Contact Information">
                            <Info label="Email" value={user.email} />
                            <Info label="Phone Number" value={user.phoneNumber} />
                            <Info label="Student WhatsApp Number" value={user.teachersWhatsappNumber} />
                            <Info label="Parent WhatsApp Number" value={user.teachersWhatsappNumber} />
                        </Section>


                        {/* Buttons */}
                        <div className="flex flex-col gap-3 mt-8 md:flex-row md:justify-between md:gap-5">
                            <button className="bg-[#5074b6] text-white py-2 rounded-full font-medium md:flex-1 md:py-3 hover:bg-[#5074b6] transition">
                                Watch Tutorial
                            </button>
                            <button className="bg-blue-100 text-[#5074b6] py-2 rounded-full font-medium md:flex-1 md:py-3 hover:bg-blue-200 transition">
                                Share Feedback
                            </button>
                            <button className="bg-red-500 text-white py-2 rounded-full font-medium md:flex-1 md:py-3 hover:bg-red-600 transition">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ---------- Reusable Components ---------- */
function Section({ title, children }) {
    return (
        <div className="mb-6 md:mb-8">
            <h3 className="font-semibold text-[#5074b6] mb-2 md:text-xl">{title}</h3>
            <div className="space-y-2 md:space-y-3">{children}</div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm flex justify-between items-center md:p-4 md:hover:shadow-md md:transition">
            <p className="text-sm text-gray-600 md:text-base">{label}</p>
            <p className="text-sm font-medium text-gray-800 md:text-base">{value}</p>
        </div>
    );
}
