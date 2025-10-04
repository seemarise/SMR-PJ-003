"use client";

import { Folder, Trash2, Plus, FileText } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ChapterPage({ params }) {
  const { class: className, section, subject, chapter } = params;

  // Example topics (later fetch from API)
  const [topics, setTopics] = useState([
    { id: 1, name: "Topic 1", createdAt: "7 days ago" },
    { id: 2, name: "Topic 2", createdAt: "7 days ago" },
    { id: 3, name: "Topic 3", createdAt: "7 days ago" },
  ]);

  const handleDelete = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleAdd = () => {
    const newId = topics.length + 1;
    setTopics([
      ...topics,
      { id: newId, name: `Topic ${newId}`, createdAt: "Just now" },
    ]);
  };

  return (
    <main className="px-4 py-6 bg-white min-h-screen  md:px-8 md:py-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center text-blue-800 mb-6 md:text-3xl">
        {chapter.charAt(0).toUpperCase() + chapter.slice(1)}
      </h1>

      <p className="text-gray-700 font-semibold mb-4">
        {topics.length} Topics
      </p>

      {/* Topic List */}
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* ✅ Clickable topic link */}
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
              </div>
            </Link>

            {/* Delete button */}
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
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
      >
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}
