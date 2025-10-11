"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateQuizModal from "../../../components/CreateQuizModal";
import { getCompendiaCategories, getCompendiaSubCategories } from "@/services/ethicalLearningService/compendiaService";
export default function UploadCompendiumPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [websiteLinks, setWebsiteLinks] = useState([]);
  const [category, setCategory] = useState([]);
  const [selCategory, setSelCategory] = useState(-1);
  const [openDd, setOpenDd] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [selSubCat, setSelSubCat] = useState(null);
  const [coverImage, setCoverImage] = useState("");
  const [image, setImage] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [toast, setToast] = useState("");
  const [compendiaData, setCompendiaData] = useState({});

  useEffect(() => {
    fetchCategory();
  }, []);
  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1500);
  }
  async function fetchCategory() {
    console.log("fetch category");
    let res = await getCompendiaCategories();
    if (res.statusCode == 200) {
      console.log("set categories", res.data.categories);
      setCategory(res.data.categories);
      if (res.data.categories.length) {
        console.log("set seleted categories", res.data.categories[0]?._id);
        setSelCategory(res.data.categories[0]?._id);
        fetchSubCategory(res.data.categories[0]?._id);
      }
    };
  };

  async function fetchSubCategory(id) {
    console.log("fetch sub category");
    let res = await getCompendiaSubCategories(id);
    if (res.statusCode == 200) {
      console.log("set sub categories", res.data.subcategories);
      setSubCategory(res.data.subcategories);
      if (res.data.subcategories.length) {
        console.log("set selected sub categories", res.data.subcategories[0]?._id);
        setSelSubCat(res.data.subcategories[0]?._id);
      }

    };
  }
  // If there's a draft in sessionStorage, load it so quiz editor can attach
  // useEffect(() => {
  //   const draft = sessionStorage.getItem("compendium_draft");
  //   if (draft) {
  //     try {
  //       const d = JSON.parse(draft);
  //       setTitle(d.title || "");
  //       setContent(d.content || "");
  //       setWebsiteLink(d.websiteLink || "");
  //       setWebsiteLinks(d.websiteLinks || []);
  //       setCategory(d.category || "General");
  //       setSubCategory(d.subCategory || "Industry");
  //       setCoverImage(d.coverImage || "");
  //       setImage(d.image || "");
  //     } catch { }
  //   }
  // }, []);

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
  const handleCategoryChange = (id) => {
    setSelCategory(id);
    setOpenDd(false);
    fetchSubCategory(id);
  }
  function fillCompendiaData(prev, field, value) {
    return { ...prev, [field]: value }
  }
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
          <h1 className="text-xl font-semibold text-[#5074b6]">Upload Compendium</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:max-w-5xl md:mx-auto md:bg-white md:rounded-xl md:shadow-sm md:p-6">
          {/* Title */}
          <div>
            <label className="font-medium text-gray-700">Title:</label>
            <input
              value={compendiaData?.title}
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
                value={compendiaData?.content}
                onChange={(e) => setCompendiaData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Copy & paste the textual part of your compendium here."
                rows={8}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
              />
              <ImageIcon onClick={() => { }} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
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
                value={compendiaData?.websiteLink}
                onChange={(e) => setCompendiaData(prev => ({ ...prev, websiteLink: e.target.value }))}
                placeholder="Enter website link and tap icon"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-12 text-sm mt-1"
              />
              <button
                type="button"
                onClick={() => {
                  console.log("link button click");
                  setCompendiaData((prev) => {
                    const arr = prev.arrWebsiteLink ? [...prev.arrWebsiteLink] : [];
                    if (prev.websiteLink?.trim()) {
                      arr.push(prev.websiteLink.trim());
                    }

                    const obj = {
                      ...prev,
                      arrWebsiteLink: arr,
                      websiteLink: ""
                    };

                    console.log("Updated array:", arr);
                    console.log("Updated object:", obj);

                    return obj;
                  });
                }}

                className="absolute right-2 top-2 w-8 h-8 bg-[#5074b6] rounded-full flex items-center justify-center hover:bg-[#3d5a94] transition"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Website Links Tiles */}
            {compendiaData?.arrWebsiteLink?.length > 0 && (
              <div className="mt-3 space-y-2">
                {compendiaData?.arrWebsiteLink?.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 truncate flex-1"
                    >
                      {link}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeWebsiteLink(link.id)}
                      className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg"
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
            {
              category.length != 0 &&

              <div className="md:max-w-5xl md:mx-auto">
                <div className="flex flex-wrap items-center gap-3 ">
                  <span className="text-sm font-medium"> Category :</span>
                  <div className="flex items-center gap-2 relative">
                    <div
                      className="bg-[#5074b6] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 cursor-pointer select-none"
                      onClick={() => setOpenDd(prev => !prev)}
                    >
                      {category.find(cat => cat._id == selCategory).name}
                      <svg
                        className={`w-3 h-3 transform transition-transform duration-200 ${openDd ? "rotate-180" : "rotate-0"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Dropdown Menu */}
                    {openDd && (
                      <div className="absolute top-full mt-2 bg-white rounded-lg shadow-md py-2 w-36 z-20">
                        {category.map((cat, index) => (
                          <div
                            key={index}
                            onClick={() => handleCategoryChange(cat._id)}
                            className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-[#5074b6]/10 ${cat._id === selCategory ? "font-semibold text-[#5074b6]" : "text-gray-700"
                              }`}
                          >
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            }

            {/* Tabs - Matching image design */}
            <div className="flex gap-2 md:max-w-5xl md:mx-auto">
              {subcategory.length != 0 && subcategory.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => { setSelSubCat(tab._id); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${selSubCat == tab._id
                    ? "bg-[#5074b6] text-white"
                    : "text-black"
                    }`}
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
              className="px-4 py-2 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94]"
            >
              Create Quiz
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94] flex-1"
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