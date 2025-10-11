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
  const [websiteLinks, setWebsiteLinks] = useState([]);
  const [category, setCategory] = useState("General");
  const [subCategory, setSubCategory] = useState("Industry");
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
        setWebsiteLinks(d.websiteLinks || []);
        setCategory(d.category || "General");
        setSubCategory(d.subCategory || "Industry");
        setCoverImage(d.coverImage || "");
        setImage(d.image || "");
      } catch { }
    }
  }, []);

  // Function to add website link
  const addWebsiteLink = () => {
    if (websiteLink.trim()) {
      const newLink = {
        id: Date.now().toString(),
        url: websiteLink.trim(),
        displayName: websiteLink.trim()
      };
      setWebsiteLinks([...websiteLinks, newLink]);
      setWebsiteLink("");
    }
  };

  // Function to remove website link
  const removeWebsiteLink = (id) => {
    setWebsiteLinks(websiteLinks.filter(link => link.id !== id));
  };

  // Handle Enter key press for website link input
  const handleWebsiteKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWebsiteLink();
    }
  };

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
      websiteLinks,
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
            className="p-2 cursor-pointer rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-[#5074b6]">Upload Compendium</h1>
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
              <strong>Note:</strong> The Textual content you provide for the compendium is more than enough. Only add website links and images to this compendium if you truly believe that they would help students understand your compendium.
            </p>
          </div>

          {/* Website */}
          <div>
            <label className="font-medium text-gray-700">Website Link:</label>
            <div className="relative">
              <input
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
                onKeyPress={handleWebsiteKeyPress}
                placeholder="Enter website link and tap icon"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 text-sm mt-1"
              />
              <button
                type="button"
                onClick={addWebsiteLink}
                className="absolute right-2 top-2 w-8 h-8 bg-[#5074b6] rounded-full flex items-center justify-center hover:bg-[#3d5a94] transition cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Website Links Tiles */}
            {websiteLinks.length > 0 && (
              <div className="mt-3 space-y-2">
                {websiteLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 truncate flex-1"
                    >
                      {link.displayName}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeWebsiteLink(link.id)}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-[#5074b6] text-white"
              >
                <option>General</option>
                <option>Health</option>
                <option>Education</option>
                <option>Society</option>
              </select>
            </div>

            <div>
              <span className="font-medium text-gray-700">Subcategory:</span>
              <div className="flex gap-3 mt-2">
                {["Industry", "People", "Others", "Tools", "Culture"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubCategory(s)}
                    className={`px-4 py-1 cursor-pointer rounded-full text-sm font-medium ${subCategory === s ? "bg-[#5074b6] text-white" : "bg-gray-200 text-gray-700"
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
                  websiteLinks,
                  category,
                  subCategory,
                  coverImage,
                  image,
                  quiz: JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").quiz || [],
                };
                sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
                setShowQuizModal(true);
              }}
              className="px-4 py-2 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94] cursor-pointer"
            >
              Create Quiz
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94] flex-1 cursor-pointer"
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
                websiteLinks,
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