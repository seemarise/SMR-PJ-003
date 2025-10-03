import Image from "next/image";

export default function SubjectCard({ title, date, imageSrc, onClick }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-4 shadow-lg">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 right-12 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-6 left-6 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
      </div>

      {/* Subject icon - large overlapping squares */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        <div className="relative w-20 h-20">
          <Image src={imageSrc} width={100} height={100} draggable={false} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <h3 className="text-lg font-bold">{title}</h3>
          <span className="text-xs bg-blue-500 bg-opacity-50 px-2 py-1 rounded-full">
            {date}
          </span>
        </div>

        <div className="mt-2">
          <button
            onClick={onClick}
            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-200 text-sm cursor-pointer active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}