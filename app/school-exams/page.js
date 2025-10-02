"use client";
import withAuth from "../auth";
import { useState } from "react";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import ExamDetailsView from "@/components/ExamDetailsView"

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
        <div className="px-4 py-4 flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-blue-600">School Exams</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Filters Card */}
        <div className="bg-gray-100 rounded-2xl p-6 space-y-5">
          {/* Class and Section Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 bg-white border-none rounded-lg text-gray-800 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="text-sm text-gray-600 mb-2 block">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 bg-white border-none rounded-lg text-gray-800 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 bg-white border-none rounded-lg text-gray-800 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Apply Filters Button */}
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors active:scale-95 cursor-pointer">
            Apply Filters
          </button>
        </div>

        {/* Exam Cards */}
        <div className="space-y-4">
          {currentExams.length > 0 ? (
            currentExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{exam.description}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {exam.subject}
                  </span>
                </div>

                {/* Date and View Details */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium">{exam.date}</span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(exam)}
                    className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors active:scale-95 cursor-pointer"
                  >
                    View details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No exams available for this subject
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(SchoolExamsPage);