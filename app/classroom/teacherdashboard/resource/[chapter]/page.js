"use client";

import {
    Folder,
    Trash2,
    Plus,
    FileText,
    ArrowLeft,
    BookOpen,
    GraduationCap,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { addModuleByChapterId, getAllModulesByChapterId, removeModuleById } from "@/services/classroomService/resourceApi";
import Link from "next/link";
import React from "react";

export default function ChapterPage({ params }) {
    const { chapter } = React.use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const chapterName = searchParams.get("chapterName");
    const [topics, setTopics] = useState({ modules: [] });
    const [filteredTopics, setFilteredTopics] = useState({ modules: [] });

    const [search, setSearch] = useState("");

    const [addTopic, setAddTopic] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddTopic, setShowAddTopic] = useState(false);
    const [delTopicId, setDelTopicId] = useState("");
    const showToast = (a, b = "success") => {
        toast[b](a);
    };
    async function fetchModulesByChapter() {
        let res = await getAllModulesByChapterId([chapter], { searchTag: search });
        if (res.statusCode == 200) {
            setTopics(res.data);
            setFilteredTopics(res.data);
        }
        else {

        }
    }
    useEffect(() => {
        fetchModulesByChapter();
    }, []);

    useEffect(() => {
        if (search.trim() == '') {
            setFilteredTopics(topics);
        }
        else {
            let data = {};
            data.modules = topics.modules.filter((topic) => {
                return topic.moduleName.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredTopics(data);
        }
    }, [search]);

    async function handleDelete() {
        let res = await removeModuleById([delTopicId]);
        if (res.statusCode == 200) {
            showToast("Deleted Successfully !", "error");
            setTopics(prev => {
                let data = {};
                data.modules = prev.modules.filter((module) => {
                    return module._id != delTopicId;
                })
                return data;
            });
            setFilteredTopics(prev => {
                let data = {};
                data.modules = prev.modules.filter((module) => {
                    return module._id != delTopicId;
                })
                return data;
            });
            setDelTopicId("");
            setShowDeleteModal(false);
        }
        else {
            showToast("Error", "error");
        }

    };






    const handleBack = () => {
        router.back();
    };

    async function handleAddChapter() {
        let res = await addModuleByChapterId({ moduleName: addTopic, chapterId: chapter });
        if (res.statusCode == 200) {
            setAddTopic('');
            setShowAddTopic(false);
            fetchModulesByChapter();
        }
        else {
            showToast("Error", "error");
        }
    };
    // const filteredTopics = topics.filter((topic) =>
    //   topic.name.toLowerCase().includes(search.toLowerCase())
    // );

    function timeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diff = Math.floor((now - past) / 1000); // difference in seconds

        if (diff <= 10) return "just now";               // ⬅️ handles "just now"
        if (diff < 60) return `${diff} seconds ago`;

        const minutes = Math.floor(diff / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

        const years = Math.floor(months / 12);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
                            Modules
                        </h1>

                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Chapter Info */}
                    <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex flex-col gap-1 md:p-6">
                        <div className="flex items-center gap-2">
                            <Folder className="text-[#5074b6] w-5 h-5 md:w-6 md:h-6" />
                            <p className="text-blue-900 font-semibold text-lg capitalize">
                                {chapterName}
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-5">
                        <input
                            type="text"
                            placeholder="Search modules..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Topic Cards */}
                    {filteredTopics.modules.length != 0 && (<div className="space-y-4 mt-6">
                        {filteredTopics.modules.map((topic) => (
                            <div
                                key={topic._id}
                                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                                onClick={() =>
                                    router.push(
                                        `/classroom/teacherdashboard/resource/${chapter}/${topic._id}?chapterName=${chapterName}`
                                    )
                                }
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
                                            Created: {timeAgo(topic.createdAt)}
                                        </p>
                                        <p className="text-sm text-[#5074b6] mt-1">
                                            {topic.documents.length}
                                            {topic.documents.length > 1 ? " Documents" : " Document"}
                                        </p>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDelTopicId(topic._id);
                                        setShowDeleteModal(true);
                                    }}
                                    className="text-red-400 hover:text-red-500 transition"
                                >
                                    <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>
                        ))}
                    </div>)}
                    {showDeleteModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-transparent pointer-events-auto z-50">
                            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
                                <h2 className="text-lg font-semibold text-black mb-4">
                                    Delete Module?
                                </h2>
                                <p className="text-sm text-black">
                                    Are you sure you want to delete this module? All documents within this module will also be deleted. This action cannot be undone.
                                </p>

                                <div className="flex justify-end gap-3 mt-6">
                                    {/* Cancel Button */}
                                    <button
                                        className="px-4 py-2 rounded-lg bg-white text-black  hover:bg-gray-100"
                                        onClick={() => {
                                            setDelTopicId("");
                                            setShowDeleteModal(false);
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="px-4 py-2 rounded-lg bg-white text-red-500 hover:bg-red-100"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        showAddTopic && (<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm">
                                {/* Title */}
                                <h2 className="text-lg font-semibold text-center mb-4">
                                    Add New Module
                                </h2>

                                {/* Input */}
                                <input
                                    type="text"
                                    placeholder="Enter module name"
                                    value={addTopic}
                                    onChange={(e) => setAddTopic(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#5074b6]"
                                />
                                <div className="mb-6 text-center">
                                    <i>Note: You can add documnets to this module after it has been created.</i>
                                </div>
                                {/* Buttons */}
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => {
                                            setShowAddTopic(false);
                                            setAddTopic("");
                                        }}
                                        className="px-4 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddChapter}
                                        className="px-5 py-2 rounded-xl bg-[#5074b6] text-white font-medium hover:bg-[#5074b6]"
                                    >
                                        Add Module
                                    </button>
                                </div>
                            </div>
                        </div>)
                    }

                    {/* Floating Add Button */}
                    <button
                        onClick={() => { setShowAddTopic(true); }}
                        className="fixed bottom-6 right-6 bg-[#5074b6] text-white p-4 rounded-full shadow-lg text-2xl hover:bg-[#5074b6] transition md:p-5 md:bottom-10 md:right-10"
                    >
                        <Plus />
                    </button>
                </div>
            </main>
        </div>
    );
}
