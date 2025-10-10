"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Info, FileText, Upload, HelpCircle } from "lucide-react";

export default function AssignmentDetailsPage() {
    const router = useRouter();
    const { id, subject } = useParams();

    const assignment = {
        title: "Python",
        subtitle: "Scope",
        dueDate: "27/09/2025",
        quizCount: 5,
        instructions: "Learn and give an attempt",
        submissionFormat: "word pdf",
        contents: `7.8.2 Global Scope

A variable, with global scope can be used anywhere in the program. It can be created by defining a variable outside the scope of any function.

Rules of global Keyword
The basic rules for global keyword in Python are:
• When we define a variable outside a function, it’s global by default. You don’t have to use global keyword.
• We use global keyword to modify the value of the global variable inside a function.
• Use of global keyword outside a function has no effect

Use of global Keyword
c = 1
# global variable
def add():
    print(c)
add()
Output:
1

Example : 7.8.2 (a) Accessing global Variable From inside a Function`,
    };

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            {/* ===== Header (Separated for Desktop) ===== */}
            <div className="px-5 py-3 md:px-[7px] md:pt-10 md:pb-4 md:max-w-5xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between relative">
                    <button
                        onClick={() => router.back()}
                        className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 md:shadow-sm"
                    >
                        <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="text-[21px] md:text-[30px] font-bold text-[#5074b6]">
                            Assignment Details
                        </h1>
                    </div>

                    <div className="w-8 h-8 md:w-10 md:h-10" />
                </div>
            </div>

            {/* ===== Main Content ===== */}
            <main className="flex-1 px-5 pb-6 md:px-8 md:pb-10">
                <div className="md:max-w-4xl md:mx-auto md:bg-white md:rounded-2xl md:shadow-sm md:p-8 md:space-y-6">

                    {/* ===== Red Header Box ===== */}
                    <div className="bg-[#b15a5a] rounded-xl p-4 text-white md:flex md:items-center md:justify-between md:p-6">
                        <div>
                            <h2 className="text-[18px] font-semibold">{assignment.title}</h2>
                            <p className="text-[15px]">{assignment.subtitle}</p>
                        </div>

                        <div className="flex justify-between md:justify-end md:gap-10 mt-3 md:mt-0">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <p className="text-[14px]">
                                    <span className="font-semibold">Due Date:</span> {assignment.dueDate}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-6">
                                <HelpCircle className="w-4 h-4" />
                                <p className="text-[14px]">
                                    <span className="font-semibold">Quiz:</span> {assignment.quizCount} questions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ===== Assignment Details Section ===== */}
                    <div className="bg-white border mt-3 border-gray-200 rounded-xl p-4 shadow-sm md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Info className="w-5 h-5 text-[#5074b6]" />
                            <h3 className="text-[17px] md:text-[20px] font-semibold text-gray-800">
                                Assignment Details
                            </h3>
                        </div>

                        <p className="text-[15px] font-semibold mb-1">Instructions</p>
                        <p className="text-[14px] mb-3">{assignment.instructions}</p>

                        <p className="text-[15px] font-semibold mb-1">Submission Format</p>
                        <p className="text-[14px] mb-3">{assignment.submissionFormat}</p>

                        <p className="text-[15px] font-semibold mb-1">Contents</p>
                        <pre className="text-[14px] whitespace-pre-wrap leading-relaxed">
                            {assignment.contents}
                        </pre>
                    </div>

                    {/* ===== Quiz Section ===== */}
                    <div className="bg-white border mt-3 border-gray-200 rounded-xl p-4 shadow-sm md:p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-[#5074b6]" /> Quiz Questions
                            </h3>
                            <span className="text-gray-500 text-[13px] bg-gray-100 rounded-full px-3 py-1">
                                Not Started
                            </span>
                        </div>

                        <p className="text-[14px] mb-3 text-gray-700">
                            Complete the {assignment.quizCount} questions for this assignment.
                        </p>

                        <button className="w-full bg-[#5074b6] text-white py-2 rounded-lg font-medium shadow-sm hover:bg-[#4060a3]"
                            onClick={() => {
                                router.push(`/student/classroom/${subject}/assignments/${id}/attempt/answer-question`);

                            }}
                        >
                            Answer Questions
                        </button>
                    </div>

                    {/* ===== Upload Section ===== */}
                    <div className="bg-white border mt-3 border-gray-200 rounded-xl p-4 shadow-sm md:p-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-[#5074b6]" /> Upload Assignment Files
                            </h3>
                            <span className="text-gray-500 text-[8px] md:text-[13px] bg-gray-100 rounded-full px-3 py-1">
                                0 files selected
                            </span>
                        </div>

                        <p className="text-[14px] text-gray-700 mb-3">
                            Upload your assignment files (PDF, DOC, DOCX, JPG, JPEG, PNG)
                        </p>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl py-6 text-center text-gray-500 text-[14px]">
                            Click to select files
                        </div>
                    </div>

                    {/* ===== Buttons ===== */}
                    <div className="flex flex-col gap-3 mt-6 md:mt-8">
                        <button className="bg-[#5074b6] text-white font-medium py-3 rounded-lg shadow-sm hover:bg-[#4060a3]">
                            ✨ AI Magic
                        </button>

                        <button className="bg-[#38b000] text-white font-medium py-3 rounded-lg shadow-sm hover:bg-[#2f9200]">
                            Submit Assignment
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
