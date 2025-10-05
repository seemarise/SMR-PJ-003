"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart2 } from "lucide-react";
import { getPeople } from "@/services/classroomService/classroomApi";
import Image from "next/image";

export default function PerformancePage() {
  const [load, setLoad] = useState(true)
  const [students, setStudents] = useState([])

  useEffect(() => {
    getPeople().then((res) => {
      setStudents(res.data.students)
    })
  }, [load])

  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10">
        <div className="md:max-w-5xl md:mx-auto md:space-y-10">
          {/* Header Row */}
          <div className="relative flex items-center justify-between">
            <Link
              href="/classroom/teacherdashboard"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            </Link>

            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <h1 className="text-lg font-bold text-blue-800 md:text-3xl">
                Performance Report
              </h1>
            </div>
          </div>

          {/* Students List */}
          <div>
            <p className="text-blue-700 mt-3 font-semibold text-base md:text-xl">
              Students
            </p>

            <div className="flex flex-col gap-4 mt-3 md:grid md:grid-cols-2 md:gap-6">
              {students.map((student) => (
                <Link
                  key={student._id}
                  href={`/classroom/teacherdashboard/performance/${student._id}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer md:p-5"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={student.profileImage}
                      width={100}
                      height={100}
                      alt={student.name}
                      className="w-12 h-12 rounded-full border-2 border-blue-200 md:w-14 md:h-14"
                    />
                    <div>
                      <p className="font-medium text-gray-700 md:text-lg">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.class}</p>
                    </div>
                  </div>
                  <BarChart2 className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
