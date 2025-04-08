import { useState } from "react";
import Comments from "./Comments";
import Quiz from "./Quiz"; // Import your quiz component

export default function VideoPlayer({ courseId, videoId }) {
  const [activeTab, setActiveTab] = useState("qna");

  // Use the local video for development purposes
  const videoSrc = `/Introduction to Python Programming _ Python for Beginners #lec1.mp4`;

  return (
    <div className="rounded-xl overflow-hidden">
      {/* Video */}
      <video
        controls
        className="w-full h-[450px] bg-black rounded-md"
        src={videoSrc} // Local video source
      />

      {/* Tabs */}
      <div className="mt-4 border-b border-gray-200 dark:border-gray-700 flex space-x-4">
        {["qna", "summary", "quiz"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 text-gray-800 dark:text-gray-200">
        {activeTab === "qna" && <Comments />}

        {activeTab === "summary" && (
          <div>
            <h3 className="text-lg font-bold mb-2">Video Summary</h3>
            <p className="text-sm leading-relaxed">
              This video covers the basics of Python programming, including variables, loops, and functions.
            </p>
          </div>
        )}

        {activeTab === "quiz" && <Quiz courseId={courseId} videoId={videoId} />}
      </div>
    </div>
  );
}