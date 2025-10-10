"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ManualQuizEditor() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1500);
  }

  useEffect(() => {
    // load draft from sessionStorage
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    if (draft && draft.quiz && draft.quiz.length) {
      setQuestions(draft.quiz);
    } else {
      // start with one blank question
      setQuestions([
        {
          id: Date.now().toString(),
          text: "",
          options: ["", "", "", ""],
          answer: 0,
        },
      ]);
    }
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    // persist to sessionStorage as user edits
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    draft.quiz = questions;
    sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
  }, [questions]);

  function updateQuestion(idx, patch) {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...patch };
      return copy;
    });
  }

  function updateOption(idx, optIndex, value) {
    setQuestions((prev) => {
      const copy = [...prev];
      const opts = [...copy[idx].options];
      opts[optIndex] = value;
      copy[idx].options = opts;
      return copy;
    });
  }

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      { id: Date.now().toString(), text: "", options: ["", "", "", ""], answer: 0 },
    ]);
    setActiveIndex(questions.length);
  }

  function deleteQuestion(idx) {
    if (!confirm("Delete this question?")) return;
    setQuestions((prev) => {
      const copy = prev.filter((_, i) => i !== idx);
      return copy.length ? copy : [{ id: Date.now().toString(), text: "", options: ["", "", "", ""], answer: 0 }];
    });
    setActiveIndex((ai) => Math.max(0, ai - 1));
  }

  function saveAll() {
    // Already saved to sessionStorage by effect. Also persist to a quizzes key (optional)
    const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
    draft.quiz = questions;
    sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
    showToast("All questions saved.");
    // Navigate back to the compendium upload page
    setTimeout(() => router.push("/ethical-learning/upload"), 600);
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <h2 className="text-lg font-semibold">Edit quiz questions</h2>

        <button
          onClick={() => {
            // we persist draft already; close/back to upload
            const draft = JSON.parse(sessionStorage.getItem("compendium_draft") || "{}");
            draft.quiz = questions;
            sessionStorage.setItem("compendium_draft", JSON.stringify(draft));
            showToast("Quiz saved.");
            setTimeout(() => router.push("/ethical-learning/upload"), 600);
          }}
          className="p-2 rounded-full bg-blue-600 text-white"
          title="Save"
        >
          <Check className="w-5 h-5" />
        </button>
      </div>

      {/* question pager */}
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-2">
          Question {activeIndex + 1} of {questions.length}
        </div>

        <div>
          <label className="font-medium text-gray-700">Question Text</label>
          <textarea
            value={questions[activeIndex]?.text || ""}
            onChange={(e) => updateQuestion(activeIndex, { text: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            placeholder="Enter the question here"
          />
        </div>
      </div>

      {/* answer options */}
      <div className="mb-4">
        <div className="font-medium mb-2">Answer Options</div>
        {["A", "B", "C", "D"].map((label, idx) => (
          <div key={idx} className="flex items-center gap-3 mb-2">
            <div className="w-6 text-sm font-medium">{label}</div>
            <input
              value={questions[activeIndex]?.options?.[idx] || ""}
              onChange={(e) => updateOption(activeIndex, idx, e.target.value)}
              placeholder={`Enter option ${label}`}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <input
              type="radio"
              name={`answer-${activeIndex}`}
              checked={questions[activeIndex]?.answer === idx}
              onChange={() => updateQuestion(activeIndex, { answer: idx })}
            />
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="flex items-center gap-3 border-t pt-4">
        <button
          onClick={() => deleteQuestion(activeIndex)}
          className="px-3 py-2 rounded-md bg-red-50 text-red-600 border border-red-100"
        >
          Delete
        </button>

        <button onClick={addQuestion} className="px-3 py-2 rounded-md bg-blue-600 text-white">
          + Add New
        </button>

        <div className="ml-auto">
          <button onClick={saveAll} className="px-4 py-2 bg-blue-700 text-white rounded-md">
            Save all Questions
          </button>
        </div>
      </div>

      {/* navigator */}
      <div className="mt-4 flex gap-2 overflow-auto">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setActiveIndex(i)}
            className={`px-3 py-1 rounded-md text-sm ${
              i === activeIndex ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Q{i + 1}
          </button>
        ))}
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-[200]">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
