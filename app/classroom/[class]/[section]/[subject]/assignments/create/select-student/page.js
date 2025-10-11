"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Image from "next/image";

export default function SelectStudentsPage() {
    const router = useRouter();

    // Mock student data
    const students = [
        { id: 1, name: "Kishan Rao B", image: "/student1.jpg" },
        { id: 2, name: "Sai Prasad N", image: "/student2.jpg" },
    ];

    const [selectedStudents, setSelectedStudents] = useState([]);

    const toggleSelect = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 px-4 py-4 md:px-8 md:py-10">
                {/* Desktop container */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-5 md:rounded-xl  md:shadow-sm">
                        <button
                            onClick={() => router.back()}
                            className="md:p-2 md:rounded-full md:bg-blue-100 hover:bg-blue-200 transition cursor-pointer"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-800 md:w-6 md:h-6 md:text-blue-600" />
                        </button>

                        <h1 className="text-[20px] font-semibold text-[rgb(80,116,182)] md:text-3xl md:font-bold">
                            Select Students
                        </h1>

                        {/* <button className="md:p-2 md:rounded-full md:bg-blue-100 hover:bg-blue-200 transition">
                            <RotateCcw className="w-6 h-6 text-[rgb(80,116,182)] md:w-6 md:h-6" />
                        </button> */}
                    </div>

                    {/* Selected Count */}
                    <p className="text-gray-500 text-[15px] px-5 pt-2 md:px-6 md:text-base md:pt-4">
                        {selectedStudents.length} student
                        {selectedStudents.length !== 1 ? "s" : ""} selected
                    </p>

                    {/* Student List */}
                    <div className="flex-1 overflow-y-auto px-4 pt-3 md:px-6 md:py-4 md:bg-white md:rounded-xl md:shadow-sm md:space-y-4">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between py-3 md:py-4 border-b md:border-gray-100 last:border-b-0"
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <Image
                                        src={student.image}
                                        alt={student.name}
                                        width={45}
                                        height={45}
                                        className="rounded-full object-cover w-[45px] h-[45px] md:w-[55px] md:h-[55px]"
                                    />
                                    <span className="text-[16px] text-gray-800 font-semibold md:text-lg">
                                        {student.name}
                                    </span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.includes(student.id)}
                                    onChange={() => toggleSelect(student.id)}
                                    className="w-5 h-5 accent-[rgb(80,116,182)] border-2 border-gray-400 rounded-sm cursor-pointer md:w-6 md:h-6"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Done Button */}
                    <div className="p-4 border-t border-gray-200 flex justify-end md:border-none md:pt-6">
                        <button
                            onClick={() => router.push("/createassignment")}
                            className="text-[rgb(80,116,182)] text-[17px] font-semibold md:text-lg md:bg-blue-100 md:px-6 md:py-2 md:rounded-lg md:hover:bg-blue-200 transition cursor-pointer"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
