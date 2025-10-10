"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Copy, Pin } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function CompendiumDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [compendium, setCompendium] = useState(null);
  const [showVADModal, setShowVADModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    if (!id) return;
    const saved = JSON.parse(localStorage.getItem("compendia") || "[]");
    const found = saved.find((c) => c.id === id);
    setCompendium(found);
  }, [id]);

  // Function to toggle pin status and manage pin order
  const togglePin = (itemId) => {
    const saved = JSON.parse(localStorage.getItem("compendia") || "[]");
    const updatedCompendia = saved.map(item => {
      if (item.id === itemId) {
        const isCurrentlyPinned = item.isPinned;
        return { 
          ...item, 
          isPinned: !isCurrentlyPinned,
          pinOrder: !isCurrentlyPinned ? Date.now() : null
        };
      }
      return item;
    });
    localStorage.setItem("compendia", JSON.stringify(updatedCompendia));
    setCompendium(updatedCompendia.find(c => c.id === id));
    setToastText(isCurrentlyPinned ? "Unpinned" : "Pinned");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  if (!compendium)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading Compendium...
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-[#5074b6] truncate">
            {compendium.title}
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:max-w-5xl md:mx-auto relative">
          <div className="flex justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(compendium.content || "");
                setToastText("Contents copied");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 1200);
              }}
              className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
            >
              <Copy className="w-4 h-4" />
              Copy Contents
            </button>
          </div>
          {/* Cover Image */}
          {compendium.coverImage && (
            <img
              src={compendium.coverImage}
              alt="cover"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}

          {/* Content */}
          <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
            {compendium.content}
          </div>

          {/* Website Links */}
          {compendium.websiteLinks && compendium.websiteLinks.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Related Links:</h3>
              <div className="space-y-2">
                {compendium.websiteLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#5074b6] underline hover:text-[#3d5a94] truncate flex-1"
                    >
                      {link.displayName}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legacy Website Link */}
          {compendium.websiteLink && (
            <div className="mt-4">
              <a
                href={compendium.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5074b6] underline text-sm"
              >
                Visit Linked Website
              </a>
            </div>
          )}
        </div>

        {/* Copy Button moved into card header above */}

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 my-6 md:max-w-5xl md:mx-auto" />

        {/* Category Info */}
        <div className="md:max-w-5xl md:mx-auto flex flex-col items-start justify-start gap-3 px-4 md:px-0 text-sm text-gray-800">
          <p>
            <span className="font-semibold text-gray-700">Category:</span> Health
          </p>
          <p>
            <span className="font-semibold text-gray-700">Sub Category:</span> Mental
          </p>
        </div>



        {/* Action Buttons Row */}
        <div className="mt-6 flex gap-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => togglePin(compendium.id)}
            className={`flex-1 border rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition ${
              compendium.isPinned 
                ? "bg-[#5074b6] text-white border-[#5074b6] hover:bg-[#3d5a94]" 
                : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Pin className="w-4 h-4" />
            {compendium.isPinned ? "Unpin" : "Pin"}
          </button>

          <button
            onClick={() => setShowVADModal(true)}
            className="flex-1 bg-yellow-400 text-gray-900 border border-yellow-500 rounded-lg py-2.5 text-sm font-medium hover:bg-yellow-500"
          >
            VAD Squad Review
          </button>

          <button
            onClick={() => router.push(`/ethical-learning/${id}/comments`)}
            className="flex-1 bg-white border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            Comments
          </button>
        </div>

        {/* Create Continuation Button */}
        <div className="mt-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => router.push("/ethical-learning/upload")}
            className="w-full bg-white border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            Create Continuation Compendium
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-xs text-gray-500 md:max-w-5xl md:mx-auto">
          <p>
            <strong>Name of the course creator:</strong> Admin
          </p>
          <p>
            <strong>Date of upload:</strong>{" "}
            {new Date(compendium.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-6 flex flex-col gap-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => alert("AI Magic feature")}
            className="w-full bg-blue-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-blue-700"
          >
            AI Magic
          </button>

          <button
            onClick={() => router.push(`/ethical-learning/${id}/quiz`)}
            className="w-full bg-gray-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800"
          >
            TAKE THE QUIZ
          </button>
        </div>

        {/* VAD Squad Review Modal */}
        {showVADModal && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center px-4 z-[100]">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Submit for VAD Squad Review
              </h2>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Kindly review the content and suggest changes"
                className="w-full h-40 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowVADModal(false);
                    setReviewText("");
                  }}
                  className="flex-1 py-2.5 text-gray-700 font-medium text-sm hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setShowVADModal(false);
                    setReviewText("");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 1500);
                  }}
                  className="flex-1 py-2.5 bg-black text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showToast && !toastText && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-60 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-xl px-8 py-6 shadow-2xl">
              <p className="text-lg font-semibold text-gray-900">Sent for review!</p>
            </div>
          </div>
        )}
        {toastText ? (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-[200]">
            {toastText}
          </div>
        ) : null}
      </main>
    </div>
  );
}