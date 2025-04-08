import WatchTimeChart from "./components/WatchTimeChart";
import Schedule from "./components/Schedule";
import HomeCourses from "./components/HomeCourses";
import { Separator } from "./components/ui/separator"; // Assuming you have Separator

// Example course data - replace with your actual data fetching
const userCourses = [
  { id: 1, title: "Python", description: "Learn Python from scratch. Understand variables, loops, functions, and more — perfect for beginners!" },
  { id: 2, title: "React Fundamentals", description: "Master the basics of React, including components, state, props, and hooks." },
  { id: 3, title: "Advanced CSS", description: "Dive deep into modern CSS techniques like Flexbox, Grid, and animations." },
];

export default function Home() {
  // Get user's name dynamically if possible
  const userName = "Mohan";

  return (
    // Use theme background for light mode, specific gray for dark mode
    <div className="flex flex-col lg:flex-row min-h-screen bg-background dark:bg-gray-950">

      {/* Main Content Area (Left on large screens) */}
      <div className="flex-1 p-6 lg:pr-3"> {/* Adjust padding */}
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Welcome back, {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's continue your learning journey.
          </p>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Your Courses
          </h2>
          {/* Use a grid for better course layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
                <HomeCourses
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-full">You are not enrolled in any courses yet.</p>
            )}
          </div>
        </div>

         {/* You could add other sections here, e.g., Announcements, Progress Summary */}

      </div>

      {/* Separator for visual distinction on smaller screens */}
       <Separator className="my-6 lg:hidden" />

      {/* Sidebar Area (Right on large screens) */}
      {/* Use w-full on small screens, fixed width on large */}
      <aside className="w-full lg:w-[380px] p-6 lg:pl-3 lg:border-l border-border flex flex-col gap-6">
        {/* WatchTimeChart */}
        <div className="h-[220px]"> {/* Give chart a defined height */}
          <WatchTimeChart />
        </div>

        {/* Schedule */}
        <div className="flex-1 min-h-[300px]"> {/* Allow schedule to grow, set min-height */}
          <Schedule />
        </div>
      </aside>
    </div>
  );
}