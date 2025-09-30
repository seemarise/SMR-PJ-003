export default function SubjectCard({ title, date }) {
  return (
    <div className="bg-blue-600 text-white rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm bg-blue-500 px-2 py-1 rounded">
          {date}
        </span>
      </div>

      <div className="mt-4">
        <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-sm">
          View Details
        </button>
      </div>
    </div>
  );
}
