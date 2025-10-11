"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getPeople } from "@/services/classroomService/classroomApi";

export default function StudentSelector({ students = [], value = [], onChange }) {
    const [selectedStudents, setSelectedStudents] = useState(value);




    // Handle checkbox toggle
    const toggleSelect = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id)
                ? prev.filter((studentId) => studentId !== id)
                : [...prev, id]
        );
    };

    function selectStudent() {
        onChange(selectedStudents)
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 pt-3 md:px-6 md:py-4 md:bg-white md:rounded-xl md:shadow-sm md:space-y-4">
            {students.map((student) => (
                <div
                    key={student._id}
                    className={`flex items-center justify-between py-3 md:py-4 border-b md:border-gray-100 last:border-b-0 transition-colors ${selectedStudents.includes(student.id) ? "bg-blue-50" : ""
                        }`}
                >
                    <div className="flex items-center gap-3 md:gap-4">
                        <Image
                            src={student.profileImage}
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
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => toggleSelect(student._id)}
                        className="w-5 h-5 accent-[rgb(80,116,182)] border-2 border-gray-400 rounded-sm cursor-pointer md:w-6 md:h-6"
                    />
                </div>
            ))}

            <button onClick={selectStudent} className="bg-[#5074b6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-4">Submit</button>
        </div>
    );
}
