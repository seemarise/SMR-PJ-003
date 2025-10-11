"use client";

import { getStudentClassroomModules } from "@/services/classroomService/studentClassroomApi";
import {
    FileText,
    ArrowLeft,
    Search,
} from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ChapterPage({ params }) {
    const { chapter } = React.use(params);
    const router = useRouter();
    const [topics, setTopics] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getStudentClassroomModules(chapter, { seachTag: search ?? null }).then(res => {
            setTopics(res.data.modules)
        })
    }, [])

    const handleBack = () => {
        router.back();
    };

    const filteredTopics = topics.filter((topic) =>
        topic.moduleName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                            Modules
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center justify-center mb-10">
                        <div className="flex items-center w-full max-w-md border border-gray-300 rounded-full px-4 py-2 shadow-sm md:px-5 md:py-3 bg-white">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Keywords of Module/File Name"
                                className="flex-1 text-gray-700 text-[15px] md:text-[17px] placeholder-gray-500 focus:outline-none"
                            />
                            <button className="ml-2 bg-[#5074b6] rounded-full p-2 flex items-center cursor-pointer justify-center">
                                <Search className="w-4 h-4 text-white md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Topic Cards */}
                    <div className="space-y-4 mt-6">
                        {filteredTopics.map((topic) => (
                            <div
                                key={topic._id}
                                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                            // onClick={() =>
                            //     router.push(
                            //         `/student/classroom/studentdashboard/resource/${chapter}/topic-${topic.id}`
                            //     )
                            // }
                            >
                                {/* Left Content */}
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-xl flex items-center justify-center">
                                        <FileText className="text-[#5074b6] w-6 h-6 md:w-7 md:h-7" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-base md:text-lg">
                                            {topic.moduleName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Created: {moment(topic.createdAt).format("DD-MMM-YYYY")}
                                        </p>
                                        <p className="text-sm text-[#5074b6] mt-1">
                                            {topic.documents.length} Document
                                            {topic.documents.length !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    {filteredTopics.length == 0 && <div className="mt-48 flex items-center justify-center">
                        Hmm... nothing here yet! Try again?
                    </div>}


                </div>
            </main>
        </div>
    );
}
