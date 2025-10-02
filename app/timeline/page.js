"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProgressTrackingPage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("English");
  const [activeTab, setActiveTab] = useState("vad"); // 'vad' or 'school'
  const [currentView, setCurrentView] = useState("main"); // 'main', 'test-detail', 'topic-detail'
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subtopicStates, setSubtopicStates] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sample data structure
  const vadTests = [
    {
      id: 1,
      name: "VAD TEST 1",
      progress: 100,
      topics: [
        {
          name: "Prose",
          completed: 4,
          total: 4,
          progress: 100,
          subtopics: [
            { name: "Reading comprehension", completed: true },
            { name: "Chapter-based q&a", completed: true },
            { name: "Character sketch", completed: true },
            { name: "Plot analysis", completed: true }
          ]
        },
        {
          name: "Semantics",
          completed: 3,
          total: 3,
          progress: 100,
          subtopics: [
            { name: "Lexical", completed: true },
            { name: "Formal", completed: true },
            { name: "Cognitive", completed: true }
          ]
        }
      ]
    }
  ];

  const schoolExams = [
    {
      id: 1,
      name: "Final exam",
      date: "01 Mar 2026",
      progress: 100,
      topics: [
        {
          name: "Prose",
          completed: 4,
          total: 4,
          progress: 100,
          subtopics: [
            { name: "Reading comprehension", completed: true },
            { name: "Chapter-based q&a", completed: true },
            { name: "Character sketch", completed: true },
            { name: "Plot analysis", completed: true }
          ]
        },
        {
          name: "Poem",
          completed: 4,
          total: 4,
          progress: 100,
          subtopics: [
            { name: "The last monsoon rain", completed: true },
            { name: "The bridge of courage", completed: true },
            { name: "The mirror's reply", completed: true },
            { name: "An echo in the attic", completed: true }
          ]
        },
        {
          name: "Supplementary reader",
          completed: 4,
          total: 4,
          progress: 100,
          subtopics: [
            { name: "Character development", completed: true },
            { name: "Plot summary & major events", completed: true },
            { name: "Analysis of key incidents", completed: true },
            { name: "Moral of the story", completed: true }
          ]
        },
        {
          name: "Grammar",
          completed: 4,
          total: 4,
          progress: 100,
          subtopics: [
            { name: "Tenses", completed: true },
            { name: "Parts of speech", completed: true },
            { name: "Active and passive voice", completed: true },
            { name: "Punctuation", completed: true }
          ]
        }
      ]
    }
  ];

  const currentTests = activeTab === "vad" ? vadTests : schoolExams;

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 300);
  };

  const toggleSubtopic = (topicName, subtopicIndex) => {
    const key = `${topicName}-${subtopicIndex}`;
    setSubtopicStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSubtopicCompleted = (topicName, subtopicIndex, defaultValue) => {
    const key = `${topicName}-${subtopicIndex}`;
    return subtopicStates[key] !== undefined ? subtopicStates[key] : defaultValue;
  };

  const renderMainView = () => (
    <div className={`space-y-4 transition-all duration-300 ${
      isTransitioning 
        ? `opacity-0 ${activeTab === 'vad' ? 'translate-x-full' : '-translate-x-full'}` 
        : 'opacity-100 translate-x-0'
    }`}>
      {currentTests.map((test) => (
        <div
          key={test.id}
          className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] transform"
          onClick={() => {
            setSelectedTest(test);
            setCurrentView("test-detail");
          }}
        >
          <h3 className="text-xl font-bold mb-4">{test.name}</h3>
          {test.date && (
            <p className="text-sm text-gray-600 mb-4">Date: {test.date}</p>
          )}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${test.progress}%` }}
              />
            </div>
            <span className="text-lg font-bold">{test.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTestDetailView = () => {
    if (!selectedTest) return null;

    return (
      <div className="space-y-4">
        {selectedTest.topics.map((topic, idx) => {
          const topicKey = `topic-${selectedTest.id}-${idx}`;
          const isTopicCompleted = subtopicStates[topicKey] !== undefined ? subtopicStates[topicKey] : true;
          
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="flex-1 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setCurrentView("topic-detail");
                  }}
                >
                  <h3 className="text-xl font-bold mb-1">{topic.name}</h3>
                  <p className="text-sm text-gray-600">
                    {topic.completed} of {topic.total} subtopics completed
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubtopicStates(prev => ({
                        ...prev,
                        [topicKey]: !isTopicCompleted
                      }));
                    }}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      isTopicCompleted ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div 
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-md ${
                        isTopicCompleted ? "right-0.5" : "left-0.5"
                      }`} 
                    />
                  </button>
                  <div 
                    className="cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
                    onClick={() => {
                      setSelectedTopic(topic);
                      setCurrentView("topic-detail");
                    }}
                  >
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTopicDetailView = () => {
    if (!selectedTopic) return null;

    return (
      <div className="space-y-6 pb-32">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Subtopics Progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${selectedTopic.progress}%` }}
              />
            </div>
            <span className="text-lg font-bold">{selectedTopic.progress}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {selectedTopic.subtopics.map((subtopic, idx) => {
            const isCompleted = isSubtopicCompleted(selectedTopic.name, idx, subtopic.completed);
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg"
              >
                <span className="text-lg flex-1">{subtopic.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubtopic(selectedTopic.name, idx);
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div 
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-md ${
                      isCompleted ? "right-0.5" : "left-0.5"
                    }`} 
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          {currentView !== "main" && (
            <button
              onClick={() => {
                if (currentView === "topic-detail") {
                  setCurrentView("test-detail");
                  setSelectedTopic(null);
                } else if (currentView === "test-detail") {
                  setCurrentView("main");
                  setSelectedTest(null);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-blue-600 flex-1 text-center transition-all duration-300">
            {currentView === "main"
              ? "Progress Tracking"
              : currentView === "test-detail"
              ? selectedTest?.name
              : selectedTopic?.name}
          </h1>
          {currentView !== "main" && <div className="w-10" />}
        </div>

        {/* Class and Section Info - Only show on main view */}
        {currentView === "main" && (
          <>
            <div className="bg-blue-50 rounded-xl p-4 mb-4 transition-all duration-300">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-1 block">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-1 block">Section</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="English">English</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleTabChange("vad")}
                className={`flex-1 py-2 font-semibold transition-all duration-300 ${
                  activeTab === "vad"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                VAD Tests
              </button>
              <button
                onClick={() => handleTabChange("school")}
                className={`flex-1 py-2 font-semibold transition-all duration-300 ${
                  activeTab === "school"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                School Exams
              </button>
            </div>
          </>
        )}

        {/* Show class/section info on detail views */}
        {(currentView === "test-detail" || currentView === "topic-detail") && (
          <div className="bg-blue-50 rounded-xl p-4 text-center mt-4 transition-all duration-300">
            <div className="font-bold text-lg mb-1">
              {selectedClass} - {selectedSection}
            </div>
            <div className="text-gray-600">Subject: {selectedSubject}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 mt-6 pb-6">
        {currentView === "main" && renderMainView()}
        {currentView === "test-detail" && renderTestDetailView()}
        {currentView === "topic-detail" && renderTopicDetailView()}
      </div>
    </div>
  );
}