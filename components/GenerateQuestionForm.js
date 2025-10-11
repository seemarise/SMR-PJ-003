import React, { useState } from "react";

const GenerateQuestionsForm = ({ onCancel, onGenerate }) => {
    const [difficulty, setDifficulty] = useState("hard");
    const [mcqCount, setMcqCount] = useState("3");
    const [shortCount, setShortCount] = useState("2");

    const handleGenerate = () => {
        if (onGenerate) {
            onGenerate({
                difficulty,
                mcqs: Number(mcqCount),
                paragraphs: Number(shortCount),
            });
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl p-5 flex flex-col space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                </label>
                <div className="grid grid-cols-3 rounded-lg border border-gray-300 overflow-hidden">
                    {["easy", "medium", "hard"].map((level) => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => setDifficulty(level)}
                            className={`py-2 text-sm border-x-2 first:border-l-0 last:border-r-0 font-medium capitalize ${difficulty === level
                                ? "bg-[rgb(80,116,182)] text-white"
                                : "bg-white text-gray-800"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Multiple Choice Questions?
                </label>
                <input
                    type="number"
                    value={mcqCount}
                    onChange={(e) => setMcqCount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-[rgb(80,116,182)] focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of short/paragraph questions?
                </label>
                <input
                    type="number"
                    value={shortCount}
                    onChange={(e) => setShortCount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-[rgb(80,116,182)] focus:outline-none"
                />
            </div>

            <div className="flex justify-between pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-600 font-medium hover:text-gray-800"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleGenerate}
                    className="text-[rgb(80,116,182)] font-medium hover:underline"
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default GenerateQuestionsForm;
