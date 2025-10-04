"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CreateAnnouncement() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState(null);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Save to DB (for now, just redirect)
        console.log({ title, desc, image });
        router.push("../"); // back to announcements list
    };

    return (
        <div className="flex min-h-screen flex-col bg-white md:bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {/* Page Container (consistent with other desktop pages) */}
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 md:mb-10">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        {/* Title */}
                        <h1 className="text-lg font-semibold text-blue-600 md:text-3xl md:font-bold">
                            Create Announcement
                        </h1>

                        {/* Spacer to keep title centered */}
                        <div className="w-6 md:w-8" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        {/* Title Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 md:text-lg">
                                Announcement Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter announcement title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm md:p-4 md:text-base md:rounded-xl"
                                required
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 md:text-lg">
                                Announcement Description
                            </label>
                            <textarea
                                placeholder="Enter announcement description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 h-28 shadow-sm md:h-40 md:p-4 md:text-base md:rounded-xl"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 md:text-lg">
                                Upload Image (optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImage(e.target.files ? e.target.files[0] : null)
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 md:p-3 md:rounded-xl"
                            />
                        </div>

                        {/* Preview */}
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="w-full h-40 object-cover rounded-lg shadow mt-2 md:h-64 md:rounded-xl"
                            />
                        )}

                        {/* Post Button */}
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-3 rounded-lg shadow hover:bg-blue-700 transition text-lg font-medium md:py-4 md:text-xl md:font-semibold md:rounded-xl"
                        >
                            📢 Post Announcement
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
