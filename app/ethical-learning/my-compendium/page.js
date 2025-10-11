"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Pin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyCompendiumPage() {
  const [compendia, setCompendia] = useState([]);
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

  // Filter for starred items only
  const starredCompendia = sortedCompendia.filter((c) => c.isStarred === true);

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 md:max-w-5xl md:mx-auto">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-[#5074b6]">
            My Compendium
          </h1>
        </div>

        {/* Compendia Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-5xl md:mx-auto">
          {starredCompendia.length > 0 ? (
            starredCompendia.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col h-full"
              >
                {/* Star Icon - Top Left */}
                <button
                  onClick={() => toggleStar(item.id)}
                  className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${item.isStarred ? "text-yellow-400 fill-current" : "text-gray-400"
                      }`}
                  />
                </button>

                {/* Pin Icon - Top Right */}
                <button
                  onClick={() => togglePin(item.id)}
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <Pin
                      className={`w-4 h-4 ${item.isPinned ? "text-[#5074b6] fill-current" : "text-gray-400"
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
                    className="w-full bg-[#5074b6] text-white rounded-b-xl py-2 cursor-pointer text-sm font-semibold hover:bg-[#3d5a94] transition"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No starred compendia yet</p>
              <p className="text-gray-400 text-sm">Star some compendia to see them here</p>
              <button
                onClick={() => router.push("/ethical-learning")}
                className="mt-4 px-6 py-2 bg-[#5074b6] text-white rounded-lg hover:bg-[#3d5a94] transition cursor-pointer"
              >
                Browse Compendia
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
