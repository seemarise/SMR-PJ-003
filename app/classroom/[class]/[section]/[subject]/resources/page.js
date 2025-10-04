"use client";

import { Folder, Trash2, Plus, BookOpen, GraduationCap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ResourcesPage({ params }) {
  const { class: className, section, subject } = params;

  // Example data - you can fetch from API later
  const [chapters, setChapters] = useState([
    { id: 1, name: "Chapter 1", createdAt: "7 days ago" },
    { id: 2, name: "Chapter 2", createdAt: "7 days ago" },
    { id: 3, name: "Chapter 3", createdAt: "7 days ago" },
  ]);

  const handleDelete = (id) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  const handleAdd = () => {
    const newId = chapters.length + 1;
    setChapters([
      ...chapters,
      { id: newId, name: `Chapter ${newId}`, createdAt: "Just now" },
    ]);
  };

  return (
    <main className="px-4 py-6 bg-white min-h-screen md:max-w-4xl md:mx-auto md:px-8 md:py-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center text-blue-800 mb-6 md:text-4xl">
        Resources
      </h1>

      {/* Subject Info */}
      <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6 shadow-sm flex items-center gap-3 md:px-6 md:py-4">
        <BookOpen className="text-blue-600 w-6 h-6" />
        <div>
          <p className="font-semibold text-gray-800 md:text-lg">
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Class {className} - Section {section.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Chapter List */}
      <p className="text-gray-700 font-semibold mb-4">
        {chapters.length} Chapters
      </p>

      <div className="space-y-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Chapter clickable */}
            <Link
              href={`/classroom/${className}/${section}/${subject}/resources/${chapter.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-3 flex-1"
            >
              <Folder className="text-blue-600 w-8 h-8" />
              <div>
                <p className="font-medium text-gray-700">{chapter.name}</p>
                <p className="text-xs text-gray-500">
                  Created: {chapter.createdAt}
                </p>
              </div>
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(chapter.id)}
              className="text-red-500 hover:text-red-700 ml-3"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
      >
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}
