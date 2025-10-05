"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { getPeople } from "@/services/classroomService/classroomApi";
import Image from "next/image";

export default function StudentPerformancePage({ params }) {
  const { id } = React.use(params);

  const [students, setStudents] = useState([])

  useEffect(() => {
    getPeople().then((res) => {
      setStudents(res.data.students)
    })
  }, [])
  const student = students.find(student => student._id == id) ?? {}

  const [activeTab, setActiveTab] = useState("school");

  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
      <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
        <div className="md:max-w-5xl md:mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/classroom/teacherdashboard/performance"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            </Link>

            <h1 className="text-lg font-bold text-blue-800 md:text-2xl">
              Performance Report
            </h1>

            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3">
              <RefreshCcw className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Student Info Card */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex items-center gap-4 md:bg-white md:border md:border-blue-100">
            <Image
              src={student.profileImage ?? null}
              alt={student.name ?? ""}
              width={100}
              height={100}
              className="w-16 h-16 rounded-full border-2 border-blue-300 md:w-20 md:h-20"
            />
            <div>
              <h2 className="font-bold text-lg md:text-2xl text-gray-800">{student.name}</h2>
              <p className="text-gray-600 text-sm md:text-base">{student.class}</p>
              <p className="text-gray-500 text-sm">{student.subjects}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1 md:w-1/2 md:mx-auto">
            <button
              onClick={() => setActiveTab("school")}
              className={`flex-1 text-center py-2 rounded-md font-medium transition ${activeTab === "school"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600"
                }`}
            >
              School Performance
            </button>
            <button
              onClick={() => setActiveTab("vad")}
              className={`flex-1 text-center py-2 rounded-md font-medium transition ${activeTab === "vad"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600"
                }`}
            >
              VAD Performance
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid gap-4 md:grid-cols-2">
            {activeTab === "school" ? (
              <>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-600 text-sm">Overall Grade</h3>
                  <p className="text-2xl font-bold text-gray-800">A</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-600 text-sm">Attendance</h3>
                  <p className="text-2xl font-bold text-gray-800">95%</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2">
                  <h3 className="text-gray-600 text-sm">Subject Performance</h3>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mt-2">
                    <li>Math - A</li>
                    <li>Science - B+</li>
                    <li>English - A</li>
                    <li>History - A-</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2">
                  <h3 className="text-gray-600 text-sm">VAD Analysis</h3>
                  <p className="text-gray-700 text-sm mt-2">
                    Student shows strong logical skills but needs improvement in
                    verbal analysis.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-600 text-sm">Focus Score</h3>
                  <p className="text-2xl font-bold text-gray-800">82%</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-gray-600 text-sm">Comprehension Score</h3>
                  <p className="text-2xl font-bold text-gray-800">76%</p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
