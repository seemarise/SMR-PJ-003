"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

export default function EditAssignmentPage() {
    const router = useRouter();
    const [topics, setTopics] = useState(["asdsad"]);
    const [newTopic, setNewTopic] = useState("");

    const handleAddTopic = () => {
        if (newTopic.trim() !== "") {
            setTopics([...topics, newTopic]);
            setNewTopic("");
        }
    };

    const handleDeleteTopic = (topic) => {
        setTopics(topics.filter((t) => t !== topic));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {/* Main Container for Desktop Alignment */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        <h1 className="text-xl font-bold text-blue-700 md:text-3xl md:font-bold">
                            Edit Assignment
                        </h1>

                        <button className="text-red-500 hover:text-red-600 transition">
                            <FaTrash size={20} className="md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Form Fields */}
                    <form className="space-y-4 md:space-y-6 bg-white rounded-lg shadow-sm p-4 md:p-8 md:rounded-xl">
                        {/* Lesson Name */}
                        <div>
                            <label className="font-medium block mb-1">Lesson Name</label>
                            <input
                                type="text"
                                defaultValue="Test Upload Image"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="font-medium block mb-1">Content</label>
                            <textarea
                                rows={4}
                                defaultValue="Topics: General, Festivals, Culture. Content on Diwali..."
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Topics */}
                        <div>
                            <label className="font-medium block mb-1">Topics</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTopic}
                                    onChange={(e) => setNewTopic(e.target.value)}
                                    placeholder="Add a topic"
                                    className="border rounded-lg px-3 py-2 flex-1 md:px-4 md:py-3"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTopic}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    +
                                </button>
                            </div>

                            <div className="flex gap-2 mt-2 flex-wrap">
                                {topics.map((topic) => (
                                    <div
                                        key={topic}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        <span>{topic}</span>
                                        <button onClick={() => handleDeleteTopic(topic)}>×</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <label className="font-medium block mb-1">Additional Information</label>
                            <input
                                type="text"
                                defaultValue="dssad"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="font-medium block mb-1">Due Date</label>
                            <input
                                type="datetime-local"
                                defaultValue="2025-10-08T00:00"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="font-medium block mb-1">Instructions</label>
                            <textarea
                                defaultValue="asdas"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Submission Format */}
                        <div>
                            <label className="font-medium block mb-1">Submission Format</label>
                            <input
                                type="text"
                                defaultValue="asd"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Upload Document */}
                        <div>
                            <label className="font-medium block mb-1">Documents</label>
                            <button
                                type="button"
                                className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                            >
                                Upload Document
                            </button>
                            <p className="text-sm text-gray-400 mt-1">No documents uploaded yet</p>
                        </div>

                        {/* Assign To */}
                        <div className="flex items-center justify-between mt-4">
                            <label className="font-medium">Assign To</label>
                            <input type="checkbox" defaultChecked className="toggle-switch" />
                        </div>

                        {/* Add Images */}
                        <div>
                            <label className="font-medium block mb-1">Add Images</label>
                            <div className="flex gap-2">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                    Add Image
                                </button>
                                <button className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                                    📷
                                </button>
                            </div>

                            <div className="flex gap-3 mt-3">
                                <div className="w-16 h-16 bg-pink-200 rounded-lg"></div>
                                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>

                        {/* Questions */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">Questions</label>
                                <input type="checkbox" defaultChecked />
                            </div>

                            <div className="mt-3 p-3 border rounded-lg bg-gray-50 md:p-5 md:rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-medium">5 Questions</p>
                                    <button className="text-blue-600 hover:underline">
                                        Edit Questions
                                    </button>
                                </div>
                                <p className="text-gray-700 text-sm">
                                    1. What is the primary spiritual significance of Diwali...
                                </p>
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                                        + Generate with AI
                                    </button>
                                    <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                                        + Add Questions
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Update Button */}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition md:text-lg md:py-4 md:rounded-xl">
                            Update Assignment
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
