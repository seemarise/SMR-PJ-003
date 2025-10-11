"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, PlusCircle } from "lucide-react";

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
      // Don't delete the last question, maybe clear it instead or show a message
      alert("You cannot delete the only question.");
      return;
    }
    const newQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
    setQuestions(newQuestions);
    // Adjust index to stay in bounds
    setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
  };

  const handleSaveAll = () => {
    // Basic validation
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

  if (!currentQuestion) return null; // Or a loading/empty state

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Edit Quiz Questions</h1>
        <button onClick={handleSaveAll} className="text-lg font-semibold text-[#5074b6] hover:text-[#3d5a94]">
          Save
        </button>
      </header>

      {/* Pagination */}
      <div className="flex items-center justify-center p-3">
        <button
          onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-3 py-1 rounded-md disabled:opacity-50"
        > &lt; </button>
        <div className="bg-gray-200 text-gray-700 text-sm font-medium px-4 py-1 rounded-full">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <button
          onClick={() => setCurrentQuestionIndex(i => Math.min(questions.length - 1, i + 1))}
          disabled={currentQuestionIndex === questions.length - 1}
          className="px-3 py-1 rounded-md disabled:opacity-50"
        > &gt; </button>
      </div>

      {/* Form Body */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
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

      {/* Footer Actions */}
      <footer className="flex items-center gap-4 p-4 border-t">
        <button onClick={handleDeleteQuestion} disabled={questions.length <= 1} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button onClick={handleAddNewQuestion} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <PlusCircle className="w-4 h-4" />
          Add New
        </button>
        <button onClick={handleSaveAll} className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
          Save All Questions
        </button>
      </footer>
    </div>
  );
}