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
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ChapterPage({ params }) {
  const { class: className, section, subject, chapter } = params;
  const router = useRouter();

  const [topics, setTopics] = useState([
    { id: 1, name: "Topic 1", createdAt: "1 week ago", documents: 3 },
    { id: 2, name: "Topic 2", createdAt: "1 week ago", documents: 3 },
    { id: 3, name: "Topic 3", createdAt: "1 week ago", documents: 2 },
  ]);

  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleAdd = () => {
    const newId = topics.length + 1;
    setTopics([
      ...topics,
      {
        id: newId,
        name: `Topic ${newId}`,
        createdAt: "Just now",
        documents: 0,
      },
    ]);
  };

  const handleBack = () => {
    router.back();
  };

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

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
              <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            </button>

            <h1 className="text-xl font-bold text-blue-700 md:text-3xl">
              Modules
            </h1>

            <div className="w-6 md:w-8" />
          </div>

          {/* Chapter Info */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex flex-col gap-1 md:p-6">
            <div className="flex items-center gap-2">
              <Folder className="text-blue-700 w-5 h-5 md:w-6 md:h-6" />
              <p className="text-blue-900 font-semibold text-lg capitalize">
                {chapter.replace("-", " ")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span className="capitalize">{subject}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap className="w-4 h-4" />
              <span>
                Class {className} - Section {section?.toUpperCase()}
              </span>
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
          <div className="space-y-4 mt-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                onClick={() =>
                  router.push(
                    `/classroom/${className}/${section}/${subject}/resources/${chapter}/topic-${topic.id}`
                  )
                }
              >
                {/* Left Content */}
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl flex items-center justify-center">
                    <FileText className="text-blue-700 w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-base md:text-lg">
                      {topic.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {topic.createdAt}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      {topic.documents} Document
                      {topic.documents !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(topic.id);
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
