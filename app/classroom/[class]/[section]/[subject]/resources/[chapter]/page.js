"use client";

import { Folder, Trash2, Plus, FileText, ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
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
    <main className="px-4 py-6 bg-white min-h-screen md:max-w-4xl md:mx-auto md:px-8 md:py-10 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-800 md:text-3xl text-center flex-1">
          Modules
        </h1>
        <div className="w-8" />
      </div>

      {/* Chapter Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Folder className="text-blue-700 w-5 h-5" />
          <span className="text-blue-900 font-semibold text-lg capitalize">
            {chapter.replace("-", " ")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span className="capitalize">{subject}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 text-sm mt-1">
          <GraduationCap className="w-4 h-4 text-gray-500" />
          <span className="capitalize">Class {className} - Section {section}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search modules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Topic List */}
      <div className="space-y-3">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <Link
              href={`/classroom/${className}/${section}/${subject}/resources/${chapter}/topic-${topic.id}`}
              className="flex items-center gap-3 flex-1"
            >
              <FileText className="text-blue-600 w-7 h-7" />
              <div>
                <p className="font-medium text-gray-700">{topic.name}</p>
                <p className="text-xs text-gray-500">
                  Created: {topic.createdAt}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {topic.documents} Document{topic.documents !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
            <button
              onClick={() => handleDelete(topic.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}
