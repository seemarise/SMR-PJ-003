"use client";

import {
  Folder,
  FileText,
  Link as LinkIcon,
  Trash2,
  Plus,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopicPage({ params }) {
  const { class: className, section, subject, chapter, topic } = params;
  const router = useRouter();

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Chapter 1 Notes",
      type: "link",
      url: "https://example.com/1",
      createdAt: "1 week ago",
    },
    {
      id: 2,
      name: "Reference Material",
      type: "link",
      url: "https://example.com/2",
      createdAt: "1 week ago",
    },
    {
      id: 3,
      name: "Why VADAI Brochure.pdf",
      type: "pdf",
      url: "https://example.com/vadai.pdf",
      createdAt: "1 week ago",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleBack = () => router.back();

  const handleDelete = (id) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== id));
  };

  const handleAdd = () => {
    alert("Add document clicked!");
  };

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
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

            <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl capitalize">
              {topic.replace("-", " ")}
            </h1>

            <div className="w-6 md:w-8" />
          </div>

          {/* Topic Info Card */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex flex-col gap-2 md:p-6">
            <div className="flex items-center gap-2">
              <Folder className="text-[#5074b6] w-5 h-5 md:w-6 md:h-6" />
              <p className="text-[#5074b6] font-semibold text-lg capitalize">
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
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Documents List */}
          <div className="space-y-4 mt-6">
            {filteredDocs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No documents found.
              </p>
            ) : (
              filteredDocs.map((doc) => {
                const isPdf = doc.type === "pdf";
                const icon = isPdf ? (
                  <FileText className="text-red-500 w-6 h-6" />
                ) : (
                  <LinkIcon className="text-yellow-500 w-6 h-6" />
                );

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                  >
                    {/* Left Section */}
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`p-3 rounded-xl flex items-center justify-center ${isPdf
                          ? "bg-red-100"
                          : "bg-yellow-100"
                          }`}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-base md:text-lg">
                          {doc.name}
                        </p>
                        <p
                          className={`text-sm ${isPdf ? "text-red-500" : "text-yellow-600"
                            }`}
                        >
                          Type: {doc.type.toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Created: {doc.createdAt}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-${isPdf ? "red" : "yellow"}-500 hover:text-${isPdf ? "red" : "yellow"
                          }-700 transition`}
                      >
                        <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className={`text-${isPdf ? "red" : "yellow"}-500 hover:text-${isPdf ? "red" : "yellow"
                          }-700 transition`}
                      >
                        <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Floating Add Button */}
          <button
            onClick={handleAdd}
            className="fixed bottom-6 right-6 bg-[#5074b6] text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 transition md:p-5 md:bottom-10 md:right-10"
          >
            <Plus />
          </button>
        </div>
      </main>
    </div>
  );
}
