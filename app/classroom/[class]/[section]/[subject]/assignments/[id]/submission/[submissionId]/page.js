"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import { getSubmissionsInfoById,approveSubmissionBySubId,rejectSubmissionBySubId } from "@/services/classroomService/classroomApi";

export default function SubmissionDetails({ params }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const title = searchParams.get("title");
    const [submissionInfo,setSubmissionInfo] = useState({
        "submission" : {},
    });
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");
    const {submissionId} = React.use( params);

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
  
    useEffect(() => {
        async function fetchSubmissionInfo() {
            let res = await getSubmissionsInfoById([submissionId]);
            setSubmissionInfo(res.data);
        };
        fetchSubmissionInfo();
    }, []);

    const statusStyles = {
        pending: {
            header: "bg-[#f9eff0] text-[#d08488]",
            badge: "bg-[#eed3d5] text-[#d08488]",
            arrow: "text-[#d08488]",
            icon: "⏳",
        },
        rejected: {
            header: "bg-[#feeceb] text-[#f55f54]",
            badge: "bg-[#fde3e1] text-[#f55f54]",
            arrow: "text-[#f55f54]",
            icon: "❌",
        },
        approved: {
            header: "bg-[#edf7ed] text-[#6bbd6e]",
            badge: "bg-[#cde9ce] text-[#6bbd6e]",
            arrow: "text-[#6bbd6e]",
            icon: "✅",
        },
    };

    async function handleApproveSubmission(id){
        let res = await approveSubmissionBySubId([id]);
        if (res.statusCode == 200){
            alert(res.message);
            router.back();
        }
        else{
            alert("error");
        }
    };

    async function handleRejectSubmission(id){
        if (reason.trim() == ''){
            alert('Please provide a reason for rejection')
        }
        else{
            let res = await rejectSubmissionBySubId([id],{reason : reason});
            if (res.statusCode == 200){
                alert(res.message);
                setShowModal(false);
                router.back();
            }
            else{
                alert("error");
            }
        }
        
    };

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                {
                   Object.keys(submissionInfo.submission).length !== 0 && (
                        <div className="md:max-w-5xl md:mx-auto md:space-y-10">
                    {/* Header */}
                    <div className="relative flex items-center justify-between mb-6 md:mb-10">
                        {/* Back Button */}
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition md:p-3 md:shadow-sm"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
                        </button>

                        {/* Title Centered */}
                        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-blue-600 md:text-3xl md:font-bold text-center">
                            {title}
                        </h1>

                        {/* Right placeholder for symmetry */}
                        <div className="w-8 md:w-10" />
                    </div>

                    {/* Status Box */}
                    
                    <div className={`rounded-lg p-4 flex flex-col gap-2 mb-6 md:p-6 md:rounded-2xl md:shadow-sm ${
      statusStyles[submissionInfo.submission.approvalStatus]?.header
    }`}>
                        <span className="font-semibold flex items-center gap-2 md:text-lg">
      {statusStyles[submissionInfo.submission.approvalStatus]?.icon} {submissionInfo.submission.approvalStatus?.charAt(0).toUpperCase() +
 submissionInfo.submission.approvalStatus?.slice(1)}
    </span>
    <p className="text-sm text-gray-700 md:text-base">
      Submitted on: {formatDateTime(submissionInfo.submission.submittedOn)}
    </p>
                    </div>

                    {/* Student Info */}
                    <div>
                        <h2 className="text-blue-800 font-semibold mb-2 md:text-xl">
                            Student Information
                        </h2>
                        <div className="bg-white rounded-lg shadow p-4 flex gap-4 items-center mb-6 md:p-6 md:rounded-xl md:shadow-md">
                            <img
                                src={submissionInfo.submission.submittedBy.profileImage}
                                alt={submissionInfo.submission.submittedBy.name}
                                className="w-16 h-16 rounded-full object-cover md:w-20 md:h-20"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800 md:text-lg">
                                    {submissionInfo.submission.submittedBy.name}
                                </h3>
                                <p className="text-sm text-gray-500 md:text-base">
                                    🎓 {submissionInfo.submission.submittedBy.className}
                                </p>
                                <p className="text-sm text-gray-500 md:text-base">
                                    📝 Submission ID: {submissionInfo.submission.submissionId}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* MCQ Answers */}
                    <div>
                        <h2 className="text-blue-800 font-semibold mb-2 md:text-xl">
                            MCQ Answers
                        </h2>
                        <div className="space-y-3 mb-8 md:space-y-4">
                            {submissionInfo.submission.MCQAnswers.map((ans, i) => (
                                <div
                                    key={ans.qid}
                                    className="bg-white rounded-lg shadow p-3 flex flex-col md:p-5 md:rounded-xl md:shadow-sm"
                                >
                                    <span className="text-sm text-gray-600 md:text-base">
                                        {i + 1}. Question ID: {ans.questionId}
                                    </span>
                                    <span className="text-gray-900 font-medium md:text-lg">
                                        Selected Option: {ans.selectedOptionIndex + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reject Button */}
                    <div className="flex gap-3 w-full">
                        {submissionInfo.submission.approvalStatus === "approved" && (
                            <Button color="red" label="❌ Reject Assignment" onClick={() => setShowModal(true)} />
                        )}

                        {submissionInfo.submission.approvalStatus === "rejected" && (
                            <Button color="green" label="✅ Approve Assignment" onClick={() => handleApproveSubmission(submissionInfo.submission._id)} />
                        )}

                        {submissionInfo.submission.approvalStatus === "pending" && (
                            <>
                            <Button color="green" label="✅ Approve Assignment" onClick={() => handleApproveSubmission(submissionInfo.submission._id)} />
                            <Button color="red" label="❌ Reject Assignment" onClick={() => setShowModal(true)} />
                            </>
                        )}
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-transparent  pointer-events-auto z-50">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
                            <h2 className="text-lg font-semibold text-red-600 mb-4">
                            Please provide a reason for rejection:
                            </h2>
                            <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter reason"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-400 focus:outline-none"
                            rows="4"
                            />
                            <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                onClick={() => {
                                    setShowModal(false);
                                    setReason("");
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                onClick={()=>handleRejectSubmission(submissionId)}
                            >
                                Reject
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
                    )
                }
            </main>
        </div>
    );
}

function Button({ color, label, onClick }) {
  return (
    <button
      className={`w-full bg-${color}-500 text-white py-2 rounded-lg font-semibold 
                  flex items-center justify-center gap-2 shadow 
                  hover:bg-${color}-600 transition`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}