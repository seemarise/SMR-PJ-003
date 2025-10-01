export default function Classroom() {
    const sections = ["A", "B", "C", "D"];

    return (
        <main className="px-4 py-4 bg-white min-h-screen">
            {/* Title Section */}
            <div className="bg-blue-600 text-white text-lg font-semibold rounded-lg py-3 px-4 mb-4 text-center">
                My Classroom
            </div>

            {/* Class Pill */}
            <div className="flex justify-center mb-6">
                <span className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                    Class 10
                </span>
            </div>

            {/* Section List */}
            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section}>
                        <p className="text-gray-700 font-semibold mb-1">Sec - {section}</p>
                        <div className="bg-white rounded-xl p-4 shadow text-blue-600 font-medium text-center">
                            English
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}