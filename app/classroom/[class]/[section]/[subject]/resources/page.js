"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Folder,
  Trash2,
  Plus,
  GraduationCap,
} from "lucide-react";

export default function ResourcesPage({ params }) {
  const { class: className, section, subject } = params;
  const router = useRouter();

  const [chapters, setChapters] = useState([
    { id: 1, name: "Chapter 1", createdAt: "1 week ago" },
    { id: 2, name: "Chapter 2", createdAt: "1 week ago" },
    { id: 3, name: "Chapter 3", createdAt: "1 week ago" },
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
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

            <h1 className="text-xl font-bold text-blue-700 md:text-3xl">
              Resources
            </h1>

            <div className="w-6 md:w-8" />
          </div>

          {/* Subject Info */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex items-center gap-3 md:p-6">
            <BookOpen className="text-blue-600 w-6 h-6 md:w-7 md:h-7" />
            <div>
              <p className="font-semibold text-gray-800 md:text-lg capitalize">
                {subject}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                Class {className} - Section {section?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Chapter Cards */}
          <div className="space-y-4 mt-6">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                onClick={() =>
                  router.push(
                    `/classroom/${className}/${section}/${subject}/resources/${chapter.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`
                  )
                }
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl flex items-center justify-center">
                    <Folder className="text-blue-700 w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-base md:text-lg">
                      {chapter.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {chapter.createdAt}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(chapter.id);
                  }}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Floating Add Button */}
          <button
            onClick={handleAdd}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 transition md:p-5 md:bottom-10 md:right-10"
          >
            <Plus />
          </button>
        </div>
      </main>
    </div>
  );
}
