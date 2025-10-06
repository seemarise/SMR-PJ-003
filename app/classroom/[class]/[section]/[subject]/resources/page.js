"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Folder,
  Trash2,
  Plus,
  GraduationCap,
} from "lucide-react";
import { getSubjectChaptersByClassSecAndSubId, removeChaptersById, addChaptersByClassSecAndSubId } from "@/services/classroomService/resourceApi";

export default function ResourcesPage({ params }) {
  const router = useRouter();
  // const params = useParams();
  const { class: className, section, subject } = React.use(params);
  const searchParams = useSearchParams();
  const classId = searchParams.get("class");
  const sectionId = searchParams.get("section");
  const subjectId = searchParams.get("subject");
  const [chapters, setChapters] = useState({ chapters: [] });
  const [showModal, setShowModal] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [delChapterId, setDeleteChapterId] = useState("");
  const [chapterName, setChapterName] = useState("");
  async function fetchSubjectChapter() {
    let res = await getSubjectChaptersByClassSecAndSubId([subjectId], { classId, sectionId });
    if (res.statusCode == 200) {
      setChapters(res.data);
    }
    else {
      alert("Error");
    }
  };

  useEffect(() => {
    fetchSubjectChapter();
  }, []);

  async function handleDelete() {
    let res = await removeChaptersById([delChapterId]);
    if (res.statusCode == 200) {
      setShowModal(false);
      alert("Chapter Deleted Successfully !!!");
      setChapters((prev) => {
        let data = {};
        data.chapters = prev.chapters.filter((chapter) => {
          return chapter._id != delChapterId;
        })
        return data;
      });
      setDeleteChapterId("");
    }
    else {
      alert('Error');
    }
  };

  async function handleAddChapter() {
    let res = await addChaptersByClassSecAndSubId({
      chapterName: chapterName,
      classId: classId,
      sectionId: sectionId,
      subjectId: subjectId,
    });
    if (res.statusCode == 200) {
      alert("Chapter added successfully");
      setChapterName("");
      setShowAddChapter(false);
      fetchSubjectChapter();
    }
    else {
      alert("error");
    }
  };

  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000); // difference in seconds

    if (diff <= 10) return "just now";               // ⬅️ handles "just now"
    if (diff < 60) return `${diff} seconds ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

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
              <ArrowLeft className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
            </button>

            <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl">
              Resources
            </h1>

            <div className="w-6 md:w-8" />
          </div>

          {/* Subject Info */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex items-center gap-3 md:p-6">
            <BookOpen className="text-[#5074b6] w-6 h-6 md:w-7 md:h-7" />
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
          {
            chapters.chapters.length != 0 && <div className="space-y-4 mt-6">
              {chapters.chapters.map((chapter) => (
                <div
                  key={chapter._id}
                  className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                  onClick={() =>
                    router.push(
                      `/classroom/${className}/${section}/${subject}/resources/${chapter._id}?chapterName=${chapter.chapterName}`
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl flex items-center justify-center">
                      <Folder className="text-[#5074b6] w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-base md:text-lg">
                        {chapter.chapterName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {timeAgo(chapter.createdAt)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteChapterId(chapter._id);
                      setShowModal(true);
                    }}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              ))}
            </div>
          }
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-transparent pointer-events-auto z-50">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-lg font-semibold text-black mb-4">
                  Delete Chapter?
                </h2>
                <p className="text-sm text-black">
                  Are you sure you want to delete this chapter? This will also delete all modules and resources within this chapter. This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  {/* Cancel Button */}
                  <button
                    className="px-4 py-2 rounded-lg bg-white text-black  hover:bg-gray-100"
                    onClick={() => {
                      setDeleteChapterId("");
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>

                  {/* Delete Button */}
                  <button
                    className="px-4 py-2 rounded-lg bg-white text-red-500 hover:bg-red-100"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {
            showAddChapter && (<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm">
                {/* Title */}
                <h2 className="text-lg font-semibold text-center mb-4">
                  Add New Chapter
                </h2>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter chapter name"
                  value={chapterName}
                  onChange={(e) => setChapterName(e.target.value)}
                  className="w-full border rounded-xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#5074b6]"
                />

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setShowAddChapter(false);
                      setChapterName("");
                    }}
                    className="px-4 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddChapter}
                    className="px-5 py-2 rounded-xl bg-[#5074b6] text-white font-medium hover:bg-[#5074b6]"
                  >
                    Add Chapter
                  </button>
                </div>
              </div>
            </div>)
          }
          {/* Floating Add Button */}
          <button
            onClick={() => {
              setShowAddChapter(true);
            }}
            className="fixed bottom-6 right-6 bg-[#5074b6] text-white p-4 rounded-full shadow-lg text-2xl hover:bg-[#5074b6] transition md:p-5 md:bottom-10 md:right-10"
          >
            <Plus />
          </button>
        </div>
      </main>
    </div>
  );
}
