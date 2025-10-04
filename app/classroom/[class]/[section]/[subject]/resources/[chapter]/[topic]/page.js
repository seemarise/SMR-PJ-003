"use client";

import {
  Folder,
  FileText,
  Link as LinkIcon,
  Trash2,
  Plus,
  ArrowLeft,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopicPage({ params }) {
  const { class: className, section, subject, chapter, topic } = params;
  const router = useRouter();

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Chapter 1",
      type: "link",
      url: "https://example.com/1",
      createdAt: "1 week ago",
    },
    {
      id: 2,
      name: "chapter 2",
      type: "link",
      url: "https://example.com/2",
      createdAt: "1 week ago",
    },
    {
      id: 3,
      name: "Why VADAI Brochure a4.pdf",
      type: "pdf",
      url: "https://example.com/vadai.pdf",
      createdAt: "1 week ago",
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleDelete = (id) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== id));
  };

  const handleAdd = () => {
    // Add logic for file upload or document creation
    alert("Add document clicked!");
  };

  return (
    <main className="px-4 py-6 bg-white min-h-screen md:max-w-4xl md:mx-auto md:px-8 md:py-10 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-semibold text-blue-800 md:text-3xl text-center flex-1">
          {topic.replace("-", " ")}
        </h1>
        <button
          onClick={handleAdd}
          className="text-blue-700 hover:text-blue-900 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Topic Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Folder className="text-blue-600 w-6 h-6" />
          <span className="font-medium text-gray-800 capitalize">
            {chapter.replace("-", " ")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="text-blue-600 w-6 h-6" />
          <div>
            <p className="font-medium text-gray-800 capitalize">
              {topic.replace("-", " ")}
            </p>
            <p className="text-xs text-gray-500">Created: 1 week ago</p>
          </div>
        </div>
      </div>

      {/* Document List Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700 font-semibold">
          {documents.length} Documents
        </p>
        <button
          onClick={handleAdd}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Document
        </button>
      </div>

      {/* Document Cards */}
      <div className="space-y-3">
        {documents.map((doc) => {
          const isPdf = doc.type === "pdf";
          const color = isPdf ? "red" : "yellow";
          const icon = isPdf ? (
            <FileText className="text-red-500 w-6 h-6" />
          ) : (
            <LinkIcon className="text-yellow-500 w-6 h-6" />
          );

          return (
            <div
              key={doc.id}
              className={`flex items-center justify-between border-l-4 rounded-xl p-4 shadow-sm ${
                isPdf
                  ? "border-red-300 bg-red-50"
                  : "border-yellow-300 bg-yellow-50"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {icon}
                <div>
                  <p className="font-medium text-gray-800">{doc.name}</p>
                  <p
                    className={`text-xs ${
                      isPdf ? "text-red-500" : "text-yellow-500"
                    }`}
                  >
                    document/{doc.type}
                  </p>
                </div>
              </div>

              {/* Open Button */}
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-${color}-700 text-${color}-500`}
              >
                <Pencil className="w-5 h-5" />
              </a>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(doc.id)}
                className={`ml-3 text-${color}-500 hover:text-${color}-700`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          );
        })}
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
