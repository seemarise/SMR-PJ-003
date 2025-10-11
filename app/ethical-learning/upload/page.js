"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Send, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateQuizModal from "../../../components/CreateQuizModal";
import ManualQuizEditor from "../../../components/ManualQuizEditor";
import { getCompendiaCategories, getCompendiaSubCategories, generateQuizWithAIPassingContent, addCompendia } from "@/services/ethicalLearningService/compendiaService";
import { toast } from "react-toastify";
import QuizQuestionsPreview from "@/components/QuizQuestionPreview";
import ConfirmationModal from "@/components/ConfirmationModal";
import { getSignedUrl } from "@/services/classroomService/resourceApi";
export default function UploadCompendiumPage() {
  const router = useRouter();

  const showToast = (a, b = "success") => {
    toast[b](a);
  };

  const [compendiaData, setCompendiaData] = useState({
    title: "", content: "", websiteLink: "", categoryId: "", subCategoryId: "",
    arrWebsiteLink: [],
    // Cover Image
    coverImageFile: null,      // The File object
    coverImagePreview: null,   // The preview URL
    // Other Images
    imageFiles: [],            // Array of File objects
    imagePreviews: [],         // Array of preview URLs
    quiz: [],
  });

  // ... (all other state variables remain the same)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState([]);
  const [selCategory, setSelCategory] = useState(-1);
  const [openDd, setOpenDd] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [selSubCat, setSelSubCat] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // ... (all helper functions and useEffect hooks remain the same)
  useEffect(() => {
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    if (Object.keys(draft).length > 0) {
      setCompendiaData(prev => ({ ...prev, ...draft }));
      setSelCategory(draft.category || -1);
      setSelSubCat(draft.subCategory || null);
    }
    fetchCategory();
  }, []);
  useEffect(() => {
    // Check if any modal is currently open
    const isModalOpen = isEditingQuiz || isConfirmModalOpen || showQuizModal;

    if (isModalOpen) {
      // When a modal is open, disable scrolling on the body
      document.body.style.overflow = 'hidden';
    } else {
      // When all modals are closed, restore scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup function: This will run when the component is unmounted
    // to ensure scrolling is restored.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditingQuiz, isConfirmModalOpen, showQuizModal]);
  async function fetchCategory() {
    let res = await getCompendiaCategories();
    if (res.statusCode == 200) {
      setCategory(res.data.categories);
      if (res.data.categories.length) {
        const draftCategory = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").category;
        const firstCategoryId = res.data.categories[0]?._id;
        const categoryToSet = draftCategory || firstCategoryId;

        if (categoryToSet) {
          setSelCategory(categoryToSet);
          setCompendiaData(prev => ({ ...prev, categoryId: categoryToSet }));
          fetchSubCategory(categoryToSet);
        }
      }
    }
  }

  async function fetchSubCategory(id) {
    let res = await getCompendiaSubCategories(id);
    if (res.statusCode == 200) {
      setSubCategory(res.data.subcategories);
      if (res.data.subcategories.length) {
        const draftSubCategory = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}").subCategory;
        const firstSubCategoryId = res.data.subcategories[0]?._id;
        const subCategoryToSet = draftSubCategory || firstSubCategoryId;

        if (subCategoryToSet) {
          setSelSubCat(subCategoryToSet);
          setCompendiaData(prev => ({ ...prev, subCategoryId: subCategoryToSet }));
        }
      }
    }
  }
  async function generateQuizWithAI(compendiumContent) {
    console.log("Sending content to AI for quiz generation:", compendiumContent.substring(0, 100) + "...");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    let res = await generateQuizWithAIPassingContent({
      query: compendiaData.content,
      numberOfQuestions: 5
    });
    // Return the mock API response you provided
    return res;
  }
  function toDataURL(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  const handleCoverImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCompendiaData(prev => ({
      ...prev,
      coverImageFile: file,
      coverImagePreview: URL.createObjectURL(file) // Create a preview URL
    }));
  };

  const handleMultipleImagesFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newFiles = [...compendiaData.imageFiles, ...files];
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));

    setCompendiaData(prev => ({
      ...prev,
      imageFiles: newFiles,
      imagePreviews: newPreviews
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setCompendiaData(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, index) => index !== indexToRemove),
      imagePreviews: prev.imagePreviews.filter((_, index) => index !== indexToRemove),
    }));
  };

  async function getSignedUrlWrapper(file, fieldName) {
    const response = await getSignedUrl({
      fileName: file.name,
      fieldName: fieldName
    });
    return response.data;

    // const blob = new Blob([file], { type: file.type });
    // const url = URL.createObjectURL(blob);

    // return {
    //   uploadUrl: url,
    //   // The backend would use fieldName to construct the final path
    //   publicUrl: `https://your-cloud-storage.com/${fieldName}/${Date.now()}-${file.name}`
    // };
  }
  // NEW: Reusable helper function to upload a single file
  // UPDATED: The uploadFile helper now requires a fieldName
  const uploadFile = async (file, fieldName) => {
    try {
      // 1. Get signed URL from our backend, passing the fieldName
      const { signedUrl } = await getSignedUrlWrapper(file, fieldName);
      // 2. Upload the file to the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      console.log(uploadResponse.url.split('?')[0]);
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload ${file.name}`);
      }
      console.log(uploadResponse);
      // alert(uploadResponse)
      // 3. Return the final public URL
      return uploadResponse.url.split('?')[0];
    } catch (error) {
      console.error('Upload failed for file:', file.name, error);
      throw error;
    }
  };

  // UPDATED: handleSubmit now passes the correct fieldName for each upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    showToast("Starting submission process...", "info");

    try {
      let uploadedCoverUrl = null;
      let uploadedImageUrls = [];

      // Step 1: Upload the cover image with its specific fieldName
      if (compendiaData.coverImageFile) {
        showToast("Uploading cover image...", "info");
        uploadedCoverUrl = await uploadFile(compendiaData.coverImageFile, 'compendiums/cover-images');
      }
      console.log("upload cover url", uploadedCoverUrl)
      // Step 2: Upload other images with their specific fieldName
      if (compendiaData.imageFiles.length > 0) {
        showToast(`Uploading ${compendiaData.imageFiles.length} images...`, "info");
        uploadedImageUrls = await Promise.all(
          compendiaData.imageFiles.map(file => uploadFile(file, 'compendiums/content-images'))
        );
      }

      // Step 3: Construct the final payload
      const finalPayload = {
        title: compendiaData.title,
        contents: compendiaData.content,
        websiteLinks: compendiaData.arrWebsiteLink,
        category: selCategory,
        subcategory: selSubCat,
        numberOfQuestions: compendiaData.quiz.length,
        coverImage: uploadedCoverUrl,
        images: uploadedImageUrls,
        MCQs: compendiaData.quiz,
        continuedFrom: null
      };

      // Step 4: Submit the final data to your backend
      showToast("Submitting compendium data...", "info");
      await submitCompendiumData(finalPayload);

      showToast("Compendium submitted successfully!", "success");
      sessionStorage.removeItem("compendium_draft");
      router.push("/ethical-learning");

    } catch (error) {
      console.error("Submission failed:", error);
      showToast("An error occurred during submission. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  async function submitCompendiumData(payload) {
    let res = await addCompendia(payload);
    if (res.statusCode == 200) {
      // showToast("Compendium Added successfully");
      return { success: true };
    }

  }
  const removeWebsiteLink = (linkToRemove) => {
    setCompendiaData(prev => ({
      ...prev,
      arrWebsiteLink: prev.arrWebsiteLink.filter(link => link !== linkToRemove)
    }));
  };



  const handleCategoryChange = (id) => {
    setSelCategory(id);
    setCompendiaData(prev => ({ ...prev, categoryId: id }));
    setOpenDd(false);
    fetchSubCategory(id);
  };

  const saveDraft = () => {
    const draft = {
      ...compendiaData,
      category: selCategory,
      subCategory: selSubCat,
    };
    sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
  };

  const handleSaveQuiz = (updatedQuestions) => {
    setCompendiaData(prev => ({ ...prev, quiz: updatedQuestions }));
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    draft.quiz = updatedQuestions;
    sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
    setIsEditingQuiz(false);
    showToast("Quiz draft saved successfully!");
  };
  // UPDATED: handleDeleteQuiz now also closes the modal
  const handleDeleteQuiz = () => {
    setCompendiaData(prev => ({ ...prev, quiz: [] }));
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    draft.quiz = [];
    sessionStorage.setItem("compendium_draft", JSON.stringify(draft));

    setIsConfirmModalOpen(false); // Close the modal
    showToast("Quiz has been deleted.", "success");
  };
  const hasQuestions = compendiaData.quiz && compendiaData.quiz.length > 0;

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
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
              <ImageIcon onClick={() => showToast("Work in Progress", "error")} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
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

          <div>
            <label className="font-medium text-gray-700">Cover Image:</label>
            <div className="flex gap-3 items-center mt-1">
              <label className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                Add Image
                <input type="file" accept="image/*" onChange={handleCoverImageFile} className="hidden" />
              </label>
              {compendiaData.coverImagePreview && (
                <img src={compendiaData.coverImagePreview} alt="cover" className="w-28 h-16 object-cover rounded-md" />
              )}
            </div>
          </div>

          {/* Multiple Images Preview */}
          <div>
            <label className="font-medium text-gray-700">Images:</label>
            <div className="flex flex-col gap-3 mt-1">
              <label className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer self-start">
                Add Images
                <input type="file" accept="image/*" onChange={handleMultipleImagesFile} className="hidden" multiple />
              </label>
              <div className="flex gap-3 items-center flex-wrap">
                {compendiaData.imagePreviews?.map((imgSrc, index) => (
                  <div key={index} className="relative">
                    <img src={imgSrc} alt={`img-${index}`} className="w-28 h-16 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none hover:bg-red-700"
                    >
                      <X size={12} />
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
          {hasQuestions && (
            <QuizQuestionsPreview
              questions={compendiaData.quiz}
              onEdit={() => {
                saveDraft();
                setIsEditingQuiz(true);
              }}
              onDeleteRequest={() => setIsConfirmModalOpen(true)}
            />
          )}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                saveDraft();
                if (hasQuestions) {
                  // If quiz exists, go straight to the editor
                  setIsEditingQuiz(true);
                } else {
                  // If no quiz, show the AI/Manual choice modal
                  setShowQuizModal(true);
                }
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#5074b6] text-white rounded-md hover:bg-[#3d5a94] font-semibold"
            >
              {hasQuestions ? 'Edit Quiz' : 'Create Quiz'}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold flex items-center justify-center disabled:bg-green-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Compendium'
              )}
            </button>
          </div>
        </form>

        {showQuizModal && (
          <CreateQuizModal
            onClose={() => setShowQuizModal(false)}
            onManual={() => {
              setShowQuizModal(false);
              saveDraft();
              setIsEditingQuiz(true);
            }}
            onCreateAI={async () => {
              setShowQuizModal(false); // Close modal immediately
              showToast("Generating quiz with AI, please wait...", "info");

              try {
                const res = await generateQuizWithAI(compendiaData.content);

                if (res && res.status === true && res.data?.response) {
                  const aiQuestions = res.data.response;

                  // Transform API response to our internal format
                  const newQuestions = aiQuestions.map(q => ({
                    id: Date.now() + Math.random(), // Unique key for React
                    question: q.question,
                    answerOptions: q.answerOptions,
                    correctOptionIndex: q.correctOptionIndex,
                    imageUrl: ""
                  }));

                  // Get existing questions and append the new ones
                  const existingQuestions = compendiaData.quiz || [];
                  const updatedQuestions = [...existingQuestions, ...newQuestions];

                  // Update the main state
                  setCompendiaData(prev => ({ ...prev, quiz: updatedQuestions }));

                  // Update session storage draft
                  const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
                  draft.quiz = updatedQuestions;
                  sessionStorage.setItem("compendium_draft", JSON.stringify(draft));

                  showToast(`${newQuestions.length} new questions were added by AI!`, "success");
                } else {
                  throw new Error(res.message || "Failed to generate valid quiz questions.");
                }
              } catch (error) {
                console.error("AI Quiz Generation Error:", error);
                showToast("Sorry, we couldn't generate the quiz. Please try again.", "error");
              }
            }}
          />
        )}

        {isEditingQuiz && (
          <ManualQuizEditor
            initialQuestions={compendiaData.quiz}
            onSave={handleSaveQuiz}
            onClose={() => setIsEditingQuiz(false)}
          />
        )}
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDeleteQuiz}
          title="Delete Quiz"
          message="Are you sure you want to delete all questions? This action cannot be undone."
          confirmText="Delete"
        />
        {toast ? (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-[200]">
            {toast}
          </div>
        ) : null}
      </main>
    </div>
  );
}