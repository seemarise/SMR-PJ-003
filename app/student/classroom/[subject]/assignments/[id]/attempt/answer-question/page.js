"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AssignmentQuizPage() {
    const router = useRouter();

    const questions = [
        {
            id: 1,
            question:
                "What is the scope of a variable defined outside any function in Python?",
            options: [
                "Local Scope",
                "Global Scope",
                "Function Scope",
                "Module Scope",
            ],
            answer: "Global Scope",
        },
        {
            id: 2,
            question: "When do you need to use the global keyword in Python?",
            options: [
                "When defining a variable outside a function",
                "When modifying the value of a global variable inside a function",
                "When using a variable inside a function",
                "When defining a function",
            ],
            answer: "When modifying the value of a global variable inside a function",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});

    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (option) => {
        setSelectedOptions({ ...selectedOptions, [currentQuestion.id]: option });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const progressText = `${Object.keys(selectedOptions).length} of ${questions.length} answered`;

    return (
        <div className="flex flex-col min-h-screen bg-white md:bg-gray-50">
            {/* ===== Header (Separated for Desktop) ===== */}
            <div className="px-5 py-3 md:px-[0px] md:pt-10 md:pb-4 md:max-w-5xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between relative">
                    <button
                        onClick={() => router.back()}
                        className="p-1 rounded-full hover:bg-gray-100 transition md:p-2 cursor-pointer md:shadow-sm"
                    >
                        <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 text-[#5074b6]" />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="text-[20px] md:text-[30px] font-bold text-[#5074b6]">
                            Assignment Quiz
                        </h1>
                    </div>

                    <div className="w-8 h-8 md:w-10 md:h-10" />
                </div>
            </div>

            {/* ===== Main Content ===== */}
            <main className="flex-1 px-5 pb-6 md:px-8 md:pb-10">
                <div className="md:max-w-4xl md:mx-auto md:bg-white md:rounded-2xl md:shadow-sm md:p-8 md:space-y-6">
                    {/* ===== Progress Section ===== */}
                    <div className="mb-4 md:mb-6">
                        <p className="text-[15px] font-medium text-gray-700">Progress</p>
                        <p className="text-[13px] text-gray-500 mb-1">{progressText}</p>
                        <div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#5074b6] transition-all"
                                style={{
                                    width: `${(Object.keys(selectedOptions).length / questions.length) * 100
                                        }%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* ===== Question Card ===== */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-5 md:p-6 md:rounded-2xl">
                        <p className="text-[#5074b6] bg-[#e7edf9] px-4 py-1 rounded-lg text-[14px] font-medium w-fit mb-3 md:text-[15px]">
                            Question {currentIndex + 1} of {questions.length}
                        </p>

                        <p className="text-[16px] md:text-[18px] font-medium mb-4 text-gray-900">
                            {currentQuestion.question}
                        </p>

                        <p className="text-[15px] font-semibold text-gray-700 mb-3">
                            Select an answer:
                        </p>

                        <div className="flex flex-col gap-3">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`flex items-center gap-3 w-full border-2 rounded-xl px-4 py-3 text-left text-[15px] cursor-pointer md:text-[16px] transition-all ${selectedOptions[currentQuestion.id] === option
                                        ? "border-[#5074b6] bg-[#e7edf9] text-[#5074b6] font-semibold"
                                        : "border-gray-300 text-gray-800 hover:border-[#5074b6]/50"
                                        }`}
                                >
                                    <span
                                        className={`w-6 h-6 flex items-center justify-center rounded-full border ${selectedOptions[currentQuestion.id] === option
                                            ? "bg-[#5074b6] text-white border-[#5074b6]"
                                            : "border-gray-400 text-gray-600"
                                            }`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ===== Navigation Buttons ===== */}
                    <div className="flex justify-between items-center mt-4 md:mt-6">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg border cursor-pointer font-medium transition ${currentIndex === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "text-[#5074b6] border-[#5074b6] hover:bg-[#e7edf9]"
                                }`}
                        >
                            ← Previous
                        </button>

                        <button
                            onClick={handleNext}
                            className="bg-[#5074b6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#4060a3] transition cursor-pointer"
                        >
                            Next →
                        </button>
                    </div>

                    {/* ===== Submit Button ===== */}
                    <div className="flex justify-center w-full mt-4 md:mt-8">
                        <button className="bg-gray-200 text-gray-400 px-6 py-2 rounded-lg font-medium cursor-not-allowed flex items-center gap-2 ">
                            ✓ Submit Answers
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
