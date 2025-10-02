"use client";

import { useState } from "react";
import NavbarTop from "@/components/NavbarTop";
import NavbarBottom from "@/components/NavbarBottom";
import SubjectCard from "@/components/SubjectCard";
import VadInfoModal from "@/components/VadInfoModal";
import VadTestDetails from "@/components/VadTestDetails";
import { ClipboardList } from "lucide-react";
import { useRouter } from 'next/navigation';
import withAuth from "../auth";
function VadTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const router = useRouter();

  // English test data
  const englishTestData = {
    testNumber: 1,
    subject: 'English',
    date: '01 Dec 2025',
    time: '02:30 PM - 04:00 PM',
    duration: '1h 30m',
    topics: [
      {
        id: 1,
        name: 'Prose',
        subtopics: [
          'Reading comprehension',
          'Chapter-based q&a',
          'Character sketch',
          'Plot analysis'
        ]
      },
      {
        id: 2,
        name: 'Semantics',
        subtopics: [
          'Lexical',
          'Formal',
          'Cognitive'
        ]
      }
    ],
    documents: [
      {
        id: 1,
        name: 'English.pdf',
        type: 'document/pdf'
      }
    ]
  };

  // Social Science test data
  const socialScienceTestData = {
    testNumber: 1,
    subject: 'Social Science',
    date: '01 Dec 2025',
    time: '02:30 PM - 04:00 PM',
    duration: '1h 30m',
    topics: [
      {
        id: 1,
        name: 'History',
        subtopics: [
          'Nationalism in Europe, nationalism in India (Part I)',
        ]
      },
      {
        id: 2,
        name: 'Geography',
        subtopics: [
          'Resources and development, agriculture',
        ]
      },
      {
        id: 3,
        name: 'Civics',
        subtopics: [
          'Power sharing, federalism',
        ]
      },
      {
        id: 4,
        name: 'Economics',
        subtopics: [
          'Development, Sectors of the Indian economy',
        ]
      }
    ],
    documents: [
      {
        id: 1,
        name: 'Social_Science.pdf',
        type: 'document/pdf'
      }
    ]
  };

  const handleSubjectClick = (subject) => {
    if (subject === 'English') {
      setSelectedSubject(englishTestData);
      setShowDetails(true);
      setIsExiting(false);
    } else if (subject === 'Social Science') {
      setSelectedSubject(socialScienceTestData);
      setShowDetails(true);
      setIsExiting(false);
    }
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowDetails(false);
      setIsExiting(false);
      // Delay clearing selectedSubject to allow animation to complete
      setTimeout(() => {
        setSelectedSubject(null);
      }, 50);
    }, 300);
  };

  // Show details page if a subject is selected
  if ((showDetails || isExiting) && selectedSubject) {
    return (
      <VadTestDetails 
        testData={selectedSubject} 
        onBack={handleBack}
        isExiting={isExiting}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white">
      {/* Top Navbar */}
      <NavbarTop />

      {/* Page Content */}
      <main className={`flex-1 px-4 py-6 space-y-6 ${isExiting ? 'animate-out fade-out slide-out-to-left duration-300' : 'animate-in fade-in duration-300'}`}>
        {/* Title Row */}
        <div className="relative flex items-center justify-between">
          {/* Left - School Exam */}
          <button onClick={() => router.push('/school-exams')} className="px-3 py-1 border border-gray-400 text-gray-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 active:scale-95">
            School Exam
          </button>

          {/* Center - VAD Test with doodle underline */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-xl font-bold">VAD Test</h2>
            <div className="w-28 h-3 mx-auto mt-0.5">
              <svg
                viewBox="0 0 140 12"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-red-500"
              >
                <path
                  d="M8 6 C20 3, 35 9, 50 6 S80 3, 95 6 S120 9, 132 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Right - Tasks Icon */}
          <ClipboardList 
            className="h-6 w-6 text-gray-700 cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-200 active:scale-95" 
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {/* Class Info */}
        <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg text-center shadow-sm">
          Class 10
        </div>

        {/* Subject Cards */}
        <div className="space-y-4">
          <SubjectCard 
            title="English" 
            date="01 Dec 2025" 
            imageSrc="/book.png"
            onClick={() => handleSubjectClick('English')}
          />
          <SubjectCard 
            title="Social Science" 
            date="01 Dec 2025" 
            imageSrc="/globe.png"
            onClick={() => handleSubjectClick('Social Science')}
          />
        </div>
      </main>

      {/* Bottom Navbar */}
      <NavbarBottom />

      {/* VAD Info Modal */}
      <VadInfoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default  withAuth(VadTestPage);