import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ExamDetailsView({ exam, onBack }) {
  const [activeTab, setActiveTab] = useState("syllabus");
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-blue-600">{exam.subject}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title and Marks */}
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{exam.subject}</h2>
          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
            {exam.marks} marks
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{exam.mainTopics} main topics</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{exam.documents} documents</span>
          </div>
        </div>

        {/* Chapters */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-2">Chapters & Details:</h3>
          <p className="text-sm text-gray-600">{exam.chapters}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("syllabus")}
            className={`flex-1 pb-3 text-sm font-medium transition-all duration-300 relative cursor-pointer ${
              activeTab === "syllabus" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Syllabus & Topics
            {activeTab === "syllabus" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in slide-in-from-left duration-300" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex-1 pb-3 text-sm font-medium transition-all duration-300 relative cursor-pointer ${
              activeTab === "documents" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Documents
            {activeTab === "documents" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in slide-in-from-right duration-300" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "syllabus" ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-left duration-400">
            {exam.topics.map((topic, idx) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom duration-400"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-900">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {topic.subtopics.length} subtopics
                    </p>
                  </div>
                  <div className={`transition-transform duration-300 ${expandedTopics[topic.id] ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedTopics[topic.id] 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 space-y-3">
                    {topic.subtopics.map((subtopic, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 pl-2 animate-in fade-in slide-in-from-left duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{subtopic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 animate-in fade-in slide-in-from-right duration-400">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No documents available</p>
          </div>
        )}
      </div>
    </div>
  );
}
