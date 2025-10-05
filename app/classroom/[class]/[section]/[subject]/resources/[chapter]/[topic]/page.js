"use client";

import {
  Folder,
  FileText,
  Link as LinkIcon,
  Trash2,
  Plus,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import React from "react";
import { getAllModulesByChapterId,removeDocumentByModuleAndDocumentId } from "@/services/classroomService/resourceApi";
import { useSearchParams } from "next/navigation";

export default function TopicPage({ params }) {
  const { class: className, section, subject, chapter, topic } = React.use(params);
  const searchParams = useSearchParams();
  const chapterName = searchParams.get("chapterName");
  const router = useRouter();

  const [documents, setDocuments] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState({});
  const [activeTab, setActiveTab] = useState("upload");
  const handleBack = () => router.back();

  async function deleteDocument(){
    if (Object.keys(deleteDoc).length == 0){
      return ;
    }
    let res = await removeDocumentByModuleAndDocumentId([topic , deleteDoc.id ]);
    if (res.statusCode == 200){
      alert("Deletion Successfull !!");
      setDocuments((prev)=>{
        let data = {};
        data.documents = prev.documents.filter((doc)=> doc._id != deleteDoc.id);
        return data;
      });
      setShowDeleteModal(false);
      setDeleteDoc({});
    }
    else{
      alert("Error");
    }
  };

  const handleAdd = () => {
    alert("Add document clicked!");
  };

  async function fetchModulesByChapter(){
    let res = await getAllModulesByChapterId([chapter],{searchTag : '' });
    if (res.statusCode == 200){
      let filteredTopic = res.data.modules.find((module)=> module._id === topic);
      console.log(filteredTopic);
      setDocuments(filteredTopic);
    }
    else{
      console.log("error");
    }
  };

  useEffect(()=>{
    fetchModulesByChapter();
  },[]);

  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000); // difference in seconds

    if (diff <= 10) return "just now";               // ⬅️ handles "just now"
    if (diff < 60) return `${diff} seconds ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {Object.keys(documents).length !=0  && (<main className="px-4 py-4 flex-1 md:px-8 md:py-10">
        <div className="md:max-w-5xl md:mx-auto md:space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <button
              onClick={handleBack}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            </button>

            <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl capitalize">
              {documents.moduleName}
            </h1>

            <div className="w-6 md:w-8" />
          </div>

          {/* Topic Info Card */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm flex flex-col gap-2 md:p-6">
            <div className="flex items-center gap-2">
              <Folder className="text-[#5074b6] w-5 h-5 md:w-6 md:h-6" />
              <p className="text-[#5074b6] font-semibold text-lg capitalize">
                {chapterName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#5074b6] w-5 h-5 md:w-6 md:h-6" />
              <p className="text-[#5074b6] font-semibold text-lg capitalize">
                {documents.moduleName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#5074b6] w-5 h-5 md:w-6 md:h-6" />
              <p className="text-[#5074b6] font-semibold text-lg capitalize">
                {"Created: " + timeAgo(documents.createdAt)}
              </p>
            </div>
          </div>
          <div className="space-y-4 text-gray-500">
            <b>{documents.documents.length + (documents.documents.length > 1 ? " Documents" : " Document")}</b>
          </div>
          {/* Documents List */}
          <div className="space-y-4 mt-6">
            {documents.documents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No documents found.
              </p>
            ) : (
              documents.documents.map((doc) => {
                const isPdf = doc.type === "document/pdf";
                const icon = isPdf ? (
                  <FileText className="text-red-500 w-6 h-6" />
                ) : (
                  <LinkIcon className="text-yellow-500 w-6 h-6" />
                );

                return (
                  <div
                    key={doc._id}
                    className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer md:p-5"
                  >
                    {/* Left Section */}
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`p-3 rounded-xl flex items-center justify-center ${isPdf
                          ? "bg-red-100"
                          : "bg-yellow-100"
                          }`}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-base md:text-lg">
                          {doc.name}
                        </p>
                        <p
                          className={`text-sm ${isPdf ? "text-red-500" : "text-yellow-600"
                            }`}
                        >
                          Type: {doc.type}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-${isPdf ? "red" : "yellow"}-500 hover:text-${isPdf ? "red" : "yellow"
                          }-700 transition`}
                      >
                        <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                      <button
                        onClick={() => {
                          setDeleteDoc({
                            name: doc.name,
                            id : doc._id
                          });
                          setShowDeleteModal(true);
                      }}
                        className={`text-${isPdf ? "red" : "yellow"}-500 hover:text-${isPdf ? "red" : "yellow"
                          }-700 transition`}
                      >
                        <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {showDeleteModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-transparent pointer-events-auto z-50">
                                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
                                    <h2 className="text-lg font-semibold text-black mb-4">
                                        Delete Document?
                                    </h2>
                                    <p className="text-sm text-black">
                                        Are you sure you want to &apos;{deleteDoc.name}&apos;? This action cannot be undone.
                                    </p>

                                    <div className="flex justify-end gap-3 mt-6">
                                        {/* Cancel Button */}
                                        <button
                                        className="px-4 py-2 rounded-lg bg-white text-black  hover:bg-gray-100"
                                        onClick={() => {
                                            setDeleteDoc({});
                                            setShowDeleteModal(false);
                                        }}
                                        >
                                        Cancel
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                        className="px-4 py-2 rounded-lg bg-white text-red-500 hover:bg-red-100"
                                        onClick={deleteDocument}
                                        >
                                        Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                    )}
          {
            showAddModal && ( <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                                  {/* Title */}
                                  <h2 className="text-lg font-semibold mb-4 text-center">Add New Documents</h2>

                                  {/* Tab Buttons */}
                                  <div className="flex mb-6">
                                    <button
                                      onClick={() => setActiveTab("upload")}
                                      className={`flex-1 py-2 rounded-l-lg ${
                                        activeTab === "upload" ? "bg-[#5074b6] text-white" : "bg-gray-100"
                                      }`}
                                    >
                                      Upload Files
                                    </button>
                                    <button
                                      onClick={() => setActiveTab("link")}
                                      className={`flex-1 py-2 rounded-r-lg ${
                                        activeTab === "link" ? "bg-[#5074b6] text-white" : "bg-gray-100"
                                      }`}
                                    >
                                      Web Link
                                    </button>
                                  </div>

                                  {/* Upload Files Content */}
                                  {activeTab === "upload" && (
                                    <div>
                                      <label className="block text-sm mb-2">Group Name (Optional)</label>
                                      <input
                                        type="text"
                                        placeholder="Enter name for these documents..."
                                        className="w-full p-2 border rounded mb-4"
                                      />

                                      <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm">Upload Files (0)</span>
                                        <button className="bg-[#5074b6] text-white px-4 py-1 rounded">Add Files</button>
                                      </div>

                                      <div className="w-full h-20 border-2 border-dashed flex items-center justify-center text-gray-400 text-sm rounded mb-4">
                                        No files selected
                                      </div>

                                      <p className="text-xs text-gray-500 mb-4">
                                        Note: Each file size should be less than 10MB
                                      </p>

                                      <div className="flex justify-between">
                                        <button onClick={()=>{setShowAddModal(false);}} className="px-4 py-2 rounded bg-gray-200">
                                          Cancel
                                        </button>
                                        <button className="px-4 py-2 rounded bg-[#5074b6] text-white">
                                          Add Documents
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Web Link Content */}
                                  {activeTab === "link" && (
                                    <div>
                                      <label className="block text-sm mb-2">Link Name</label>
                                      <input
                                        type="text"
                                        placeholder="Enter link name"
                                        className="w-full p-2 border rounded mb-4"
                                      />

                                      <label className="block text-sm mb-2">Web Link</label>
                                      <input
                                        type="url"
                                        placeholder="Enter URL (https://...)"
                                        className="w-full p-2 border rounded mb-4"
                                      />

                                      <p className="text-xs text-gray-500 mb-4">
                                        Note: Web links must be valid URLs beginning with http:// or https://
                                      </p>

                                      <div className="flex justify-between">
                                        <button onClick={()=>setShowAddModal(false)} className="px-4 py-2 rounded bg-gray-200">
                                          Cancel
                                        </button>
                                        <button className="px-4 py-2 rounded bg-[#5074b6] text-white">
                                          Add Link
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                            </div>)
          }
          {/* Floating Add Button */}
          <button
            onClick={()=> setShowAddModal(true)}
            className="fixed bottom-6 right-6 bg-[#5074b6] text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 transition md:p-5 md:bottom-10 md:right-10"
          >
            <Plus />
          </button>
        </div>
      </main>)}
      
    </div>
  );
}
