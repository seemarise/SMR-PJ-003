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
        <main className="px-4 py-4 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="text-gray-700 text-2xl"
                >
                    <ArrowLeft size={22} className="text-gray-700" />
                </button>

                <h1 className="text-lg font-semibold text-blue-600">
                    Create Announcement
                </h1>

                {/* placeholder for spacing (so title stays centered) */}
                <div className="w-6" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Announcement Title
                    </label>
                    <input
                        type="text"
                        placeholder="Enter announcement title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg p-3 shadow-sm"
                        required
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Announcement Description
                    </label>
                    <textarea
                        placeholder="Enter announcement description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-full border rounded-lg p-3 h-28 shadow-sm"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Upload Image (optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-lg shadow"
                    />
                )}

                {/* Post Button */}
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-3 rounded-lg shadow hover:bg-blue-700 transition text-lg font-medium"
                >
                    📢 Post Announcement
                </button>
            </form>
        </main>
    );
}
