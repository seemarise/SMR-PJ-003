"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function CompendiumQuizPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [compendium, setCompendium] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const [score, setScore] = useState(null);

  function calculateScore(qs, ans) {
    let s = 0;
    for (let i = 0; i < qs.length; i++) {
      if (Number.isInteger(qs[i]?.answer) && ans[i] === qs[i].answer) s += 1;
    }
    return s;
  }

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1200);
  }

  // Load the compendium and any saved answers from localStorage
  useEffect(() => {
    if (!id) return;
    try {
      const all = JSON.parse(localStorage.getItem("compendia") || "[]");
      const found = all.find((c) => c.id === id);
      if (found) {
        setCompendium(found);
        const savedAnswers = Array.isArray(found.answers) ? found.answers : [];
        setAnswers(savedAnswers);
      }
    } catch {}
    setReady(true);
  }, [id]);

  const questions = useMemo(() => compendium?.quiz || [], [compendium]);

  function persistAnswers(nextAnswers) {
    try {
      const all = JSON.parse(localStorage.getItem("compendia") || "[]");
      const idx = all.findIndex((c) => c.id === id);
      if (idx >= 0) {
        all[idx] = { ...all[idx], answers: nextAnswers };
        localStorage.setItem("compendia", JSON.stringify(all));
      }
    } catch {}
  }

  function handleSelect(questionIndex, optionIndex) {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      persistAnswers(next);
      return next;
    });
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading Quiz...
      </div>
    );
  }

  if (!compendium) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Compendium not found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col pb-20 bg-white md:pb-8 md:bg-gray-50">
      <main className="flex-1 px-4 py-6 space-y-6 md:px-8 md:py-10 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 md:max-w-5xl md:mx-auto">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-blue-700">{compendium.title} — Quiz</h1>
        </div>

      {questions.length === 0 ? (
        <div className="text-gray-600 md:max-w-5xl md:mx-auto">No quiz added for this compendium.</div>
      ) : (
        <div className="space-y-4 md:max-w-5xl md:mx-auto">
          {questions.map((q, qi) => (
            <div key={q.id || qi} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between">
                <p className="font-medium text-gray-900">Q{qi + 1}. {q.text || "Untitled question"}</p>
                {Number.isInteger(q.answer) && answers[qi] === q.answer ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" title="Correct" />
                ) : null}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {(q.options || []).map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  return (
                    <label
                      key={oi}
                      className={`flex items-center gap-3 p-2 rounded-md border cursor-pointer ${
                        selected ? "border-blue-400 bg-white" : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        checked={selected}
                        onChange={() => handleSelect(qi, oi)}
                      />
                      <span className="text-sm text-gray-800">{opt || `Option ${oi + 1}`}</span>
                    </label>
                  );
                })}
              </div>
              {Number.isInteger(q.answer) ? (
                <div className="mt-2 text-xs text-gray-600">
                  Correct answer: Option {q.answer + 1}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex gap-3 md:max-w-5xl md:mx-auto">
        <button
          onClick={() => router.push(`/ethical-learning/${id}`)}
          className="flex-1 bg-white border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50"
        >
          Back to Compendium
        </button>
        <button
          onClick={() => {
            const s = calculateScore(questions, answers);
            setScore(s);
            // persist lastScore
            try {
              const all = JSON.parse(localStorage.getItem("compendia") || "[]");
              const idx = all.findIndex((c) => c.id === id);
              if (idx >= 0) {
                all[idx] = { ...all[idx], lastScore: s, lastScoreOutOf: questions.length };
                localStorage.setItem("compendia", JSON.stringify(all));
              }
            } catch {}
            showToast(`Saved. Score: ${s}/${questions.length}`);
          }}
          className="flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-[200]">
          {toast}
        </div>
      ) : null}

      {score !== null ? (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-lg px-5 py-3 text-sm text-gray-900 z-[200]">
          Your score: <span className="font-semibold">{score}</span> / {questions.length}
        </div>
      ) : null}
      </main>
    </div>
  );
}


