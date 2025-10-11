export default function EthicalInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Title - Fixed at top */}
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">Ethical Learning Rules:</h2>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 scroll-smooth">
          <div className="space-y-4 text-gray-800 text-base leading-relaxed">
            <p>• VADAI&apos;s Ethical Learning content must be created by VAD Squad members, including students, professionals, and teachers.</p>
            <p>• All Ethical Learning topics must be relevant, insightful, and aligned with real-world applications.</p>
            <p>• Content created for Ethical Learning should cover a wide range of subjects such as personal development, mental health, career skills and industry knowledge.</p>
            <p>• Ethical Learning content must be reviewed and approved by the VADAI admin before publishing.</p>
            <p>• All Ethical Learning compendia must include interactive elements such as quizzes and discussions.</p>
            <p>• Ethical Learning materials should be updated periodically to reflect the latest trends, research and industry needs.</p>
          </div>
        </div>

        {/* Close Button - Fixed at bottom */}
        <div className="px-6 pb-6 pt-2 flex-shrink-0">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-[#5074b6] font-semibold text-lg hover:text-[#5d88d3] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}