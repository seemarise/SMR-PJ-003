"use client";

import React, { useState, useEffect } from "react";
import { Plus, FileText, Search, Star, Pin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EthicalInfoModal from "@/components/EthicalLearningModal";

export default function CompendiaPage() {
  const [category, setCategory] = useState("Health");
  const [activeTab, setActiveTab] = useState("Mental");
  const [compendia, setCompendia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Load saved compendia from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compendia")) || [];
    setCompendia(saved);
  }, []);

  // Function to toggle star status
  const toggleStar = (itemId) => {
    const updatedCompendia = compendia.map(item => 
      item.id === itemId 
        ? { ...item, isStarred: !item.isStarred }
        : item
    );
    setCompendia(updatedCompendia);
    localStorage.setItem("compendia", JSON.stringify(updatedCompendia));
  };

  // Function to toggle pin status and manage pin order
  const togglePin = (itemId) => {
    const updatedCompendia = compendia.map(item => {
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
    setCompendia(updatedCompendia);
    localStorage.setItem("compendia", JSON.stringify(updatedCompendia));
  };

  // Sort compendia: pinned first (by pin order), then starred, then others
  const sortedCompendia = [...compendia].sort((a, b) => {
    if (a.isPinned && b.isPinned) {
      return (a.pinOrder || 0) - (b.pinOrder || 0);
    }
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return 0;
  });

  // Check if there are any starred compendia
  const hasStarredCompendia = compendia.some(item => item.isStarred);

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        {/* Title Row - Matching the image design */}
        <div className="relative flex items-center justify-between md:max-w-5xl md:mx-auto">
          {/* Left - + Create Button */}
          <button
            onClick={() => router.push("/ethical-learning/upload")}
            className="w-12 h-12 bg-[#5074b6] rounded-full flex items-center justify-center text-white hover:bg-[#3d5a94] transition-all duration-200 active:scale-95 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>

          {/* Center Title with red wavy underline */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-2xl font-bold text-black">Compendia</h2>
            <div className="w-32 h-2 mx-auto mt-1">
              <svg viewBox="0 0 120 8" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-500">
                <path d="M4 4 C12 1, 20 7, 28 4 S44 1, 52 4 S68 7, 76 4 S92 1, 100 4 S116 7, 116 4" stroke="currentColor" strokeWidth="2" fill="transparent" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Right - My Compendium Button */}
          <button
            onClick={() => router.push("/ethical-learning/my-compendium")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              hasStarredCompendia 
                ? "bg-[#5074b6] text-white hover:bg-[#3d5a94]" 
                : "bg-gray-300 text-white hover:bg-gray-400"
            }`}
          >
            My Compendium
          </button>
        </div>

        {/* Category Section - Matching image design */}
        <div className="flex flex-wrap items-center gap-3 md:max-w-5xl md:mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Category:</span>
            <div className="bg-[#5074b6] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              Health
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs - Matching image design */}
        <div className="flex gap-2 md:max-w-5xl md:mx-auto">
          {["Mental", "Physical"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-[#5074b6] text-white"
                  : "text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar - Matching image design */}
        <div className="relative md:max-w-5xl md:mx-auto">
          <input
            type="text"
            placeholder="Search Keywords of Compendia"
            className="w-full bg-white border border-gray-300 rounded-full px-4 py-3 pr-14 text-sm focus:ring-2 focus:ring-[#5074b6] focus:border-[#5074b6]"
          />
          <button className="absolute right-2 top-2 w-8 h-8 bg-[#5074b6] rounded-full flex items-center justify-center hover:bg-[#3d5a94] transition">
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Compendia Cards - Matching image design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-5xl md:mx-auto">
          {sortedCompendia.length > 0 ? (
            sortedCompendia.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col h-full"
              >
                {/* Star Icon - Top Left */}
                <button
                  onClick={() => toggleStar(item.id)}
                  className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition"
                >
                  <Star 
                    className={`w-5 h-5 ${
                      item.isStarred ? "text-yellow-400 fill-current" : "text-gray-400"
                    }`} 
                  />
                </button>

                {/* Pin Icon - Top Right */}
                <button
                  onClick={() => togglePin(item.id)}
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition"
                >
                  <div className="flex items-center gap-1">
                    <Pin 
                      className={`w-4 h-4 ${
                        item.isPinned ? "text-[#5074b6] fill-current" : "text-gray-400"
                      }`} 
                    />
                    {item.isPinned && (
                      <span className="text-xs font-semibold text-gray-700">
                        {sortedCompendia.filter(c => c.isPinned).findIndex(c => c.id === item.id) + 1}
                      </span>
                    )}
                  </div>
                </button>

                {/* Title */}
                <div className="bg-white px-3 pt-3 pb-2 pl-12">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                </div>

                {/* Image */}
                <div className="relative w-full h-44">
                  <Image
                    src={item.coverImage || "/default-compendia.jpg"}
                    alt={item.title || "Default Compendia"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Spacer to push footer down */}
                <div className="flex-1" />

                {/* Admin + Start */}
                <div className="flex flex-col items-center bg-gray-50 border-t mt-auto">
                  <p className="text-sm text-gray-700 font-medium py-1">Admin</p>
                  <button
                    onClick={() => router.push(`/ethical-learning/${item.id}`)}
                    className="w-full bg-[#5074b6] text-white rounded-b-xl py-2 text-sm font-semibold hover:bg-[#3d5a94] transition"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full mt-10">
              No compendia uploaded yet.
            </p>
          )}
        </div>

        {/* Ethical Info Modal */}
        <EthicalInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}