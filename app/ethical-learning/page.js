"use client";

import React, { useState, useEffect } from "react";
import { Plus, FileText, Search, Star, Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EthicalInfoModal from "@/components/EthicalLearningModal";

export default function CompendiaPage() {
  const [category, setCategory] = useState("Health");
  const [activeTab, setActiveTab] = useState("Mental");
  const [compendia, setCompendia] = useState([]);
  const [showMyCompendia, setShowMyCompendia] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Load saved compendia from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compendia")) || [];
    setCompendia(saved);
  }, []);

  // Filter for "My Compendium"
  const displayedCompendia = showMyCompendia
    ? compendia.filter((c) => c.isMine === true)
    : compendia;

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        {/* Title Row (centered like VAD Test) */}
        <div className="relative flex items-center justify-between md:max-w-5xl md:mx-auto">
          {/* Left - Create */}
          <button
            onClick={() => router.push("/ethical-learning/upload")}
            className="px-3 py-1 border border-gray-400 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 active:scale-95 md:px-5 md:py-2.5 md:text-base md:shadow-sm md:bg-white"
          >
            Create
          </button>

          {/* Center Title with doodle underline */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-xl font-bold md:text-3xl">Ethical Learning</h2>
            <div className="w-28 h-3 mx-auto mt-0.5 md:w-40 md:h-4 md:mt-1">
              <svg viewBox="0 0 140 12" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-500">
                <path d="M8 6 C20 3, 35 9, 50 6 S80 3, 95 6 S120 9, 132 6" stroke="currentColor" strokeWidth="2.5" fill="transparent" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Right - Info */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition md:shadow-sm"
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>

        {/* Category & My Compendium */}
        <div className="flex flex-wrap items-center justify-between gap-3 md:max-w-5xl md:mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
            >
              <option>Health</option>
              <option>Education</option>
              <option>Society</option>
            </select>
          </div>

          <button
            onClick={() => setShowMyCompendia(!showMyCompendia)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${showMyCompendia
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-700 text-white hover:bg-gray-800"
              }`}
          >
            My Compendium
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 md:max-w-5xl md:mx-auto">
          {["Mental", "Physical"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full text-sm font-medium ${activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative md:max-w-5xl md:mx-auto">
          <input
            type="text"
            placeholder="Search Keywords of Compendia"
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Compendia Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:max-w-5xl md:mx-auto">
          {displayedCompendia.length > 0 ? (
            displayedCompendia.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col h-full"
              >
                {/* Right overlay icon (bookmark) */}
                <div className="absolute top-1 right-1 flex gap-1">
                  <div className="bg-white rounded-md p-1 shadow flex items-center">
                    <Bookmark className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] text-gray-700 font-semibold ml-1">1</span>
                  </div>
                </div>

                {/* Title */}
                <div className="bg-white px-3 pt-3 pb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Image or Default Fallback */}
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
                    className="w-full bg-blue-600 text-white rounded-b-xl py-2 text-sm font-semibold hover:bg-blue-700 transition"
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