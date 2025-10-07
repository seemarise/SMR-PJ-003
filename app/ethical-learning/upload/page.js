"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateQuizModal from "../../../components/CreateQuizModal";

export default function UploadCompendiumPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [category, setCategory] = useState("Health");
  const [subCategory, setSubCategory] = useState("Mental");
  const [coverImage, setCoverImage] = useState("");
  const [image, setImage] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1500);
  }

  // If there's a draft in sessionStorage, load it so quiz editor can attach
  useEffect(() => {
    const draft = sessionStorage.getItem("compendium_draft");
    if (draft) {
      try {
        const d = JSON.parse(draft);
        setTitle(d.title || "");
        setContent(d.content || "");
        setWebsiteLink(d.websiteLink || "");
        setCategory(d.category || "Health");
        setSubCategory(d.subCategory || "Mental");
        setCoverImage(d.coverImage || "");
        setImage(d.image || "");
      } catch {}
    }
  }, []);

  function toDataURL(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  const handleFile = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    toDataURL(file, (dataUrl) => setter(dataUrl));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    // fetch quiz from sessionStorage draft (if created)
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    const newCompendium = {
      id,
      title,
      content,
      websiteLink,
      category,
      subCategory,
      coverImage,
      image,
      quiz: draft.quiz || [],
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("compendia") || "[]");
    saved.unshift(newCompendium);
    localStorage.setItem("compendia", JSON.stringify(saved));

    // clear draft
    sessionStorage.removeItem("compendium_draft");
    router.push("/ethical-learning");
  };

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-blue-700">Create Compendium</h1>
        </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:max-w-5xl md:mx-auto md:bg-white md:rounded-xl md:shadow-sm md:p-6">
        {/* Title */}
        <div>
          <label className="font-medium text-gray-700">Title:</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please write the title of your compendium here."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
          />
        </div>

        {/* Content */}
        <div>
          <label className="font-medium text-gray-700">Content:</label>
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Copy & paste the textual part of your compendium here."
              rows={8}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
            />
            <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <strong>Note:</strong> Only add website links and images if they help students understand your compendium.
          </p>
        </div>

        {/* Website */}
        <div>
          <label className="font-medium text-gray-700">Website Link:</label>
          <div className="relative">
            <input
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              placeholder="Enter website link and tap icon"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
            />
            <Send className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="font-medium text-gray-700">Cover Image:</label>
          <div className="flex gap-3 items-center mt-1">
            <label className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer">
              Add Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, setCoverImage)}
                className="hidden"
              />
            </label>
            {coverImage && (
              <img src={coverImage} alt="cover" className="w-28 h-16 object-cover rounded-md" />
            )}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="font-medium text-gray-700">Image:</label>
          <div className="flex gap-3 items-center mt-1">
            <label className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer">
              Add Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, setImage)}
                className="hidden"
              />
            </label>
            {image && (
              <img src={image} alt="img" className="w-28 h-16 object-cover rounded-md" />
            )}
          </div>
        </div>

        {/* Category + Subcategory */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option>Health</option>
              <option>Education</option>
              <option>Society</option>
            </select>
          </div>

          <div>
            <span className="font-medium text-gray-700">Subcategory:</span>
            <div className="flex gap-3 mt-2">
              {["Mental", "Physical"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubCategory(s)}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    subCategory === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              // save current form as draft to sessionStorage so the quiz editor can attach quiz to draft
              const draft = {
                title,
                content,
                websiteLink,
                category,
                subCategory,
                coverImage,
                image,
                quiz: JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").quiz || [],
              };
              sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
              setShowQuizModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Quiz
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex-1"
          >
            Submit
          </button>
        </div>
      </form>

      {showQuizModal && (
        <CreateQuizModal
          onClose={() => setShowQuizModal(false)}
          onManual={() => {
            setShowQuizModal(false);
            // ensure draft saved
            const draft = {
              title,
              content,
              websiteLink,
              category,
              subCategory,
              coverImage,
              image,
              quiz: JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").quiz || [],
            };
            sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
            router.push("/ethical-learning/quiz/manual");
          }}
          onCreateAI={() => {
            // For demo: simple AI generate stub (create one question)
            const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
            const questions = draft?.quiz || [];
            questions.push({
              id: Date.now().toString(),
              text: "AI-generated question based on content (demo)",
              options: ["Option A", "Option B", "Option C", "Option D"],
              answer: 0,
            });
            draft.quiz = questions;
            sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
            setShowQuizModal(false);
            showToast("AI added 1 question to your quiz draft.");
          }}
        />
      )}

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-[200]">
          {toast}
        </div>
      ) : null}
      </main>
    </div>
  );
}