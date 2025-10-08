"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function CreateQuizModal({ onClose, onManual, onCreateAI }) {
  const [count, setCount] = useState(5);
  const [method, setMethod] = useState("ai");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 relative">
        <button onClick={onClose} className="absolute right-3 top-3 p-1 rounded-full">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h3 className="text-lg font-semibold mb-3">Create Quiz Questions</h3>

        <label className="text-sm text-gray-700">How many questions would you like to create?</label>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 my-2"
        />

        <div className="mt-3">
          <div className="font-medium mb-2">Generation Method:</div>

          <label className="flex items-start gap-3 p-3 rounded-lg border transition mb-2 cursor-pointer" style={{ borderColor: method === "ai" ? "#93C5FD" : "#E5E7EB" }}>
            <input type="radio" checked={method === "ai"} onChange={() => setMethod("ai")} />
            <div>
              <div className="font-medium">AI-Generated Questions</div>
              <div className="text-sm text-gray-600">Let AI create questions based on your content</div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border transition cursor-pointer" style={{ borderColor: method === "manual" ? "#93C5FD" : "#E5E7EB" }}>
            <input type="radio" checked={method === "manual"} onChange={() => setMethod("manual")} />
            <div>
              <div className="font-medium">Create Manually</div>
              <div className="text-sm text-gray-600">Create your own questions from scratch</div>
            </div>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md">Cancel</button>
          <button
            onClick={() => {
              if (method === "manual") onManual();
              else onCreateAI(count);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
