"use client";

import React, { useEffect, useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import VadInfoModal from "@/components/VadInfoModal";
import VadTestDetails from "@/components/VadTestDetails";
import { ClipboardList } from "lucide-react";
import { useRouter } from 'next/navigation';
import withAuth from "../auth";
import { getTestDetail, getVadTests } from "@/services/vadTestService/vadTestApi";
import moment from "moment";

function VadTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [vadTests, setVadTests] = useState([]);
  const [testDetail, setTestDetail] = useState([])

  const router = useRouter();

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await getVadTests();
        if (response.status) {
          setVadTests(response.data.vadTests);
        }
      } catch (err) {
        // console.error("Error fetching subjects:", err);
      }
    }
    fetchSubjects();
  }, [])

  const handleTestClick = async (test_id) => {
    try {
      const response = await getTestDetail(test_id);
      if (response.status) {
        setShowDetails(true)
        setTestDetail(response.data.vadTest);
      }
    } catch (err) {
      // console.error("Error fetching subjects:", err);
    }
  };

  const handleBack = () => {
    setTimeout(() => {
      setShowDetails(false);
    }, 300);
  };

  // Show details page if a subject is selected
  if (showDetails) {
    return (
      <VadTestDetails
        testData={testDetail}
        onBack={handleBack}
      />
    );
  } else {
    return (
      <div className="flex flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
        {/* Top Navbar */}
        {/* <NavbarTop /> */}

        {/* Page Content */}
        <main className={`flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 ${isExiting ? 'animate-out fade-out slide-out-to-left duration-300' : 'animate-in fade-in duration-300'}`}>
          {/* Title Row */}
          <div className="relative flex items-center justify-between md:max-w-5xl md:mx-auto">
            {/* Left - School Exam */}
            <button
              onClick={() => router.push('/school-exams')}
              className="px-3 py-1 border border-gray-400 text-gray-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 active:scale-95 md:px-5 md:py-2.5 md:text-base md:shadow-sm md:bg-white "
            >
              School Exam
            </button>

            {/* Center - VAD Test with doodle underline */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <h2 className="text-xl font-bold md:text-3xl">VAD Test</h2>
              <div className="w-28 h-3 mx-auto mt-0.5 md:w-40 md:h-4 md:mt-1">
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
              className="h-6 w-6 text-gray-700 cursor-pointer hover:text-[#5074b6] hover:scale-110 transition-all duration-200 active:scale-95 md:h-7 md:w-7"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Content Container - Centered on desktop */}
          <div className="md:max-w-5xl md:mx-auto md:space-y-8">
            {/* Test Info */}
            {vadTests?.map((vadTest, index) => {
              return <React.Fragment key={index}>
                <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg text-center shadow-sm md:text-xl md:py-3 md:bg-blue-50 md:border md:border-blue-200">
                  Class {vadTest.className}
                </div>

                {/* Subject Cards - Grid layout on desktop */}
                <div className="space-y-4 mt-3 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
                  {vadTest?.tests?.map((test, testIndex) => {
                    return <SubjectCard
                      key={testIndex}
                      title={test.subject}
                      date={moment(test.date).format("DD MMM YYYY")}
                      imageSrc={test.icon}
                      onClick={() => handleTestClick(test._id)}
                    />
                  })}
                </div>
              </React.Fragment>
            })}
          </div>

        </main>

        {/* VAD Info Modal */}
        <VadInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }
}

export default withAuth(VadTestPage);