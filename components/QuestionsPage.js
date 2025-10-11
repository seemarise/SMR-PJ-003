"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Trash2, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditQuestionsPage({ onSubmit, value }) {
    const router = useRouter();

    const [tab, setTab] = useState("mcq");
    const [currentIndex, setCurrentIndex] = useState(0);

    const [mcqQuestions, setMcqQuestions] = useState([
        ...(value.MCQs),
        { question: "", answerOptions: ["", "", "", ""], correctOptionIndex: 0 },
    ]);

    const [descQuestions, setDescQuestions] = useState([
        ...(value.descriptive),
        { question: "", answer: "" },
    ]);

    const handleAddQuestion = () => {
        if (tab === "mcq") {
            const newQuestion = {
                question: "",
                answerOptions: ["", "", "", ""],
                correctOptionIndex: 0,
            };
            setMcqQuestions([...mcqQuestions, newQuestion]);
            setCurrentIndex(mcqQuestions.length);
        } else {
            const newQuestion = { question: "", answer: "" };
            setDescQuestions([...descQuestions, newQuestion]);
            setCurrentIndex(descQuestions.length);
        }
    };

    const handleRemoveQuestion = () => {
        if (tab === "mcq" && mcqQuestions.length > 1) {
            const updated = mcqQuestions.filter((_, i) => i !== currentIndex);
            setMcqQuestions(updated);
            setCurrentIndex(Math.max(0, currentIndex - 1));
        } else if (tab === "descriptive" && descQuestions.length > 1) {
            const updated = descQuestions.filter((_, i) => i !== currentIndex);
            setDescQuestions(updated);
            setCurrentIndex(Math.max(0, currentIndex - 1));
        }
    };

    const handleSaveAndReturn = () => {
        if (onSubmit) {

            onSubmit({ MCQs: mcqQuestions.filter(mcq => !!mcq.question), descriptive: descQuestions.filter(mcq => !!mcq.question) });
        }
    };

    const isMcq = tab === "mcq";
    const questions = isMcq ? mcqQuestions : descQuestions;
    const current = questions[currentIndex];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="px-4 py-4 flex-1 md:px-8 md:py-10">
                <div className="md:max-w-5xl md:mx-auto md:space-y-10">


                    {/* Tabs */}
                    <div className="flex w-full max-w-2xl justify-center gap-10 border-b border-gray-300 mb-4 mx-auto">
                        <button
                            className={`pb-2 text-sm font-medium ${tab === "mcq"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                                }`}
                            onClick={() => {
                                setTab("mcq");
                                setCurrentIndex(0);
                            }}
                        >
                            MCQs
                        </button>
                        <button
                            className={`pb-2 text-sm font-medium ${tab === "descriptive"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                                }`}
                            onClick={() => {
                                setTab("descriptive");
                                setCurrentIndex(0);
                            }}
                        >
                            Descriptive
                        </button>
                    </div>

                    {/* Question Navigation */}
                    <div className="flex items-center justify-between w-full max-w-2xl mb-3 mx-auto">
                        <button
                            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentIndex === 0}
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <p className="font-semibold text-gray-700">
                            Question {currentIndex + 1} of {questions.length}
                        </p>
                        <button
                            onClick={() =>
                                setCurrentIndex((prev) =>
                                    Math.min(prev + 1, questions.length - 1)
                                )
                            }
                            disabled={currentIndex === questions.length - 1}
                        >
                            <ArrowRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Question Card */}
                    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 space-y-4 mx-auto md:p-6 md:rounded-xl">
                        {/* Common Question Field */}
                        <div>
                            <label className="block font-semibold mb-1 text-gray-800">
                                Question
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 resize-none"
                                placeholder="Enter question text"
                                rows={2}
                                value={current.question}
                                onChange={(e) => {
                                    const updated = [...questions];
                                    updated[currentIndex].question = e.target.value;
                                    isMcq
                                        ? setMcqQuestions(updated)
                                        : setDescQuestions(updated);
                                }}
                            />
                        </div>

                        {isMcq ? (
                            <div>
                                <label className="block font-semibold mb-1 text-gray-800">
                                    Options (select the correct answer)
                                </label>
                                <div className="space-y-2">
                                    {current.answerOptions.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center border border-gray-300 rounded-md p-2"
                                        >
                                            <input
                                                type="radio"
                                                name="correct"
                                                checked={current.correctOptionIndex === i}
                                                onChange={() => {
                                                    const updated = [...mcqQuestions];
                                                    updated[currentIndex].correctOptionIndex = i;
                                                    setMcqQuestions(updated);
                                                }}
                                                className="mr-2 accent-blue-600"
                                            />
                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) => {
                                                    const updated = [...mcqQuestions];
                                                    updated[currentIndex].answerOptions[i] =
                                                        e.target.value;
                                                    setMcqQuestions(updated);
                                                }}
                                                className="w-full outline-none"
                                                placeholder={`Option ${i + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block font-semibold mb-1 text-gray-800">
                                    Answer
                                </label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 resize-none"
                                    placeholder="Enter answer text"
                                    rows={3}
                                    value={current.answer}
                                    onChange={(e) => {
                                        const updated = [...descQuestions];
                                        updated[currentIndex].answer = e.target.value;
                                        setDescQuestions(updated);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="w-full max-w-2xl flex flex-col gap-3 mt-6 mx-auto">
                        <button
                            onClick={handleAddQuestion}
                            className="flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
                        >
                            <Plus size={18} /> Add Question
                        </button>
                        <button
                            onClick={handleRemoveQuestion}
                            className="flex justify-center items-center gap-2 bg-red-500 text-white py-3 rounded-full font-semibold shadow-md hover:bg-red-600 transition"
                        >
                            <Trash2 size={18} /> Remove Current Question
                        </button>
                        <button
                            onClick={handleSaveAndReturn}
                            className="flex justify-center items-center gap-2 bg-green-600 text-white py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition"
                        >
                            <Save size={18} /> Save & Return
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
