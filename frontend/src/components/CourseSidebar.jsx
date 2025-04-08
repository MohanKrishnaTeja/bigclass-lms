import { Link } from "react-router-dom";

export default function CourseSidebar({ courseId, videos, activeId }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Course Content</h2>
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/course/${courseId}/${video.id}`}
          className={`block px-3 py-2 rounded-md text-sm font-medium ${
            activeId === String(video.id)
              ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-white"
              : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          {video.title}
        </Link>
      ))}
    </div>
  );
}