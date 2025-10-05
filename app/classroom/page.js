"use client";

import React, { useEffect, useState } from "react";
import withAuth from "../auth";
import Link from "next/link";
import { getClassromSubjects } from "@/services/classroomService/classroomApi";

function Classroom() {
  const [subjects, setSubjects] = useState({})

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await getClassromSubjects(); // fetch from API
        setSubjects(response.data); // set subjects
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    }

    fetchSubjects();
  }, [])

  return (
    <main className="px-4 py-4 bg-white min-h-screen md:h-screen md:overflow-y-auto md:bg-gray-50 md:px-8 md:py-10">
      {/* Content Container - Centered on desktop */}
      <div className="md:max-w-5xl md:mx-auto mb-28">
        <Link href="/classroom/teacherdashboard">

          {/* Title Section */}
          <div className="bg-blue-600 text-white text-lg font-semibold rounded-lg py-3 px-4 mb-4 text-center md:text-2xl md:py-4">
            My Classroom
          </div>
        </Link>

        {/* Class Pill */}
        {subjects.classesAndSubjects?.map((classes) => {
          return <>
            <div className="flex justify-center mb-6 md:mb-8">
              <span className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full text-sm font-medium md:text-base md:px-6 md:py-2">
                Class {classes.className}
              </span>
            </div>
            {classes.sections?.map((section) => (
              <div key={section}>
                <p className="text-gray-700  text-center font-semibold mb-1 md:text-lg md:mb-3">Sec - {section.section}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                  {section.subjects?.map((subject) => (
                    <Link
                      key={subject}
                      href={`/classroom/${classes.className}/${section.section}/${subject.subjectName}?class=${classes.classId}&section=${section.sectionId}&subject=${subject.subjectId}`}
                    >
                      <div className="bg-white rounded-xl p-4 shadow text-blue-600 font-medium text-center cursor-pointer hover:bg-blue-50 hover:shadow-md transition md:p-5 md:text-lg md:shadow-sm">
                        {subject.subjectName}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </>
        })
        }


      </div>
    </main>
  );
}

export default withAuth(Classroom);