"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    GraduationCap,
    Book,
    RotateCcw,
    BarChart2,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { getPeople } from "@/services/classroomService/classroomApi";
export default function StudentPerformanceReport({ params }) {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [activeTab, setActiveTab] = useState("school");
    const { class: className, section, subject, id } = useParams();
    useEffect(() => {
        getPeople().then((res) => {
            setStudents(res.data.students);
        });
    }, []);

    const student = students.find((student) => student._id == id) ?? {};

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
    const handleRefresh = () => {
        alert("Refreshing data...");
    };

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="px-4 py-3 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-transparent hover:bg-blue-50 transition md:p-3 md:bg-blue-100 md:hover:bg-blue-200 cursor-pointer md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700 md:w-6 md:h-6 md:text-[#5074b6]" />
                        </button>

                        <h1 className="text-lg font-bold text-[#5074b6] md:text-3xl md:font-semibold text-center flex-1">
                            Performance Report
                        </h1>

                        {/* <button
                            className="text-gray-700 md:text-[#5074b6] md:p-2 md:rounded-full md:hover:bg-blue-100"
                            onClick={handleRefresh}
                        >
                            <RotateCcw className="w-5 h-5 md:w-7 md:h-7" />
                        </button> */}
                    </div>

                    {/* Student Info Card */}
                    <div className="bg-white  rounded-lg shadow-sm p-3 mb-5 md:p-6 md:rounded-xl md:shadow">
                        <div className="flex items-center gap-3">
                            {/* Student Photo */}
                            <div className="w-12 h-12 rounded-full overflow-hidden md:w-16 md:h-16">
                                <Image
                                    src={student.profileImage}
                                    alt={student.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Student Details */}
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <h2 className="font-semibold text-gray-800 text-base md:text-2xl">
                                    {student.name}
                                </h2>
                                <div className="flex items-center gap-1 text-gray-600 text-xs md:text-base">
                                    <GraduationCap className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#5074b6]" />
                                    <span>Class {className} - {section}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#5074b6] text-xs md:text-base font-medium">
                                    <Book className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    <span>{subject}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs & Content Box */}
                    <div className=" rounded-lg shadow-sm bg-white overflow-hidden mb-6 md:rounded-xl md:border md:shadow-sm">
                        {/* Tabs Header */}
                        <div className="flex border-b">
                            <button
                                onClick={() => setActiveTab("school")}
                                className={`flex-1 py-3 cursor-pointer font-medium flex flex-col items-center transition md:py-4 ${activeTab === "school"
                                    ? "text-[#5074b6] border-b-2 border-[#5074b6] bg-blue-50"
                                    : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <GraduationCap className="w-4 h-4 mb-1 md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">
                                    School Exams
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab("vad")}
                                className={`flex-1 py-3 cursor-pointer font-medium flex flex-col items-center transition md:py-4 ${activeTab === "vad"
                                    ? "text-[#5074b6] border-b-2 border-[#5074b6] bg-blue-50"
                                    : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                <BarChart2 className="w-4 h-4 mb-1 md:w-5 md:h-5" />
                                <span className="text-sm md:text-base">
                                    VAD Tests
                                </span>
                            </button>
                        </div>
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
                        {/* Empty State */}
                        {/* <div className="flex flex-col items-center justify-center text-center py-10 px-4 md:py-16">
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3 md:w-16 md:h-16 md:mb-4">
                                <BarChart2 className="w-6 h-6 text-gray-400 md:w-8 md:h-8" />
                            </div>

                            <h2 className="font-semibold text-gray-700 text-base md:text-2xl mb-1 md:mb-2">
                                No Data Available
                            </h2>
                            <p className="text-gray-500 text-xs mb-5 md:text-base md:mb-8">
                                {activeTab === "school"
                                    ? "No school exam data available for this student."
                                    : "No VAD test data available for this student."}
                            </p>

                            <button
                                onClick={handleRefresh}
                                className="px-5 py-1.5 bg-[#5074b6] text-white text-sm font-semibold rounded-md shadow hover:bg-[#5074b6] transition md:px-8 md:py-3 md:text-base"
                            >
                                Refresh
                            </button>
                        </div> */}
                    </div>
                </div>
            </main>
        </div>
    );
}
