import { useParams, Navigate } from "react-router-dom";
import CourseSidebar from "./CourseSidebar";
import VideoPlayer from "./VideoPlayer";
import Quiz from "./Quiz"; // ✅ Import the Quiz component
import { useState } from "react";

export default function CoursePage() {
  const { id, videoId } = useParams();
  const [videos] = useState([
    { id: 1, title: "Day 1 - Introduction" },
    { id: 2, title: "Day 2 - HTML Basics" },
    { id: 3, title: "Day 3 - CSS Fundamentals" },
    { id: 4, title: "Day 4 - CSS Flexbox" },
    { id: 5, title: "Day 5 - CSS Grid" },
    { id: 6, title: "Day 6 - Responsive Design" },
  ]);

  if (!videoId) {
    return <Navigate to={`/course/${id}/1`} replace />;
  }

  const currentVideoId = parseInt(videoId);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Left: Video Player and Quiz */}
      <div className="flex-1 p-4 overflow-y-auto space-y-8">
        <VideoPlayer courseId={id} videoId={videoId} />

        {/* ✅ Show Quiz after every 5th video */}
        {currentVideoId % 5 === 0 && <Quiz />}
      
      </div>

      {/* Right: Sidebar */}
      <div className="w-[300px] border-l dark:border-gray-700 p-4 overflow-y-auto">
        <CourseSidebar courseId={id} videos={videos} activeId={videoId} />
      </div>
    </div>
  );
}
