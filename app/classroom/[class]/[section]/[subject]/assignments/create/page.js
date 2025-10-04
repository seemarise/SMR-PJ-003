"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAssignment() {
    const [multipleChoice, setMultipleChoice] = useState(false);
    const router = useRouter();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                </button>
                <h1 className="text-lg sm:text-xl font-semibold text-blue-700">
                    English
                </h1>
                <div className="w-8" />
            </div>

            {/* Form */}
            <section className="flex-1 flex justify-center items-start">
                <div className="w-full bg-white shadow-md rounded-xl p-6 sm:p-8">


                    <div className="space-y-5">
                        {/* Lesson Name */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Lesson Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter lesson name"
                                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 p-2 rounded-md outline-none transition"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Content
                            </label>
                            <textarea
                                placeholder="Enter the assignment content"
                                rows="3"
                                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 p-2 rounded-md outline-none transition resize-none"
                            />
                        </div>

                        {/* Topics */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Topics
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Add a topic"
                                    className="flex-grow border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-blue-200 focus:ring-2 outline-none transition mr-2"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Additional Information
                            </label>
                            <input
                                type="text"
                                placeholder="Enter additional information (optional)"
                                className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-blue-200 focus:ring-2 outline-none transition"
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-blue-200 focus:ring-2 outline-none transition"
                            />
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Instructions
                            </label>
                            <textarea
                                placeholder="Enter instructions for students"
                                rows="3"
                                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 p-2 rounded-md outline-none transition resize-none"
                            />
                        </div>

                        {/* Submission Format */}
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Submission Format
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., PDF, Word document, etc."
                                className="w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:ring-blue-200 focus:ring-2 outline-none transition"
                            />
                        </div>


                        {/* Upload Document */}
                        <div>
                            <label className="font-medium block mb-1">Upload Document</label>
                            <input
                                type="file"
                                className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg"
                            />

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
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                    Add Image
                                </button>
                                <button className="border px-4 py-2 rounded-lg">📷</button>
                            </div>

                        </div>
                        <div className="flex items-center justify-between">
                            <label className="font-medium">Questions</label>
                            <input type="checkbox" defaultChecked />
                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition">
                            Create Assignment
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
