"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RotateCw, MessageSquare, MoreVertical } from "lucide-react";

export default function CompendiumCommentsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [compendium, setCompendium] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (!id) return;
    
    // Load compendium details
    const saved = JSON.parse(localStorage.getItem("compendia") || "[]");
    const found = saved.find((c) => c.id === id);
    setCompendium(found);

    // Load comments for this compendium
    const savedComments = JSON.parse(
      localStorage.getItem(`comments_${id}`) || "[]"
    );
    setComments(savedComments);
  }, [id]);

  const handleAddComment = () => {
    if (!input.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Prakasavalli",
      badge: "You",
      avatar: "/user.png",
      text: input,
      time: "Just now",
    };
    
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    
    // Save to localStorage
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    
    setInput("");
  };

  const handleRefresh = () => {
    // Reload comments from localStorage
    const savedComments = JSON.parse(
      localStorage.getItem(`comments_${id}`) || "[]"
    );
    setComments(savedComments);
  };

  const handleOpenOptions = (comment) => {
    setSelectedComment(comment);
    setShowOptionsModal(true);
  };

  const handleCloseOptions = () => {
    setShowOptionsModal(false);
    setSelectedComment(null);
  };

  const handleEditComment = () => {
    setEditingComment(selectedComment);
    setEditText(selectedComment.text);
    setShowOptionsModal(false);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    
    const updatedComments = comments.map((c) =>
      c.id === editingComment.id
        ? { ...c, text: editText, time: "Just now (edited)" }
        : c
    );
    
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    
    setEditingComment(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditText("");
  };

  const handleDeleteComment = () => {
    const updatedComments = comments.filter((c) => c.id !== selectedComment.id);
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setShowOptionsModal(false);
  };

  if (!compendium) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gray-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className="text-xl font-semibold text-blue-600 flex-1 text-center truncate px-2">
          {compendium.title}
        </h1>

        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <RotateCw className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Comments Section */}
      <main className="flex-1 px-4 py-6 pb-44">
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {comment.author.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {comment.author}
                      </h3>
                      {comment.badge && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {comment.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{comment.time}</p>
                  </div>

                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreVertical 
                      className="w-5 h-5 text-gray-400"
                      onClick={() => handleOpenOptions(comment)}
                    />
                  </button>
                </div>

                {/* Comment Text */}
                <p className="text-gray-800 text-base leading-relaxed mb-3 ml-15">
                  {comment.text}
                </p>

                {/* Reply Button */}
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No comments yet</p>
            <p className="text-gray-400 text-sm mt-1">Be the first to share your thoughts!</p>
          </div>
        )}
      </main>

      {/* Fixed Footer Input */}
      <footer className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-20">
        {editingComment ? (
          /* Edit Mode */
          <div className="flex items-center gap-3 max-w-5xl mx-auto">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSaveEdit()}
              placeholder="Edit comment..."
              className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoFocus
            />
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={!editText.trim()}
              className={`px-4 py-2 rounded-full font-medium transition ${
                editText.trim()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        ) : (
          /* Normal Comment Mode */
          <div className="flex items-center gap-3 max-w-5xl mx-auto">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            P
          </div>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* Send Button */}
          <button
            onClick={handleAddComment}
            disabled={!input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition flex-shrink-0 ${
              input.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        )}
      </footer>

      {/* Options Modal (Bottom Sheet) */}
      {showOptionsModal && (
        <div 
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-[100] flex items-end justify-center"
          onClick={handleCloseOptions}
        >
          <div 
            className="bg-white rounded-t-3xl w-full max-w-md pb-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEditComment}
              className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-lg text-gray-800">Edit Comment</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDeleteComment}
              className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
            >
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-lg text-red-600">Delete Comment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}