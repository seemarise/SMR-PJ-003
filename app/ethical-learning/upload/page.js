"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateQuizModal from "../../../components/CreateQuizModal";
import { getCompendiaCategories, getCompendiaSubCategories } from "@/services/ethicalLearningService/compendiaService";

export default function UploadCompendiumPage() {
  const router = useRouter();
  // Consolidated state for all compendium form data
  const [compendiaData, setCompendiaData] = useState({
    title: "",
    content: "",
    websiteLink: "",
    categoryId: "",
    subCategoryId: "",
    arrWebsiteLink: [],
    coverImage: null, // Will hold a single dataURL string
    images: [],       // Will hold an array of dataURL strings
  });

  // State for categories and UI controls
  const [category, setCategory] = useState([]);
  const [selCategory, setSelCategory] = useState(-1);
  const [openDd, setOpenDd] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [selSubCat, setSelSubCat] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1500);
  }

  async function fetchCategory() {
    let res = await getCompendiaCategories();
    if (res.statusCode == 200) {
      setCategory(res.data.categories);
      if (res.data.categories.length) {
        const firstCategoryId = res.data.categories[0]?._id;
        setSelCategory(firstCategoryId);
        setCompendiaData(prev => ({ ...prev, categoryId: firstCategoryId ? firstCategoryId : "" }))
        fetchSubCategory(firstCategoryId);
      }
    }
  }

  async function fetchSubCategory(id) {
    let res = await getCompendiaSubCategories(id);
    if (res.statusCode == 200) {
      setSubCategory(res.data.subcategories);
      if (res.data.subcategories.length) {
        setSelSubCat(res.data.subcategories[0]?._id);
        setCompendiaData(prev => ({ ...prev, subCategoryId: res.data.subcategories[0]?._id ? res.data.subcategories[0]?._id : "" }))
      }
    }
  }

  // Helper to convert a file to a base64 data URL
  function toDataURL(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  // Handler for single cover image upload
  const handleCoverImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    toDataURL(file, (dataUrl) => {
      setCompendiaData(prev => ({ ...prev, coverImage: dataUrl }));
    });
  };

  // NEW: Handler for multiple image uploads at once
  const handleMultipleImagesFile = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // A helper to wrap the callback-based toDataURL in a Promise
    const readFileAsPromise = (file) => {
      return new Promise(resolve => {
        toDataURL(file, dataUrl => resolve(dataUrl));
      });
    };

    // Create an array of promises, one for each file
    const promises = files.map(readFileAsPromise);

    // Wait for all file reading operations to complete
    const newDataUrls = await Promise.all(promises);

    // Update the state once with all the new image URLs
    setCompendiaData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newDataUrls],
    }));
  };


  // Function to remove an image from the multiple images array
  const handleRemoveImage = (indexToRemove) => {
    setCompendiaData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Function to remove website link
  const removeWebsiteLink = (linkToRemove) => {
    setCompendiaData(prev => ({
      ...prev,
      arrWebsiteLink: prev.arrWebsiteLink.filter(link => link !== linkToRemove)
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");

    const newCompendium = {
      id,
      title: compendiaData.title,
      content: compendiaData.content,
      websiteLinks: compendiaData.arrWebsiteLink,
      category: selCategory,
      subCategory: selSubCat,
      coverImage: compendiaData.coverImage,
      images: compendiaData.images,
      quiz: draft.quiz || [],
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("compendia") || "[]");
    saved.unshift(newCompendium);
    localStorage.setItem("compendia", JSON.stringify(saved));

    sessionStorage.removeItem("compendium_draft");
    router.push("/ethical-learning");
  };

  const handleCategoryChange = (id) => {
    setSelCategory(id);
    setCompendiaData(prev => ({ ...prev, categoryId: id }))
    setOpenDd(false);
    fetchSubCategory(id);
  };

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
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
              value={compendiaData.title}
              onChange={(e) => setCompendiaData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Please write the title of your compendium here."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
            />
          </div>

          {/* Content */}
          <div>
            <label className="font-medium text-gray-700">Content:</label>
            <div className="relative">
              <textarea
                value={compendiaData.content}
                onChange={(e) => setCompendiaData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Copy & paste the textual part of your compendium here."
                rows={8}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
              />
              <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <strong>Note:</strong> The Textual content you provide is more than enough. Only add website links and images if they would help students understand your compendium.
            </p>
          </div>

          {/* Website */}
          <div>
            <label className="font-medium text-gray-700">Website Link:</label>
            <div className="relative">
              <input
                value={compendiaData.websiteLink}
                onChange={(e) => setCompendiaData(prev => ({ ...prev, websiteLink: e.target.value }))}
                placeholder="Enter website link and tap icon"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 text-sm mt-1"
              />
              <button
                type="button"
                onClick={() => {
                  setCompendiaData((prev) => {
                    const arr = prev.arrWebsiteLink ? [...prev.arrWebsiteLink] : [];
                    if (prev.websiteLink?.trim()) {
                      arr.push(prev.websiteLink.trim());
                    }
                    return { ...prev, arrWebsiteLink: arr, websiteLink: "" };
                  });
                }}
                className="absolute right-2 top-2 w-8 h-8 bg-[#5074b6] rounded-full flex items-center justify-center hover:bg-[#3d5a94] transition"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            {compendiaData.arrWebsiteLink?.length > 0 && (
              <div className="mt-3 space-y-2">
                {compendiaData.arrWebsiteLink.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 truncate flex-1">
                      {link}
                    </a>
                    <button type="button" onClick={() => removeWebsiteLink(link)} className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image (Single) */}
          <div>
            <label className="font-medium text-gray-700">Cover Image:</label>
            <div className="flex gap-3 items-center mt-1">
              <label className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                Add Image
                <input type="file" accept="image/*" onChange={handleCoverImageFile} className="hidden" />
              </label>
              {compendiaData.coverImage && (
                <img src={compendiaData.coverImage} alt="cover" className="w-28 h-16 object-cover rounded-md" />
              )}
            </div>
          </div>

          {/* Images (Multiple) */}
          <div>
            <label className="font-medium text-gray-700">Images:</label>
            <div className="flex flex-col gap-3 mt-1">
              <label className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer self-start">
                Add Images
                {/* MODIFIED: Added the 'multiple' attribute */}
                <input type="file" accept="image/*" onChange={handleMultipleImagesFile} className="hidden" multiple />
              </label>
              <div className="flex gap-3 items-center flex-wrap">
                {compendiaData.images?.map((imgSrc, index) => (
                  <div key={index} className="relative">
                    <img src={imgSrc} alt={`img-${index}`} className="w-28 h-16 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category + Subcategory */}
          <div className="flex flex-col gap-3">
            {category.length !== 0 && (
              <div className="md:max-w-5xl md:mx-auto">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium">Category:</span>
                  <div className="flex items-center gap-2 relative">
                    <div
                      className="bg-[#5074b6] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 cursor-pointer select-none"
                      onClick={() => setOpenDd(prev => !prev)}
                    >
                      {category.find(cat => cat._id === selCategory)?.name || "Select"}
                      <svg className={`w-3 h-3 transform transition-transform duration-200 ${openDd ? "rotate-180" : "rotate-0"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {openDd && (
                      <div className="absolute top-full mt-2 bg-white rounded-lg shadow-md py-2 w-36 z-20">
                        {category.map((cat, index) => (
                          <div
                            key={index}
                            onClick={() => handleCategoryChange(cat._id)}
                            className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-[#5074b6]/10 ${cat._id === selCategory ? "font-semibold text-[#5074b6]" : "text-gray-700"}`}
                          >
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-2 md:max-w-5xl md:mx-auto flex-wrap">
              {subcategory.length !== 0 && subcategory.map((tab, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => {
                    setSelSubCat(tab._id);
                    setCompendiaData(prev => ({ ...prev, subCategoryId: tab._id }))
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${selSubCat === tab._id ? "bg-[#5074b6] text-white" : "text-black"}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                const draft = {
                  ...compendiaData,
                  category: selCategory,
                  subCategory: selSubCat,
                  quiz: JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").quiz || [],
                };
                sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
                setShowQuizModal(true);
              }}
              className="px-4 py-2 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94]"
            >
              Create Quiz
            </button>
            <button type="submit" className="px-4 py-2 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94] flex-1">
              Submit
            </button>
          </div>
        </form>

        {showQuizModal && (
          <CreateQuizModal
            onClose={() => setShowQuizModal(false)}
            onManual={() => {
              setShowQuizModal(false);
              const draft = {
                ...compendiaData,
                category: selCategory,
                subCategory: selSubCat,
                quiz: JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").quiz || [],
              };
              sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
              router.push("/ethical-learning/quiz/manual");
            }}
            onCreateAI={() => {
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