export default function VadInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Title - Fixed at top */}
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">VAD Test:</h2>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1 scroll-smooth">
          <div className="space-y-4 text-gray-800 text-base leading-relaxed">
            <p>• The respective teachers from each school must submit their syllabi for all subjects to form a unified curriculum.</p>

            <p>• VADAI will create a general curriculum that is fair to all participating schools.</p>

            <p>• The VAD Test will be conducted three times per academic year.</p>

            <p>• Tests will be held on specific weekends, announced beforehand.</p>

            <p>• All students must attend the test live at the same time, with parents acting as invigilators.</p>

            <p>• The curriculum for the tests will be provided in advance.</p>

            <p>• Students will have access to preparatory files for each test through VADAI.</p>

            <p>• Test results will determine the academic performance rankings.</p>
          </div>
        </div>

        {/* Close Button - Fixed at bottom */}
        <div className="px-6 pb-6 pt-2 flex-shrink-0">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-[#5074b6] font-semibold text-lg hover:text-[#5074b6] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}