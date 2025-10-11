"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { sessionService } from "@/services/sessionService";
import { getStudentAttendence } from "@/services/classroomService/studentClassroomApi";
import moment from "moment";

export default function AttendanceCalendar() {
    const today = new Date();
    const [user, setUser] = useState({});
    const [attendence, setAttendence] = useState([])
    const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [daysInMonth, setDaysInMonth] = useState(0)

    useEffect(() => {
        let u = sessionService.getUser();
        setUser(u);
    }, []);

    useEffect(() => {
        getStudentAttendence({ ...view, month: view.month + 1 }).then(res => {
            setAttendence(res.data.attendance)
        })
    }, [view])


    function getMonthMatrix(year, month) {
        const first = new Date(year, month, 1);
        const last = new Date(year, month + 1, 0);
        const daysInMonth = last.getDate();
        const startWeekday = first.getDay();
        setDaysInMonth(daysInMonth)
        const weeks = [];
        let week = new Array(7).fill(null).map(() => ({ day: null }));
        let day = 1;

        for (let i = startWeekday; i < 7 && day <= daysInMonth; i++) {
            week[i] = { day, date: new Date(year, month, day).toLocaleDateString() };
            day++;
        }
        weeks.push(week);

        while (day <= daysInMonth) {
            week = new Array(7).fill(null).map(() => ({ day: null }));
            for (let i = 0; i < 7 && day <= daysInMonth; i++) {
                week[i] = { day, date: new Date(year, month, day).toLocaleDateString() };
                day++;
            }
            weeks.push(week);
        }
        return weeks;
    }

    const weeks = useMemo(() => getMonthMatrix(view.year, view.month), [view]);

    const presentPercent = useMemo(() => {
        return Math.round((attendence.filter(a => a.status == 'present').length ?? 0 / (attendence.filter(a => a.status == 'present' || a.status == 'absent').length ?? 1)) * 100) / 10
    }, [attendence, daysInMonth]);

    function prevMonth() {
        setView(({ year, month }) => {
            if (month === 0) return { year: year - 1, month: 11 };
            return { year, month: month - 1 };
        });
    }
    function nextMonth() {
        setView(({ year, month }) => {
            if (month === 11) return { year: year + 1, month: 0 };
            return { year, month: month + 1 };
        });
    }

    const monthLabel = useMemo(() => {
        return new Date(view.year, view.month, 1).toLocaleString(undefined, { month: "long", year: "numeric" });
    }, [view]);

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="flex-1 px-4 py-2 md:px-8">
                <div className="md:max-w-5xl md:mx-auto">
                    <div className="relative flex items-center justify-between mb-6">
                        <Link href="/student/classroom/studentdashboard" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm">
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </Link>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center">
                            <h1 className="text-lg font-bold text-[#5074b6] md:text-3xl">Student Attendence</h1>
                        </div>
                    </div>

                    {/* --- MOBILE UI (unchanged) --- */}
                    <div className="w-full max-w-md mx-auto md:max-w-full">
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
                            <div className="px-5 py-4 flex items-center justify-between">
                                <div>
                                    <div className="text-slate-800 font-semibold text-lg">{user.name || "Sai Prasad N"}</div>
                                    <div className="text-slate-400 text-sm mt-1">Class {user.className || "10"} - {user.section || "A"}</div>
                                </div>
                                <div className="ml-4">
                                    <div className={`px-4 py-2 rounded-full font-semibold ${presentPercent > 70 ? "text-emerald-900 bg-emerald-200" : "text-rose-900 bg-rose-200"}`}>{presentPercent}%</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 text-center divide-x border-t border-slate-100">
                                <div className="py-4 bg-emerald-50">
                                    <div className="text-2xl font-bold text-emerald-600">{attendence.filter(a => a.status == 'present').length}</div>
                                    <div className="text-sm text-slate-600">Present</div>
                                </div>
                                <div className="py-4 bg-rose-50">
                                    <div className="text-2xl font-bold text-rose-600">{attendence.filter(a => a.status == 'absent').length}</div>
                                    <div className="text-sm text-slate-600">Absent</div>
                                </div>
                                <div className="py-4 bg-sky-50">
                                    <div className="text-2xl font-bold text-sky-600">{attendence.filter(a => a.status == 'holiday').length}</div>
                                    <div className="text-sm text-slate-600">Holiday</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-blue-600 text-white rounded-xl px-4 py-3 mb-4 cursor-pointer">
                            <button onClick={prevMonth} aria-label="previous month" className="p-2 cursor-pointer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="font-semibold text-lg">{monthLabel}</div>
                            <button onClick={nextMonth} aria-label="next month" className="p-2 cursor-pointer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-4">
                            <div className="grid grid-cols-7 text-xs text-slate-600 font-medium mb-3">
                                <div className="text-center">Sun</div>
                                <div className="text-center">Mon</div>
                                <div className="text-center">Tue</div>
                                <div className="text-center">Wed</div>
                                <div className="text-center">Thu</div>
                                <div className="text-center">Fri</div>
                                <div className="text-center">Sat</div>
                            </div>

                            <div className="space-y-2">
                                {weeks.map((week, wi) => (
                                    <div key={wi} className="grid grid-cols-7 gap-2">
                                        {week.map((cell, ci) => {
                                            if (!cell || cell.day == null) return <div key={ci} className="h-10 rounded-md" />;
                                            const day = cell.day;
                                            let att = attendence.find(a => moment(a.date).diff(moment(cell.date)) == 0) ?? [];


                                            const base = "h-10 flex items-center justify-center rounded-md font-medium";

                                            return (
                                                <div key={ci} className="relative">
                                                    <div className={`${base} ${att.status === "no-record" ? "bg-gray-50 text-slate-500" : "text-white"} ${att.status === "present" ? "bg-emerald-500" : ""} ${att.status === "absent" ? "bg-rose-500" : ""} ${att.status === "holiday" ? "bg-sky-600" : ""}`}>{day}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between text-sm px-2">
                            <div className="flex items-center gap-3">
                                <LegendDot colorClass="bg-emerald-500" label="Present" />
                                <LegendDot colorClass="bg-rose-500" label="Absent" />
                                <LegendDot colorClass="bg-sky-600" label="Holiday" />
                                <LegendDot colorClass="bg-gray-200 border" label="No Record" textClass="text-slate-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function LegendDot({ colorClass, label, textClass }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-md ${colorClass} border border-white shadow-sm`} />
            <div className={`text-sm ${textClass || "text-slate-600"}`}>{label}</div>
        </div>
    );
}
