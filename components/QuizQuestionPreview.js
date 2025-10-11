"use client";

import React from 'react';
import { Edit, CheckCircle2 } from 'lucide-react';

export default function QuizQuestionsPreview({ questions, onEdit }) {
  if (!questions || questions.length === 0) {
    return null;
  }

  // We can show a few questions and have a "View all" button if needed.
  // For now, we'll show the first 3 as in your example.
  const questionsToShow = questions.slice(0, 3);
  const totalQuestions = questions.length;

  return (
    <div className="space-y-4 my-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl text-gray-800">Quiz Questions ({totalQuestions})</h2>
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-[#5074b6] hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Edit Quiz"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
        {/* Summary Box */}
        <div className="bg-[#5074b6]/10 text-[#3d5a94] p-3 rounded-md font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{totalQuestions} multiple-choice questions ready</span>
        </div>

        {/* Question List */}
        <div className="space-y-3">
          {questionsToShow.map((q, index) => (
            <div key={q.id || index} className="flex items-start gap-3">
              <div className="bg-[#5074b6] text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold">{index + 1}</div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{q.text}</p>
                <div className="text-sm text-green-700 flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="font-normal">Answer:</span>
                  <span className="font-semibold">{q.options[q.correctAnswerIndex]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {totalQuestions > 3 && (
          <div className="pt-2 text-center">
            {/* This button is for display; add onClick to show all if needed */}
            <button className="text-sm font-semibold text-[#5074b6] hover:underline">
              View all {totalQuestions} questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}