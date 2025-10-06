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
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect,useRef} from "react";
import React from "react";
import { getAllModulesByChapterId,removeDocumentByModuleAndDocumentId,getSignedUrl,addDocumentsByModuleId } from "@/services/classroomService/resourceApi";
import { useSearchParams } from "next/navigation";

export default function TopicPage({ params }) {
  const { class: className, section, subject, chapter, topic } = React.use(params);
  const searchParams = useSearchParams();
  const chapterName = searchParams.get("chapterName");
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [documents, setDocuments] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState({});
  const [activeTab, setActiveTab] = useState("upload");
  const [webLink,setWebLink] = useState({"linkName" : "", "webLink" : ""});
  const [files, setFiles] = useState([]); // uploaded files
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
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

  const handleAddFilesClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // filter out > 10 MB files
    const validFiles = [];
    let rejected = false;
    selectedFiles.forEach((file) => {
      if (file.size <= 10 * 1024 * 1024) {
        validFiles.push(file);
      } else {
        rejected = true;
      }
    });

    if (rejected) {
      setError("Some files were not added because they exceed 10MB.");
      setTimeout(() => setError(""), 4000);
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadSubmit = async () => {
    console.log("Uploading files:", files);
    console.log("Group name:", groupName);
    // onClose();
    try{
      let bodyObj = { documents:[]};

      for (const file of files) {
        let objFile = {};
        
        const res = await getSignedUrl({
          fileName: file.name,
          fieldName: 'Module/Documents'
        });
        console.log("hi",res);
        const url = res.data.signedUrl;
        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        console.log(uploadRes.url.split('?')[0]);
        if (!uploadRes.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
        objFile['type'] = "document/" + file.type.split('/')[1];
        objFile['link'] = uploadRes.url.split('?')[0];
        objFile['name'] = file.name;
        bodyObj.documents.push(objFile);
      };
      alert("All files uploaded successfully!");
      
      console.log(bodyObj);
      let res = await addDocumentsByModuleId([topic],bodyObj);
      if (res.statusCode == 200){
        alert("Uploaded Successfull");
        handleAddDocumnetCancel();
        fetchModulesByChapter();
      }
      console.log("after coming",res);
    }
    catch(err){
        console.log(err);
    }
  };
  const handleEditLinkName = (e)=>{
      setWebLink(prev=>({...prev, linkName : e.target.value}))
  };
  const handleEditWebLink = (e)=>{
      setWebLink(prev=>({...prev, webLink : e.target.value}))
  };
  const handleAddDocumnetCancel = ()=>{
      setFiles([]);
      setGroupName("");
      setWebLink({"linkName" : "", "webLink" : ""});
      setActiveTab("upload");
      setShowAddModal(false);
  };
  const handleLinkSubmit = async () => {
    console.log("Link submitted");
    if (webLink.linkName.trim() == ''){
      alert("Please enter a name for the link");
    }
    if (webLink.webLink.trim() == ''){
      alert("Please enter web link");
    }
    if (webLink.webLink.startsWith("http://") || webLink.webLink.startsWith("https://")){
      let res = await addDocumentsByModuleId([topic],{
      documents:[{
        type: "document/link",
        link: webLink.webLink,
        name: webLink.linkName,
      }]
    });
      if (res.statusCode == 200){
        alert("Uploaded Successfull");
        handleAddDocumnetCancel();
        fetchModulesByChapter();
      }
    }
    else{
      alert("Please enter a valid URL starting with http:// or https://");
    }
    
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
            showAddModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent  z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Add New Documents</h2>

        {/* Tab Switch */}
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

        {/* Upload Files */}
        {activeTab === "upload" && (
          <div>
            <label className="block text-sm mb-2">Group Name (Optional)</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter name for these documents..."
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Upload Files ({files.length})</span>
              <button
                onClick={handleAddFilesClick}
                className="bg-[#5074b6] text-white px-4 py-1 rounded"
              >
                Add Files
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

            {/* File List with Remove */}
            {files.length > 0 && (
              <ul className="mb-4 text-sm text-gray-700 max-h-28 overflow-y-auto space-y-2">
                {files.map((file, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded"
                  >
                    <span className="truncate mr-2">
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </span>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <p className="text-xs text-gray-500 mb-4">
              Note: Each file size should be less than 10MB
            </p>

            <div className="flex justify-between">
              <button onClick={handleAddDocumnetCancel} className="px-4 py-2 rounded bg-gray-200">
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                className="px-4 py-2 rounded bg-[#5074b6] text-white"
                disabled={files.length === 0}
              >
                Add Documents
              </button>
            </div>
          </div>
        )}

        {/* Web Link */}
        {activeTab === "link" && (
          <div>
            <label className="block text-sm mb-2">Link Name</label>
            <input
              type="text"
              placeholder="Enter link name"
              className="w-full p-2 border rounded mb-4"
              onChange={(e)=>handleEditLinkName(e)}
            />

            <label className="block text-sm mb-2">Web Link</label>
            <input
              type="url"
              placeholder="Enter URL (https://...)"
              className="w-full p-2 border rounded mb-4"
              onChange={(e)=>handleEditWebLink(e)}
            />

            <p className="text-xs text-gray-500 mb-4">
              Note: Web links must be valid URLs beginning with http:// or https://
            </p>

            <div className="flex justify-between">
              <button onClick={handleAddDocumnetCancel}  className="px-4 py-2 rounded bg-gray-200">
                Cancel
              </button>
              <button
                onClick={handleLinkSubmit}
                className="px-4 py-2 rounded bg-[#5074b6] text-white"
              >
                Add Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
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
