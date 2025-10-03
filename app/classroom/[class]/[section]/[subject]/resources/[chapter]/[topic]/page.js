"use client";

import { Folder, FileText, Link as LinkIcon, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TopicPage({ params }) {
  const { class: className, section, subject, chapter, topic } = params;

  // Example data
  const [subFolders] = useState([
    { id: 1, name: "Chapter 2", createdAt: "7 days ago" },
  ]);

  const [documents] = useState([
    { id: 1, name: "chapter 6", type: "link", url: "https://example.com" },
    {
      id: 2,
      name: "Why VADAI Brochure a4.pdf",
      type: "pdf",
      url: "https://example.com/vadai.pdf",
    },
  ]);

  return (
    <main className="px-4 py-6 bg-white min-h-screen md:max-w-4xl md:mx-auto md:px-8 md:py-10">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center text-blue-800 mb-6 md:text-4xl">
        {topic.replace("-", " ")}
      </h1>

      {/* Subfolders + Topic Info */}
      <div className="space-y-3 mb-6">
        {subFolders.map((folder) => (
          <Link
            key={folder.id}
            href={`/classroom/${className}/${section}/${subject}/resources/${chapter}/${folder.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            <Folder className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-medium text-gray-700">{folder.name}</p>
              <p className="text-xs text-gray-500">Created: {folder.createdAt}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Documents */}
      <p className="text-gray-700 font-semibold mb-4">
        {documents.length} Documents
      </p>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 flex-1">
              {doc.type === "pdf" ? (
                <FileText className="text-red-500 w-6 h-6" />
              ) : (
                <LinkIcon className="text-yellow-500 w-6 h-6" />
              )}
              <div>
                <p className="font-medium text-gray-700">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  document/{doc.type}
                </p>
              </div>
            </div>

            {/* Open button */}
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              🔗
            </a>

            {/* Delete button */}
            <button className="text-red-500 hover:text-red-700 ml-3">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition">
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}
