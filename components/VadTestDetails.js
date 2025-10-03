import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Info, ChevronDown, ChevronUp, Download, FileText } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

export default function VadTestDetails({ testData, onBack }) {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  function formatMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }

  return (
    <div className={`fixed inset-0 z-50 bg-gray-50 overflow-y-auto transition-all duration-300`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-4 md:max-w-5xl md:mx-auto">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-blue-600 md:text-xl">VAD Test Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 pb-20 md:max-w-5xl md:mx-auto md:pb-8">
        {/* Test Title */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
            {testData.name}
          </h2>
          <p className="text-base text-blue-600 mt-1 md:text-lg">{testData.subject}</p>
        </div>

        {/* Test Info */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-500 delay-100 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 md:bg-white md:p-6 md:rounded-xl md:shadow-sm">
          <div className="flex items-center gap-3 text-gray-700 transition-transform hover:translate-x-1 duration-200">
            <Calendar className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            <span className="text-sm md:text-base">{moment(testData.date).format("DD MMM YYYY")}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 transition-transform hover:translate-x-1 duration-200">
            <Clock className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            <span className="text-sm md:text-base">{moment.utc(testData.startTime).format("hh:mm A") + " - " + moment.utc(testData.endTime).format("hh:mm A")}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 transition-transform hover:translate-x-1 duration-200">
            <Info className="w-5 h-5 text-blue-600 md:w-6 md:h-6" />
            <span className="text-sm md:text-base">Duration: {formatMinutes(testData.durationInMinutes)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex-1 pb-3 text-sm font-medium transition-all duration-300 relative cursor-pointer md:text-base ${activeTab === 'syllabus' ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            Syllabus & Topics
            {activeTab === 'syllabus' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in slide-in-from-left duration-300" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 pb-3 text-sm font-medium transition-all duration-300 relative cursor-pointer md:text-base ${activeTab === 'documents' ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            Documents
            {activeTab === 'documents' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in slide-in-from-right duration-300" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'syllabus' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-left duration-400 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 md:items-start">
            {testData.largerTopics?.map((topic, idx) => (
              <div
                key={topic.name}
                className="bg-white rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom duration-400 md:self-start"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <button
                  onClick={() => toggleTopic(topic.name)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 cursor-pointer select-none"
                >
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-900 md:text-lg">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 md:text-sm">
                      {topic.subtopics.length} subtopics
                    </p>
                  </div>
                  <div className={`transition-transform duration-300 ${expandedTopics[topic.name] ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedTopics[topic.name]
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-5 pb-4 space-y-3">
                    {topic.subtopics?.map((subtopic, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pl-2 animate-in fade-in slide-in-from-left duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0 transition-transform hover:scale-150 duration-200" />
                        <span className="text-sm text-gray-700 md:text-base">{subtopic.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-400 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {testData.documents.map((doc, idx) => (
              <div
                key={doc._id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300 animate-in fade-in slide-in-from-bottom duration-400"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                    <FileText className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 md:text-sm">{doc.type}</p>
                  </div>
                </div>
                <Link href={doc.link} target='_blank' download={true} className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 active:scale-95 hover:rotate-12">
                  <Download className="w-5 h-5 text-blue-600" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}