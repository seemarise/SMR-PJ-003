"use client";

import { useState } from "react";
import React from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAssignment({ params }) {
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showAllStudent, setShowAllStudent] = useState(false);
    const { class: classId, section, subject } = React.use(params);
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main content */}
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {/* Desktop container */}
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

                        <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl md:font-bold">
                            Create Assignment
                        </h1>

                        <div className="w-6" />
                    </div>

                    {/* Form */}
                    <form className="space-y-4 md:space-y-6 bg-white rounded-lg shadow-sm p-4 md:p-8 md:rounded-xl">
                        {/* Lesson Name */}
                        <div>
                            <label className="font-medium block mb-1">Lesson Name</label>
                            <input
                                type="text"
                                placeholder="Enter lesson name"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="font-medium block mb-1">Content</label>
                            <textarea
                                rows={4}
                                placeholder="Enter content"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3 resize-none"
                            />
                        </div>

                        {/* Topics */}
                        <div>
                            <label className="font-medium block mb-1">Topics</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a topic"
                                    className="border rounded-lg px-3 py-2 flex-1 md:px-4 md:py-3"
                                />
                                <button
                                    type="button"
                                    className="bg-[#5074b6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div>
                            <label className="font-medium block mb-1">Additional Information</label>
                            <input
                                type="text"
                                placeholder="Enter details"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="font-medium block mb-1">Due Date</label>
                            <input
                                type="datetime-local"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="font-medium block mb-1">Instructions</label>
                            <textarea
                                placeholder="Add any specific instructions"
                                rows={3}
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3 resize-none"
                            />
                        </div>

                        {/* Submission Format */}
                        <div>
                            <label className="font-medium block mb-1">Submission Format</label>
                            <input
                                type="text"
                                placeholder="E.g., PDF, Word doc"
                                className="w-full border rounded-lg px-3 py-2 md:px-4 md:py-3"
                            />
                        </div>

                        {/* Upload Document */}
                        <div>
                            <label className="font-medium block mb-1">Upload Document</label>
                            <button
                                type="button"
                                className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                            >
                                Upload Document
                            </button>
                            <p className="text-sm text-gray-400 mt-1">No documents uploaded yet</p>
                        </div>

                        {/* Assign To */}
                        <div className="flex flex-col items-center justify-between mt-4">
                            <div className="font-medium w-full">Assign To</div>
                            <div className="flex items-center justify-between w-full">
                                All Students
                                <ToggleSwitch checked={showAllStudent} onChange={() => setShowAllStudent(!showAllStudent)} />
                            </div>
                            {
                                showAllStudent && (
                                    <div className="w-full">
                                        <button className="bg-[#5074b6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center transition"
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    `/classroom/${classId}/${section}/${subject}/assignments/create/select-student`
                                                )
                                            }>
                                            +  Select Student
                                        </button>
                                    </div>
                                )
                            }
                        </div>

                        {/* Add Images */}
                        <div>
                            <label className="font-medium block mb-1">Add Images</label>
                            <div className="flex gap-2">
                                <button className="bg-[#5074b6] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                    Add Image
                                </button>
                                <button className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                                    📷
                                </button>
                            </div>
                        </div>

                        {/* Questions Section */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">Questions</label>
                                <ToggleSwitch checked={showQuestions} onChange={() => setShowQuestions(!showQuestions)} /> </div>

                            {showQuestions && (
                                <div className="mt-3 p-3 border rounded-lg bg-gray-50 md:p-5 md:rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-medium">0 Questions</p>
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/classroom/${classId}/${section}/${subject}/assignments/create/edit-question`
                                                )
                                            }
                                            type="button"
                                            className="flex items-center gap-1 text-blue-600 hover:underline"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Edit Questions
                                        </button>
                                    </div>

                                    <div className="flex gap-2 mt-3 flex-wrap">
                                        <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                                            + Generate with AI
                                        </button>
                                        <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                                            + Add Questions
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-[#5074b6] hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition md:text-lg md:py-4 md:rounded-xl">
                            Create Assignment
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}


function ToggleSwitch({ checked, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
    );
}
