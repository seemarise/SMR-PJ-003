"use client";
import Link  from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSubmissions } from "@/services/classroomService/classroomApi";
import { useState, useEffect } from "react";
import React from "react";
export default function AssignmentDetails({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { class: className, section, subject } = React.use(params) ;
  const title = searchParams.get("title");
  const [submissions, setSubmissions] = useState({
    "submissions": [],
    "submittedCount": 0
  });
  
  const { id } = React.use(params);
  
  useEffect(() => {
    async function fetchSubmissions() {
      let res = await getSubmissions([id]);
      setSubmissions(res.data);
    };
    fetchSubmissions();
  }, []);
  
  function formatDateTime(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);

    // Date part
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    // Time part
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "P.M" : "A.M";
    hours = hours % 12 || 12; // convert 0 → 12
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} - ${formattedTime}`;
  }


  return (<div className="flex flex-col min-h-screen bg-gray-50">
    <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
      {/* Main container for desktop alignment */}
      <div className="md:max-w-5xl md:mx-auto md:space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
          </button>

          <h1 className="text-xl font-bold text-[#5074b6] md:text-3xl md:font-bold">
            {title ? title : ""}
          </h1>
          <div>
          </div>
        </div>
        {submissions.submissions.length === 0 ? (
          <div>No submissions yet.</div>
        ) : (
          submissions.submissions.map((sub, key) => {
            // Tailwind classes for status
            let headerClass = "";
            let badgeClass = "";
            let arrowClass = "";
            switch (sub.approvalStatus.toLowerCase()) {
              case "pending":
                headerClass = "bg-[#f9eff0] text-[#d08488]";
                badgeClass = "bg-[#eed3d5] text-[#d08488]";
                arrowClass = "text-[#d08488]";
                break;
              case "rejected":
                headerClass = "bg-[#feeceb] text-[#f55f54]";
                badgeClass = "bg-[#fde3e1] text-[#f55f54]";
                arrowClass = "text-[#f55f54]";
                break;
              case "approved":
                headerClass = "bg-[#edf7ed] text-[#6bbd6e]";
                badgeClass = "bg-[#cde9ce] text-[#6bbd6e]";
                arrowClass = "text-[#6bbd6e]";
                break;
              default:
                headerClass = "bg-white";
                badgeClass = "bg-gray-200 text-black";
                arrowClass = "text-black";
            }

            return (
              <div
                key={key}
                className="rounded-lg mb-4 shadow-sm md:p-0 md:rounded-2xl md:shadow-md md:space-y-6"
              >
                {/* Submission Info (colored header) */}
                <div className={`p-4 md:p-8 mb-0 rounded-t-lg md:rounded-t-2xl ${headerClass}`}>
                  <div className="flex justify-between items-center mb-3 md:mb-5">
                    <p className="text-sm md:text-base font-medium">
                      Submitted on: {formatDateTime(sub.submittedOn)}
                    </p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full md:text-sm md:px-4 font-semibold ${badgeClass}`}
                    >
                      {sub.approvalStatus}
                    </span>
                  </div>
                </div>

                {/* Student Info (pure white) */}
                <div
                  onClick={() =>
                    router.push(
                      `/classroom/class10/a/english/assignments/${id}/submission/${sub._id}?title=${title} By ${sub.submittedBy.name}`
                    )
                  }
                  className="flex items-center gap-4 bg-white rounded-b-lg p-3 shadow cursor-pointer hover:bg-gray-50 transition md:p-6 md:rounded-b-2xl md:shadow-sm"
                >
                  <img
                    src={sub.submittedBy.profileImage}
                    alt={sub.submittedBy.name}
                    className="w-12 h-12 rounded-full object-cover md:w-16 md:h-16"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800 md:text-xl">
                      {sub.submittedBy.name}
                    </h2>
                    <p className="text-sm text-gray-500 md:text-base">
                      {"Class " + sub.submittedBy.className + " - Section " + sub.submittedBy.section}
                    </p>
                  </div>
                  <Link key={`${sub.submittedBy._id}`} href={`${id}/submission/${sub._id}?title=${title} By ${sub.submittedBy.name}`}>
                      <span className={`text-xl md:text-2xl ${arrowClass}`}>›</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  </div>);
}
