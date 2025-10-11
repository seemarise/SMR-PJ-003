"use client";

import React, { useState, useEffect } from "react";
// UPDATED: Added ChevronLeft and ChevronRight for navigation
import { Trash2, PlusCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

// This is a default empty question structure
const createNewQuestion = () => ({
  id: Date.now() + Math.random(), // more unique key
  text: "",
  options: ["", "", "", ""],
  correctAnswerIndex: 0,
});

export default function ManualQuizEditor({ initialQuestions, onSave, onClose }) {
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // If there are no initial questions, start with one empty question.
  useEffect(() => {
    if (!questions || questions.length === 0) {
      setQuestions([createNewQuestion()]);
    }
  }, [questions]);

  const currentQuestion = questions[currentQuestionIndex];

  // Handler to update the current question's text
  const handleQuestionTextChange = (e) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].text = e.target.value;
    setQuestions(newQuestions);
  };

  // Handler to update a specific option's text
  const handleOptionChange = (optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Handler to set the correct answer
  const handleCorrectAnswerChange = (optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].correctAnswerIndex = optionIndex;
    setQuestions(newQuestions);
  };

  // Add a new blank question and navigate to it
  const handleAddNewQuestion = () => {
    const newQuestions = [...questions, createNewQuestion()];
    setQuestions(newQuestions);
    setCurrentQuestionIndex(newQuestions.length - 1);
  };

  // Delete the current question
  const handleDeleteQuestion = () => {
    if (questions.length <= 1) {
      alert("You cannot delete the only question.");
      return;
    }
    const newQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const handleSaveAll = () => {
    for (const q of questions) {
      if (!q.text.trim()) {
        alert('All questions must have text.');
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        alert('All options must be filled in for every question.');
        return;
      }
    }
    onSave(questions);
  };

  if (!currentQuestion) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* UPDATED: Header now includes navigation buttons */}
        <header className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">Edit Quiz Questions</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
              disabled={currentQuestionIndex === 0}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous question"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full tabular-nums">
              {currentQuestionIndex + 1} / {questions.length}
            </span>

            <button
              onClick={() => setCurrentQuestionIndex(i => Math.min(questions.length - 1, i + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next question"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main (Scrollable Content) */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="font-medium text-gray-700">Question Text</label>
            <textarea
              value={currentQuestion.text}
              onChange={handleQuestionTextChange}
              placeholder="Enter your question here"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
              rows={4}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-gray-700">Answer Options</label>
              <span className="text-sm text-gray-500">Select Correct</span>
            </div>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-md font-bold text-white ${currentQuestion.correctAnswerIndex === index ? 'bg-[#5074b6]' : 'bg-gray-300'}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="radio"
                    name={`correct-answer-${currentQuestion.id}`}
                    checked={currentQuestion.correctAnswerIndex === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="w-5 h-5 accent-[#5074b6]"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between gap-4 p-4 border-t bg-gray-50 rounded-b-lg flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={handleDeleteQuestion} disabled={questions.length <= 1} className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button onClick={handleAddNewQuestion} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
              <PlusCircle className="w-4 h-4" />
              Add New
            </button>
          </div>
          <button onClick={handleSaveAll} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            Save All Questions
          </button>
        </footer>
      </div>
    </div>
  );
}