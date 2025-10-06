"use client";
import { useState } from "react";
import { ArrowLeft, Calendar, ChevronRight, ChevronDown, FileText } from "lucide-react";

// Mock ExamDetailsView component
function ExamDetailsView({ exam, onBack }) {
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto transition-all duration-300">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-4 md:max-w-5xl md:mx-auto">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-[#5074b6] md:text-xl">Exam Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-20 md:max-w-5xl md:mx-auto md:pb-8">
        {/* Exam Title */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
            {exam.title}
          </h2>
          <p className="text-base text-[#5074b6] mt-1 md:text-lg">{exam.subject}</p>
        </div>

        {/* Exam Info */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-500 delay-100 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 md:bg-white md:p-6 md:rounded-xl md:shadow-sm">
          <div className="flex items-center gap-3 text-gray-700 transition-transform hover:translate-x-1 duration-200">
            <Calendar className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
            <span className="text-sm md:text-base">{exam.date}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 transition-transform hover:translate-x-1 duration-200">
            <FileText className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
            <span className="text-sm md:text-base">Total Marks: {exam.marks}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 transition-transform hover:translate-x-1 duration-200">
            <ChevronRight className="w-5 h-5 text-[#5074b6] md:w-6 md:h-6" />
            <span className="text-sm md:text-base">{exam.mainTopics} Main Topics</span>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4 animate-in fade-in slide-in-from-left duration-400 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 md:items-start">
          {exam.topics?.map((topic, idx) => (
            <div
              key={topic.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom duration-400 md:self-start"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 cursor-pointer select-none"
              >
                <div className="text-left">
                  <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 md:text-sm">
                    {topic.subtopics.length} subtopics
                  </p>
                </div>
                <div className={`transition-transform duration-300 ${expandedTopics[topic.id] ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedTopics[topic.id]
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-5 pb-4 space-y-3">
                  {topic.subtopics?.map((subtopic, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pl-2 animate-in fade-in slide-in-from-left duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#5074b6] mt-2 flex-shrink-0 transition-transform hover:scale-150 duration-200" />
                      <span className="text-sm text-gray-700 md:text-base">{subtopic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchoolExamsPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("English");
  const [showExamDetails, setShowExamDetails] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // Exam data
  const examsData = {
    English: [
      {
        id: 1,
        title: "Final Exam",
        description: "The final Exam for the session 2025-26",
        date: "01 Mar 2026",
        subject: "English",
        marks: 100,
        mainTopics: 4,
        documents: 0,
        chapters: "Prose, Poetry, Supplementary reader, Grammar",
        topics: [
          {
            id: 1,
            name: "Prose",
            subtopics: [
              "Reading comprehension",
              "Chapter-based q&a",
              "Character sketch",
              "Plot analysis"
            ]
          },
          {
            id: 2,
            name: "Poem",
            subtopics: [
              "The last monsoon rain",
              "The bridge of courage",
              "The mirror's reply",
              "An echo in the attic"
            ]
          },
          {
            id: 3,
            name: "Supplementary reader",
            subtopics: [
              "Character development",
              "Plot summary & major events",
              "Analysis of key incidents",
              "Moral of the story"
            ]
          },
          {
            id: 4,
            name: "Grammar",
            subtopics: [
              "Tenses",
              "Parts of speech",
              "Active and passive voice",
              "Punctuation"
            ]
          }
        ]
      }
    ]
  };

  const handleViewDetails = (exam) => {
    setSelectedExam(exam);
    setShowExamDetails(true);
  };

  const handleBack = () => {
    if (showExamDetails) {
      setShowExamDetails(false);
      setSelectedExam(null);
    } else {
      // Navigate back to previous page
      window.history.back();
    }
  };

  // Exam Details View
  if (showExamDetails && selectedExam) {
    return <ExamDetailsView exam={selectedExam} onBack={handleBack} />;
  }

  // Main School Exams View
  const currentExams = examsData[selectedSubject] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-4 md:max-w-5xl md:mx-auto">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-[#5074b6] md:text-xl">School Exams</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 md:max-w-5xl md:mx-auto md:pb-8">
        {/* Filters Card */}
        <div className="bg-gray-100 rounded-2xl p-6 space-y-5 md:bg-white md:shadow-sm">
          {/* Class and Section Row */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm text-gray-600 mb-2 block md:text-base">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 bg-white border-none rounded-lg text-gray-800 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5074b6] md:text-base"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center'
                }}
              >
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block md:text-base">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 bg-white border-none rounded-lg text-gray-800 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5074b6] md:text-base"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center'
                }}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Subject */}
            <div className="col-span-2 md:col-span-1">
              <label className="text-sm text-gray-600 mb-2 block md:text-base">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 bg-white border-none rounded-lg text-gray-800 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5074b6] md:text-base"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center'
                }}
              >
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button className="w-full bg-[#5074b6] text-white font-semibold py-3 rounded-xl hover:bg-[#5074b6] transition-colors active:scale-95 cursor-pointer md:text-base">
            Apply Filters
          </button>
        </div>

        {/* Exam Cards */}
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {currentExams.length > 0 ? (
            currentExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom duration-300 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 md:text-2xl">{exam.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 md:text-base">{exam.description}</p>
                  </div>
                  <span className="bg-blue-100 text-[#5074b6] px-3 py-1 rounded-lg text-sm font-medium md:text-base md:px-4 md:py-2">
                    {exam.subject}
                  </span>
                </div>

                {/* Date and View Details */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-sm font-medium md:text-base">{exam.date}</span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(exam)}
                    className="flex items-center gap-1 text-[#5074b6] font-medium text-sm hover:text-[#5074b6] transition-colors active:scale-95 cursor-pointer md:text-base"
                  >
                    View details
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500 col-span-2 md:text-lg">
              No exams available for this subject
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SchoolExamsPage;