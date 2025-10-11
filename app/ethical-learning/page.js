"use client";

import React, { useState, useEffect } from "react";
import { Plus, FileText, Search, Star, Pin, NotepadText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EthicalInfoModal from "@/components/EthicalLearningModal";
import { getCompendiaCategories, getCompendiaSubCategories, getAllCompendia, pinCompendiaById } from "@/services/ethicalLearningService/compendiaService";

export default function CompendiaPage() {
  const [category, setCategory] = useState([]);
  const [selCategory, setSelCategory] = useState(-1);
  const [openDd, setOpenDd] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [selSubCat, setSelSubCat] = useState(null);
  const [compendia, setCompendia] = useState([]);
  const [searchCompendia, setSearchCompendia] = useState([]);
  const [filteredCompendia, setFilteredCompendia] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  async function fetchCategory() {
    let res = await getCompendiaCategories();
    if (res.statusCode == 200) {
      setCategory(res.data.categories);
      if (res.data.categories.length) {
        setSelCategory(res.data.categories[0]?._id);
        fetchSubCategory(res.data.categories[0]?._id);
      }
    };
  };

  async function fetchSubCategory(id) {
    setSearch("")
    let res = await getCompendiaSubCategories(id);
    if (res.statusCode == 200) {
      setSubCategory(res.data.subcategories);
      if (res.data.subcategories.length) {
        setSelSubCat(res.data.subcategories[0]?._id);
      }
      if (!compendia.length) {
        console.log(res.data.subcategories[0]?._id)
        fetchCompendia(res.data.subcategories[0]?._id)
      } else {
        filterCompendia(res.data.subcategories[0]?._id)
      }

    };
  }

  async function fetchCompendia(subCatId) {
    console.log(subCatId)
    let res = await getAllCompendia({
      pageNumber: 1,
      pageSize: 100
    });
    if (res.statusCode == 200) {
      let allCompendia = res.data.compendia;
      setCompendia(allCompendia);
      filterCompendia(subCatId, allCompendia)
    };
  };

  function filterCompendia(subCat, allCompendia = []) {
    console.log(subCat)
    console.log(compendia)
    let filteredCompBySubCategory = compendia.filter((comp) => comp.subcategory._id == subCat);
    if (!filteredCompBySubCategory.length) filteredCompBySubCategory = allCompendia.filter((comp) => comp.subcategory._id == subCat);
    setSearchCompendia(filteredCompBySubCategory);
    setFilteredCompendia(filteredCompBySubCategory)
  }

  // Load saved compendia from localStorage
  useEffect(() => {
    fetchCategory();
  }, []);






  useEffect(() => {
    if (search != "") {
      setFilteredCompendia(searchCompendia.filter(com => com.title.toLowerCase().includes(search)));
    } else {
      setFilteredCompendia(searchCompendia);
    }
  }, [search]);
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
  const togglePin = async (itemId) => {
    let res = await pinCompendiaById([itemId]);
    if (res.statusCode == 200) {

    }
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

  const handleCategoryChange = (id) => {
    setSelCategory(id);
    setOpenDd(false);
    fetchSubCategory(id);
  }

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-2 space-y-6 animate-in fade-in duration-300">
        {/* Title Row - Matching the image design */}
        <div className="relative flex items-center justify-between md:max-w-5xl md:mx-auto">
          {/* Left - + Create Button */}
          <button
            onClick={() => router.push("/ethical-learning/upload")}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#5074b6] rounded-full flex items-center justify-center text-white hover:bg-[#3d5a94] transition-all duration-200 active:scale-95 cursor-pointer shadow-lg"
          >
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Center Title with red wavy underline */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-black">Compendia</h2>
            <div className="w-24 md:w-32 h-2 mx-auto mt-1">
              <svg viewBox="0 0 120 8" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-500">
                <path d="M4 4 C12 1, 20 7, 28 4 S44 1, 52 4 S68 7, 76 4 S92 1, 100 4 S116 7, 116 4" stroke="currentColor" strokeWidth="2" fill="transparent" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

           {/* Right - My Compendium Button */}
           <div className='flex flex-col items-end gap-1'>
             <div className="rounded-full p-1.5 md:p-2 bg-gray-400 cursor-pointer" onClick={() => setIsModalOpen(true)}>
               <NotepadText className="w-4 h-4 md:w-6 md:h-6 text-white" />
             </div>
             <button
               onClick={() => router.push("/ethical-learning/my-compendium")}
               className={`px-2 py-1 md:px-4 md:py-2 cursor-pointer rounded-lg text-xs md:text-sm font-medium transition ${hasStarredCompendia
                 ? "bg-[#5074b6] text-white hover:bg-[#3d5a94]"
                 : "bg-gray-300 text-white hover:bg-gray-400"
                 }`}
             >
               My Compendium
             </button>
           </div>
        </div>

        {/* Category Section - Matching image design */}
        {
          category.length != 0 &&

          <div className="md:max-w-5xl md:mx-auto">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="text-xs md:text-sm font-medium">Category:</span>
              <div className="flex items-center gap-2 relative">
                <div
                  className="bg-[#5074b6] text-white px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 cursor-pointer select-none"
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
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-md py-2 w-36 z-20 right-0">
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
        <div className="flex gap-1 md:gap-2 md:max-w-5xl md:mx-auto overflow-x-auto pb-2">
          {subcategory.length != 0 && subcategory.map((tab, index) => (
            <button
              key={index}
              onClick={() => { setSelSubCat(tab._id); filterCompendia(tab._id); setSearch("") }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${selSubCat == tab._id
                ? "bg-[#5074b6] text-white"
                : "text-black"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Bar - Matching image design */}
        <div className="relative md:max-w-5xl md:mx-auto">
          <input
            type="text"
            value={search}
            placeholder="Search Keywords of Compendia"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2.5 md:py-3 pr-12 md:pr-14 text-sm focus:ring-2 focus:ring-[#5074b6] focus:border-[#5074b6]"
          />
          <button className="absolute right-2 top-1.5 md:top-2 w-7 h-7 md:w-8 md:h-8 bg-[#5074b6] rounded-full flex items-center cursor-pointer justify-center hover:bg-[#3d5a94] transition">
            <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </button>
        </div>

        {/* Compendia Cards - Matching image design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-5xl md:mx-auto">
          {filteredCompendia.length > 0 ? (
            filteredCompendia.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col h-full"
              >
                {/* Star Icon - Top Left */}
                <button
                  onClick={() => toggleStar(item._id)}
                  className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white/80 cursor-pointer hover:bg-white transition"
                >
                  <Star
                    className={`w-5 h-5 ${item?.isStarred ? "text-yellow-400 fill-current" : "text-gray-400"
                      }`}
                  />
                </button>

                {/* Pin Icon - Top Right */}
                <button
                  onClick={() => togglePin(item._id)}
                  className="absolute cursor-pointer top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition"
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
                    onClick={() => router.push(`/ethical-learning/${item._id}`)}
                    className="w-full cursor-pointer bg-[#5074b6] text-white rounded-b-xl py-2 text-sm font-semibold hover:bg-[#3d5a94] transition"
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
      </main >
    </div >
  );
}