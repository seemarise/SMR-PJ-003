"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart2, GraduationCap, RefreshCcw } from "lucide-react";
import { getPeople } from "@/services/classroomService/classroomApi";
import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function StudentPerformancePage({ params }) {
  const { id } = React.use(params);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("school");

  useEffect(() => {
    getPeople().then((res) => {
      setStudents(res.data.students);
    });
  }, []);

  const student = students.find((student) => student._id == id) ?? {};
  console.log(student)


  const schoolBarData = [
    { name: "Math", score: 90 },
    { name: "Science", score: 75 },
    { name: "English", score: 85 },
    { name: "History", score: 80 },
  ];

  const vadBarData = [
    { name: "VAD TEST 1", score: 80 },
    { name: "VAD TEST 2", score: 75 },
    { name: "VAD TEST 3", score: 85 },
  ];


  const examReport = {
    title: "Final Exam",
    date: "Mar 1, 2026",
    overallPercent: 64,
    totalScore: "320/500",
    subjects: [
      { name: "English", score: 70, outOf: 100, grade: "B+" },
      { name: "Social Science", score: 70, outOf: 100, grade: "B+" },
      { name: "Tamil", score: 50, outOf: 100, grade: "C" },
      { name: "Mathematics", score: 60, outOf: 100, grade: "B" },
      { name: "Science", score: 70, outOf: 100, grade: "B+" },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
      <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
        <div className="md:max-w-5xl md:mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/classroom/teacherdashboard/performance"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
            </Link>

            <h1 className="text-lg font-bold text-[#5074b6] md:text-2xl">
              Performance Report
            </h1>

            {/* <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3">
              <RefreshCcw className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
            </button> */}
          </div>

          {/* Student Info */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex items-center gap-4 md:bg-white md:border md:border-blue-100">
            <Image
              src={student.profileImage ?? "/user.png"}
              alt={student.name ?? ""}
              width={100}
              height={100}
              className="w-16 h-16 rounded-full border-2 border-blue-300 md:w-20 md:h-20"
            />
            <div>
              <h2 className="font-bold text-lg md:text-2xl text-gray-800">
                {student.name ?? "Student Name"}
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                {student.class ?? "Class 10 A"}
              </p>
              <p className="text-gray-500 text-sm">
                {student.subjects ?? "All Subjects"}
              </p>
            </div>
          </div>


          <div className="rounded-xl shadow-sm bg-white overflow-hidden mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab("school")}
                className={`flex-1 py-3 font-medium flex flex-col items-center transition ${activeTab === "school"
                  ? "text-[#5074b6] bg-blue-50 border-b-2 border-[#5074b6]"
                  : "text-gray-500"
                  }`}
              >
                <GraduationCap className="w-4 h-4 mb-1" />
                <span className="text-sm">School Exams</span>
              </button>
              <button
                onClick={() => setActiveTab("vad")}
                className={`flex-1 py-3 font-medium flex flex-col items-center transition ${activeTab === "vad"
                  ? "text-[#5074b6] bg-blue-50 border-b-2 border-[#5074b6]"
                  : "text-gray-500"
                  }`}
              >
                <BarChart2 className="w-4 h-4 mb-1" />
                <span className="text-sm">VAD Tests</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "school" ? (
            <div className="space-y-6">

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">

                {/* Donut Graph */}
                <div className="relative w-[50%] h-60 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-52 h-52">
                    <defs>
                      <linearGradient id="g1" x1="0%" x2="100%">
                        <stop offset="0%" stopColor="#2aa0ff" />
                        <stop offset="100%" stopColor="#1677ff" />
                      </linearGradient>
                    </defs>

                    {/* Background circle */}
                    <path
                      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eef5fb"
                      strokeWidth="3.5"
                    />

                    {/* Progress arc */}
                    <path
                      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      stroke="url(#g1)"
                      strokeWidth="3.5"
                      strokeDasharray={`${85} ${100 - 85}`} // <-- make dynamic if needed
                      strokeDashoffset="25"
                      strokeLinecap="round"
                    />

                    {/* Inner white circle */}
                    <circle cx="18" cy="18" r="9" fill="#fff" />
                  </svg>

                  {/* Center text */}
                  <div
                    className="absolute text-center"
                    style={{ transform: "translateY(-6px)" }}
                  >
                    <div className="text-3xl font-bold text-[#1677ff]">85%</div>
                    <div className="text-sm text-gray-400">Average</div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-gray-700 font-semibold mb-3">
                    Overall School Performance
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-green-200 inline-block" />
                      Excellent
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-blue-300 inline-block" />
                      Good
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-yellow-200 inline-block" />
                      Average
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-red-200 inline-block" />
                      Needs Improvement
                    </li>
                  </ul>
                </div>
              </div>
              {/* Subject Scores (Bar Chart) */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-700 font-semibold mb-4">
                  Subject Performance
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={schoolBarData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Detailed Exam Reports */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-700">
                      {examReport.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Date: {examReport.date}</div>
                  </div>

                  <div className="bg-[#e6f0ff] text-[#1677ff] px-3 py-1 rounded-full font-semibold text-sm">
                    {examReport.overallPercent}%
                  </div>
                </div>

                <div className="mt-4 border-t pt-4 space-y-4">
                  {examReport.subjects.map((s, idx) => {
                    const pct = Math.round((s.score / s.outOf) * 100);
                    const gradeBg =
                      s.grade === "C" ? "bg-orange-100 text-orange-700" : "bg-[#e6f0ff] text-[#1677ff]";
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-gray-700">{s.name}</div>
                            <div className="text-sm text-gray-500">{s.score}/{s.outOf}</div>
                          </div>
                          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full`}
                              style={{
                                width: `${pct}%`,
                                background: s.grade === "C" ? "#f59e0b" : "#2aa0ff",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className={`px-3 py-1 rounded-md text-sm font-semibold ${gradeBg}`}>
                            {s.grade}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-700">Total Score:</div>
                  <div className="text-sm font-semibold text-[#1677ff]">{examReport.totalScore}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Donut Chart Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">

                {/* Donut Graph */}
                <div className="relative w-[50%] h-60 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-52 h-52">
                    <defs>
                      <linearGradient id="g1" x1="0%" x2="100%">
                        <stop offset="0%" stopColor="#2aa0ff" />
                        <stop offset="100%" stopColor="#1677ff" />
                      </linearGradient>
                    </defs>

                    {/* Background circle */}
                    <path
                      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eef5fb"
                      strokeWidth="3.5"
                    />

                    {/* Progress arc */}
                    <path
                      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      stroke="url(#g1)"
                      strokeWidth="3.5"
                      strokeDasharray={`${85} ${100 - 85}`} // <-- make dynamic if needed
                      strokeDashoffset="25"
                      strokeLinecap="round"
                    />

                    {/* Inner white circle */}
                    <circle cx="18" cy="18" r="9" fill="#fff" />
                  </svg>

                  {/* Center text */}
                  <div
                    className="absolute text-center"
                    style={{ transform: "translateY(-6px)" }}
                  >
                    <div className="text-3xl font-bold text-[#1677ff]">85%</div>
                    <div className="text-sm text-gray-400">Average</div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-gray-700 font-semibold mb-3">
                    Overall School Performance
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-green-200 inline-block" />
                      Excellent
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-blue-300 inline-block" />
                      Good
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-yellow-200 inline-block" />
                      Average
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 rounded-full bg-red-200 inline-block" />
                      Needs Improvement
                    </li>
                  </ul>
                </div>
              </div>

              {/* VAD Test Bar Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-700 font-semibold mb-4">
                  VAD Test Results
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={vadBarData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Exam Reports */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-700">
                      {examReport.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Date: {examReport.date}</div>
                  </div>

                  <div className="bg-[#e6f0ff] text-[#1677ff] px-3 py-1 rounded-full font-semibold text-sm">
                    {examReport.overallPercent}%
                  </div>
                </div>

                <div className="mt-4 border-t pt-4 space-y-4">
                  {examReport.subjects.map((s, idx) => {
                    const pct = Math.round((s.score / s.outOf) * 100);
                    const gradeBg =
                      s.grade === "C" ? "bg-orange-100 text-orange-700" : "bg-[#e6f0ff] text-[#1677ff]";
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-gray-700">{s.name}</div>
                            <div className="text-sm text-gray-500">{s.score}/{s.outOf}</div>
                          </div>
                          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full`}
                              style={{
                                width: `${pct}%`,
                                background: s.grade === "C" ? "#f59e0b" : "#2aa0ff",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className={`px-3 py-1 rounded-md text-sm font-semibold ${gradeBg}`}>
                            {s.grade}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-700">Total Score:</div>
                  <div className="text-sm font-semibold text-[#1677ff]">{examReport.totalScore}</div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
